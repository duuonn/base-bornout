import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header className="header">
    <nav>
      <Link to="/" className="logo">Burnout Detector</Link>
      <div style={{ marginLeft: "20px", display: "inline-block" }}>
        <Link to="/quiz">Questionário</Link> |{" "}
        <Link to="/results">Resultados</Link> |{" "}
        <Link to="/statistics">Estatísticas</Link> |{" "}
        <Link to="/ia">Recomendações IA</Link>
      </div>
    </nav>
  </header>
);

export default Header;
