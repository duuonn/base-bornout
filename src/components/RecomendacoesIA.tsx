import React, { useState } from "react";
import { askGemini } from "../services/gemini";

export function RecomendacoesIA() {
  const [loading, setLoading] = useState(false);
  const [resposta, setResposta] = useState("");

  async function gerar() {
    setLoading(true);
    try {
      const { text } = await askGemini(
        "Gere 3 dicas curtas e práticas para reduzir estresse acadêmico antes de provas."
      );
      setResposta(text);
    } catch (e: any) {
      setResposta("Erro: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Recomendações IA</h2>
      <button onClick={gerar} disabled={loading}>
        {loading ? "Gerando..." : "Gerar Recomendações"}
      </button>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>{resposta}</pre>
    </div>
  );
}
