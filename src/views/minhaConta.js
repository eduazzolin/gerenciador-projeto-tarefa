import React, {useContext, useEffect, useState} from "react";
import TituloPagina from "../components/tituloPagina";
import {Button, Form} from "react-bootstrap";

function MinhaConta() {
  const [usuario, setUsuario] = useState({});
  const [confirmarSenha, setConfirmarSenha] = useState('');

  return (
    <div className={'container'}>
      <TituloPagina titulo={'Minha Conta'}/>

      <div className="row">
        <div className="col-lg-6 mx-auto">

          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do usuário"
                value={usuario.nome}
                onChange={event => setUsuario({...usuario, nome: event.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email do usuário"
                value={usuario.email}
                onChange={event => setUsuario({...usuario, email: event.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                value={usuario.senha}
                onChange={event => setUsuario({...usuario, senha: event.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirmar senha</Form.Label>
              <Form.Control
                type="password"
                onChange={event => setConfirmarSenha(event.target.value)}/>
            </Form.Group>


            <div className="d-flex justify-content-end">
              <Button className="ms-auto mt-3" variant="primary" onClick={() => console.log(usuario)}> Salvar </Button>
            </div>
          </Form>


        </div>
      </div>

    </div>
  )
}

export default MinhaConta;