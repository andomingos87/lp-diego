import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(8).max(20),
  uf: z.string().length(2),
  city: z.string().min(1).max(120),
  role: z.enum(["Síndico profissional", "Administrador", "Síndico morador"]),
  revenueRange: z.enum([
    "Até R$ 20.000",
    "Até R$ 50.000",
    "Acima de R$ 50.000",
  ]),
});

function normalizePhoneToE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) {
    throw new Error("Telefone inválido");
  }
  if (digits.startsWith("55")) return `+${digits}`;
  if (digits.startsWith("0")) return `+55${digits.slice(1)}`;
  return `+55${digits}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("[Brevo] BREVO_API_KEY não configurada");
    return res.status(500).json({ error: "Integração indisponível" });
  }

  const lead = parsed.data;
  let phone: string;
  try {
    phone = normalizePhoneToE164(lead.phone);
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }

  const listId = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : undefined;

  const body: Record<string, unknown> = {
    ext_id: phone,
    updateEnabled: true,
    attributes: {
      NOME: lead.name.trim(),
      SMS: phone,
      UF: lead.uf.trim().toUpperCase(),
      CIDADE: lead.city.trim(),
      PERFIL: lead.role,
      FAIXA_GESTAO: lead.revenueRange,
      FONTE: "Landing Page",
    },
  };
  if (listId && Number.isFinite(listId)) body.listIds = [listId];

  try {
    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!brevoRes.ok && brevoRes.status !== 204) {
      const text = await brevoRes.text();
      console.error(`[Brevo] ${brevoRes.status}: ${text}`);
      return res.status(502).json({ error: "Falha ao registrar lead" });
    }
  } catch (err) {
    console.error("[Brevo] Network error:", err);
    return res.status(502).json({ error: "Falha ao registrar lead" });
  }

  return res.status(201).json({ ok: true });
}
