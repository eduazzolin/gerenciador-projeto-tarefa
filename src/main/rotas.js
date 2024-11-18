import React, {useContext, useEffect} from "react";
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes} from 'react-router-dom'
import AppNavbar from "../components/app/navbar";
import CadastroProjeto from "../views/cadastroProjeto";
import MeusProjetos from "../views/meusProjetos";
import MinhaConta from "../views/minhaConta";
import CadastroTarefa from "../views/cadastroTarefa";
import Home from "../views/home";
import Tarefa from "../views/tarefa";
import {AuthContext} from "./provedorAutenticacao";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';



const PrivateRoute = ({isUsuarioAutenticado, element}) => {
  return isUsuarioAutenticado ? element : <Navigate to="/login"/>;
}

function Rotas() {

  const authContext = useContext(AuthContext);
  const {isAutenticado} = authContext;

  return (
    <Router>
      <div>
        <AppNavbar/>
        <Routes>
          <Route path="/novo-projeto" element={<PrivateRoute isUsuarioAutenticado={isAutenticado} element={<CadastroProjeto/>}/>}/>
          <Route path="/nova-tarefa" element={<PrivateRoute isUsuarioAutenticado={isAutenticado} element={<CadastroTarefa/>}/>}/>
          <Route path="/projetos" element={<PrivateRoute isUsuarioAutenticado={isAutenticado} element={<MeusProjetos/>}/>}/>
          <Route path="/conta" element={<PrivateRoute isUsuarioAutenticado={isAutenticado} element={<MinhaConta/>}/>}/>
          <Route path="/tarefa/:id" element={<PrivateRoute isUsuarioAutenticado={isAutenticado} element={<Tarefa/>}/>}/>
          <Route path="/" element={<PrivateRoute isUsuarioAutenticado={isAutenticado} element={<Home/>}/>}/>
          <Route path="/home" element={<PrivateRoute isUsuarioAutenticado={isAutenticado} element={<Home/>}/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cadastro-usuarios" element={<CadastroUsuario/>}/>
        </Routes>
      </div>
    </Router>)
}

export default Rotas;