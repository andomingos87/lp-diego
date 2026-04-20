import type { Express, Request, Response } from "express";
import { type Server } from "http";
import { insertLeadSchema } from "@shared/schema";
import { storage } from "./storage";
import { sendLeadToBrevo } from "./brevo";
import { log } from "./index";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/leads", async (req: Request, res: Response) => {
    const parsed = insertLeadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    let leadId: number | null = null;
    try {
      const lead = await storage.insertLead(parsed.data);
      leadId = lead.id;
    } catch (err) {
      log(`[DB] Falha ao persistir lead: ${(err as Error).message}`);
    }

    try {
      await sendLeadToBrevo(parsed.data);
    } catch (err) {
      log(`[Brevo] Falha ao enviar lead: ${(err as Error).message}`);
      if (leadId === null) {
        return res.status(502).json({ error: "Não foi possível registrar o lead. Tente novamente." });
      }
    }

    res.status(201).json({ id: leadId });
  });

  return httpServer;
}
