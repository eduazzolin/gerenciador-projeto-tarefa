import React, {useContext, useEffect} from "react";
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes} from 'react-router-dom'
import AppNavbar from "../components/navbar";
import CadastroProjeto from "../views/cadastroProjeto";
import MeusProjetos from "../views/meusProjetos";
import MinhaConta from "../views/minhaConta";
import CadastroTarefa from "../views/cadastroTarefa";
import Home from "../views/home";
import Tarefa from "../views/tarefa";

function Rotas() {

  return (
    <Router>
      <div>
        <AppNavbar/>
        <Routes>
          <Route path="/novo-projeto" element={<CadastroProjeto/>}/>
          <Route path="/nova-tarefa" element={<CadastroTarefa/>}/>
          <Route path="/projetos" element={<MeusProjetos/>}/>
          <Route path="/conta" element={<MinhaConta/>}/>
          <Route path="/tarefa" element={<Tarefa/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </Router>)
}

export default Rotas;