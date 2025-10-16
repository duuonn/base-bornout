import React from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { RecomendacoesIA } from "./components/RecomendacoesIA";

const Home: React.FC = () => (
  <div style={{ padding: 16 }}>
    <h1>Bornout (baseline)</h1>
    <p>Use o menu para navegar.</p>
    <Link to="/ia">Recomendações IA</Link>
  </div>
);

const App: React.FC = () => {
  return (
    <div>
      <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/ia">Recomendações IA</Link>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ia" component={RecomendacoesIA} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
