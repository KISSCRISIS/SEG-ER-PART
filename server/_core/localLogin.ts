import type { Express } from "express";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { localStore } from "../localStore";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { COOKIE_NAME } from "../../shared/const";
import { getSessionCookieOptions } from "./cookies";
import { requireSameOrigin } from "./originGuard";

export const localEmailLoginEnabled = () => process.env.SEG_LOCAL_WORKSPACE === "true" && process.env.SEG_LOCAL_EMAIL_LOGIN === "true";

export function registerLocalLogin(app: Express) {
  if (!localEmailLoginEnabled()) return;
  app.get("/login", (_req, res) => res.redirect("/local-login"));
  app.get("/local-login", (_req, res) => {
    res.type("html").send(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SEG — دخول محلي</title><link rel="stylesheet" href="/local-login.css"></head><body><main><div class="brand"><img src="/seg-logo.png" width="853" height="1280" alt="Smart Emergency Guide — Dr. Alaa Aqrabawi"></div><section class="content"><span class="eyebrow" lang="en">YOUR LEARNING WORKSPACE</span><h1>أهلًا بك في SEG</h1><p>تابع رحلتك في طب الطوارئ. أدخل بريدك لفتح ملفك التعليمي المحلي، دون كلمة مرور أو كود.</p><form method="post" action="/local-login"><label>البريد الإلكتروني <input name="email" type="email" required maxlength="320" autocomplete="email" placeholder="you@example.com"></label><button type="submit">الدخول إلى مساحتي</button></form><p class="notice">هذا اختيار ملف محلي وليس إثبات ملكية البريد. من يستخدم الجهاز يستطيع فتح الملف بالبريد نفسه.</p><p class="signature" lang="en" dir="ltr">SMART EMERGENCY GUIDE</p></section></main></body></html>`);
  });
  app.post("/local-login", requireSameOrigin, async (req, res, next) => {
    try {
      const parsed = z.string().trim().toLowerCase().email().max(320).safeParse(req.body?.email);
      if (!parsed.success) { res.status(400).send("Invalid email address"); return; }
      const store = localStore();
      const users = store.list<User>("local-users", 0);
      let user = users.find(item => item.email === parsed.data);
      if (!user) {
        const now = new Date();
        user = { id: users.reduce((max, item) => Math.max(max, item.id), 0) + 1, openId: `local:${randomUUID()}`, email: parsed.data, name: parsed.data.split("@")[0], role: "user", loginMethod: "local", createdAt: now, updatedAt: now, lastSignedIn: now, emailVerifiedAt: null };
        store.put("local-users", 0, user.openId, user, true);
      }
      const token = await sdk.createSessionToken(user.openId, { name: user.name ?? "Local user", expiresInMs: 86400000 });
      res.cookie(COOKIE_NAME, token, { ...getSessionCookieOptions(req), maxAge: 86400000 });
      res.redirect(303, "/dashboard");
    } catch (error) { next(error); }
  });
}
