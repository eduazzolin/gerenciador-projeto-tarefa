import React from 'react';
import Rotas from "./rotas";
import ProvedorAutenticacao from "./provedorAutenticacao";

function App() {
  return (
    <div>
      <ProvedorAutenticacao>
        <Rotas/>
      </ProvedorAutenticacao>
    </div>
  );
}

export default App;
