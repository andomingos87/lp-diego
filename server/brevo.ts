import type { InsertLead } from "@shared/schema";

function normalizePhoneToE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) {
    throw new Error("Telefone inválido para integração Brevo");
  }
  if (digits.startsWith("55")) return `+${digits}`;
  if (digits.startsWith("0")) return `+55${digits.slice(1)}`;
  return `+55${digits}`;
}

export async function sendLeadToBrevo(lead: InsertLead): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY não configurada");

  const listId = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : undefined;
  const phone = normalizePhoneToE164(lead.phone);

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

  if (listId && Number.isFinite(listId)) {
    body.listIds = [listId];
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    throw new Error(`Brevo ${res.status}: ${text || res.statusText}`);
  }
}
