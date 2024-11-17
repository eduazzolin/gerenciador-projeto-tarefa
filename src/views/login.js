import React, {useContext} from "react";
import {useNavigate} from 'react-router-dom'
import UsuarioService from "../app/service/usuarioService";
import {AuthContext} from "../main/provedorAutenticacao";
import {Button, Form} from "react-bootstrap";
import {mensagemErro, mensagemSucesso} from "../components/app/toastr";

function Login() {
  const authContext = useContext(AuthContext);
  const [usuario, setUsuario] = React.useState({email: '', senha: ''});
  const navigate = useNavigate();

  const service = new UsuarioService();

  const entrar = () => {
    service
      .autenticar({
        email: usuario.email, senha: usuario.senha
      })
      .then(response => {
        mensagemSucesso('Bem vindo!');
        authContext.iniciarSessao(response.data)
        navigate("/")
      })
      .catch(error => {
        mensagemErro(error.response.data)
      })
  }

  return (
    <div className="container">
      <div className="row mt-4 d-flex">

        <div className="col-lg-6 col-12 mx-auto">
          <h2 className="text-center">Login</h2>
          <Form>
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

            <div className="d-flex">
              <Button className="mx-auto mt-3" variant="outline-dark"
                      onClick={() => entrar()}> Login </Button>
            </div>

          </Form>
        </div>


      </div>
    </div>
  )
}

export default Login;