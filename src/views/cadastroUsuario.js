import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import UsuarioService, {usuarioPrototype} from "../app/service/usuarioService";

import {Button, Form} from "react-bootstrap";
import {mensagemErro, mensagemSucesso} from "../components/app/toastr";

function CadastroUsuario() {
  const [usuario, setUsuario] = useState({usuarioPrototype});

  const navigate = useNavigate();
  const service = new UsuarioService();

  const cadastrar = () => {

    try {
      service.validar(usuario);
    } catch (erro) {
      const msgs = erro.mensagens;
      msgs.forEach(msg => mensagemErro(msg));
      return false;
    }

    service
      .salvar(usuario)
      .then(response => {
        mensagemSucesso('Cadastro realizado com sucesso! Faça o login para acessar o sistema.');
        navigate("/login")
      })
      .catch(error => {
        mensagemErro(error.response.data)
      })

  }

  return (
    <div className="row mt-4">

      <div className="col-12">
        <h2 className="text-center">Login</h2>
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
            <Form.Label>Repita a senha</Form.Label>
            <Form.Control
              type="password"
              value={usuario.senhaRepeticao}
              onChange={event => setUsuario({...usuario, senhaRepeticao: event.target.value})}/>
          </Form.Group>

          <div className="d-flex">
            <Button className="mx-auto mt-3" variant="outline-dark"
                    onClick={() => cadastrar()}> Cadastrar </Button>
          </div>

        </Form>
      </div>

    </div>
  );
}

export default CadastroUsuario;