export type LeadPayload = {
  name: string;
  phone: string;
  uf: string;
  city: string;
  role: "Síndico profissional" | "Administrador" | "Síndico morador";
  revenueRange: "Até R$ 20.000" | "Até R$ 50.000" | "Acima de R$ 50.000 até R$ 100.000";
  source?: string;
};

type BrevoWebhookPayload = {
  name: string;
  phone: string;
  uf: string;
  city: string;
  role: LeadPayload["role"];
  revenueRange: LeadPayload["revenueRange"];
  source: string;
  createdAt: string;
};

function normalizePhoneToE164(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.length < 10 || digitsOnly.length > 13) {
    throw new Error("Telefone invalido para integracao Brevo");
  }

  if (digitsOnly.startsWith("55")) {
    return `+${digitsOnly}`;
  }

  if (digitsOnly.startsWith("0")) {
    return `+55${digitsOnly.slice(1)}`;
  }

  return `+55${digitsOnly}`;
}

function buildWebhookPayload(lead: LeadPayload): BrevoWebhookPayload {
  return {
    name: lead.name.trim(),
    phone: normalizePhoneToE164(lead.phone),
    uf: lead.uf.trim().toUpperCase(),
    city: lead.city.trim(),
    role: lead.role,
    revenueRange: lead.revenueRange,
    source: lead.source?.trim() || "lp-diego",
    createdAt: new Date().toISOString(),
  };
}

async function postToBrevoWebhook(lead: LeadPayload): Promise<void> {
  const webhookUrl = import.meta.env.VITE_BREVO_WEBHOOK_URL as string | undefined;

  if (!webhookUrl) {
    throw new Error("Configuração ausente: VITE_BREVO_WEBHOOK_URL");
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildWebhookPayload(lead)),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo webhook ${res.status}: ${text || res.statusText}`);
  }
}

export async function submitLeadToBrevo(lead: LeadPayload): Promise<void> {
  await postToBrevoWebhook(lead);
}
