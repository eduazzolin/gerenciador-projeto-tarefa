import React, { useEffect, useState } from "react";
import TituloPagina from "../components/app/tituloPagina";
import { Button, Form } from "react-bootstrap";
import ProjetoService, { projetoPrototype } from "../app/service/projetoService";
import CartaoProjeto from "../components/cartaoProjeto/cartaoProjeto";
import {useNavigate} from "react-router-dom";

function MeusProjetos() {
  const [projetos, setProjetos] = useState([]);
  const navigate = useNavigate();
  const service = new ProjetoService();


  useEffect(() => {

    service.consultar().then(response => {
      setProjetos(response.data);
    }).catch(error => {
      console.log(error);
    });




  }, []);

  return (
    <div className="container">
      <TituloPagina titulo="Meus Projetos"/>
      <div className="d-flex justify-content-center">
        <div className="mb-3">
        <Button className="" size={"lg"} variant="success" onClick={() => navigate('/novo-projeto')}> Novo Projeto </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {projetos.map((projeto) => (
            <CartaoProjeto key={projeto.id} projeto={projeto}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MeusProjetos;
