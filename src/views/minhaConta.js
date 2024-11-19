import React, {useContext, useEffect, useState} from "react";
import TituloPagina from "../components/app/tituloPagina";
import {Button, Form} from "react-bootstrap";
import LocalStorageService from "../app/service/localStorageService";
import usuarioService from "../app/service/usuarioService";
import UsuarioService from "../app/service/usuarioService";
import {mensagemErro, mensagemSucesso} from "../components/app/toastr";

function MinhaConta() {
  const [usuario, setUsuario] = useState({});
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const service = new UsuarioService();

  const cadastrar = () => {

    console.log(usuario);
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
        mensagemSucesso('Usuario editado com sucesso!');
      })
      .catch(error => {
        mensagemErro(error.response.data)
      })

  }


  useEffect(() => {
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
    setUsuario(usuarioLogado);
  }, []);


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
              <Form.Label>Repita a senha</Form.Label>
              <Form.Control
                type="password"
                value={usuario.senhaRepeticao}
                onChange={event => setUsuario({...usuario, senhaRepeticao: event.target.value})}/>
            </Form.Group>


            <div className="d-flex justify-content-end">
              <Button className="ms-auto mt-3" variant="primary" onClick={cadastrar}> Salvar </Button>
            </div>
          </Form>


        </div>
      </div>

    </div>
  )
}

export default MinhaConta;