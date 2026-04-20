export type LeadPayload = {
  name: string;
  phone: string;
  uf: string;
  city: string;
  role: "Síndico profissional" | "Administrador" | "Síndico morador";
  revenueRange: "Até R$ 20.000" | "Até R$ 50.000" | "Acima de R$ 50.000";
  source?: string;
};

export async function submitLeadToBrevo(lead: LeadPayload): Promise<void> {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: lead.name.trim(),
      phone: lead.phone.trim(),
      uf: lead.uf.trim().toUpperCase(),
      city: lead.city.trim(),
      role: lead.role,
      revenueRange: lead.revenueRange,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Falha ao enviar lead (${res.status}): ${text || res.statusText}`);
  }
}
