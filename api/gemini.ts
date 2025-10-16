// api/gemini.ts — Vercel Serverless (funciona sem SDK/instalação)
// Chama a REST API do Gemini com a chave guardada na Vercel.

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { prompt } = req.body ?? {};
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "API key ausente (configure GEMINI_API_KEY na Vercel)" });
    }

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
      apiKey;

    const payload = { contents: [{ parts: [{ text: prompt ?? "Diga oi!" }] }] };

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await r.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.candidates?.[0]?.content?.parts?.[0]?.inline_data?.data ??
      "";

    return res.status(200).json({ text });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? "Erro interno" });
  }
}
