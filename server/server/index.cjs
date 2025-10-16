// server/index.cjs — backend local do Gemini (CommonJS)
const express = require("express");
const dotenv = require("dotenv");
const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args)); // funciona c/ Node antigo

dotenv.config();
const app = express();
app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  try {
    const { message = "", history = [] } = req.body ?? {};
    if (!message.trim()) return res.status(400).json({ error: "Mensagem vazia" });

    const system = `Você é um assistente gentil e objetivo sobre prevenção de burnout.
- Fale em português do Brasil, com empatia e linguagem clara.
- Não dê diagnóstico médico. Inclua avisos de procurar um profissional quando necessário.
- Seja conciso (3–6 frases) e, quando útil, liste passos práticos.
- Se perguntarem sobre crises agudas (ideação suicida, autolesão), incentive buscar ajuda profissional e linhas de apoio locais.`;

    const stitched = (history || []).map(h => `Usuário: ${h.user}\nIA: ${h.ai}`).join("\n\n");
    const prompt = system + (stitched ? `\n\n${stitched}` : "") + `\n\nUsuário: ${message}\nIA:`;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY ausente no .env" });

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await r.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Não foi possível gerar resposta agora.";
    res.json({ reply });
  } catch (e) {
    res.status(500).json({ error: e?.message ?? "Falha na API Gemini" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API local em http://localhost:${PORT}`));
