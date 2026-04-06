function normalizePhoneToE164(phone) {
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.length < 10 || digitsOnly.length > 13) {
    throw new Error(`Telefone invalido: ${phone}`);
  }

  if (digitsOnly.startsWith("55")) {
    return `+${digitsOnly}`;
  }

  if (digitsOnly.startsWith("0")) {
    return `+55${digitsOnly.slice(1)}`;
  }

  return `+55${digitsOnly}`;
}

function assertEquals(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`[${label}] esperado "${expected}" mas recebeu "${actual}"`);
  }
}

function runPhoneNormalizationGate() {
  assertEquals(normalizePhoneToE164("(11) 99999-8888"), "+5511999998888", "mask format");
  assertEquals(normalizePhoneToE164("011999998888"), "+5511999998888", "leading zero");
  assertEquals(normalizePhoneToE164("5511999998888"), "+5511999998888", "already with country");
}

async function runWebhookGate() {
  const webhookUrl = process.env.VITE_BREVO_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("[SKIP] VITE_BREVO_WEBHOOK_URL nao configurada; gate de webhook pulado.");
    return;
  }

  const payload = {
    name: "Teste Integracao",
    phone: "+5511999998888",
    cityState: "Sao Paulo/SP",
    role: "Síndico profissional",
    revenueRange: "Até R$ 50.000",
    source: "lp-diego",
    createdAt: new Date().toISOString(),
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Webhook falhou com ${response.status}: ${text || response.statusText}`);
  }

  console.log(`[OK] Webhook respondeu ${response.status}.`);
}

async function main() {
  runPhoneNormalizationGate();
  console.log("[OK] Gate B: normalizacao E.164 validada.");

  await runWebhookGate();
  console.log("[OK] Gates tecnicos concluidos.");
}

main().catch((error) => {
  console.error("[ERRO]", error.message);
  process.exit(1);
});
