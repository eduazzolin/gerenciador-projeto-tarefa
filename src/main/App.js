import React from 'react';
import Rotas from "./rotas";
import ProvedorAutenticacao from "./provedorAutenticacao";
import 'toastr/build/toastr.min.css'
import toastr from 'toastr';

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
