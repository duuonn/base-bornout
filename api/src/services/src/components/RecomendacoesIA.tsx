import React, { useState } from "react";
import { askGemini } from "../services/gemini";

const RecomendacoesIA: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [resposta, setResposta] = useState("");

  async function gerar() {
    setLoading(true);
    try {
      const { text } = await askGemini(
        "Gere 3 dicas curtas e práticas para reduzir o estresse e evitar burnout em ambiente acadêmico."
      );
      setResposta(text);
    } catch (e: any) {
      setResposta("Erro: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Recomendações de Bem-Estar (IA Gemini)</h2>
      <button onClick={gerar} disabled={loading}>
        {loading ? "Gerando..." : "Gerar Recomendações"}
      </button>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: 16 }}>{resposta}</pre>
    </div>
  );
};

export default RecomendacoesIA;
