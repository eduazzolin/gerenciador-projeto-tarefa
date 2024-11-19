import ApiService from "./apiService";
import ErroValidacao from "../exception/erroValidacao";
import MD5 from "crypto-js/md5";

export const usuarioPrototype = {
  "nome": "",
  "email": "",
  "senha": "",
  "senhaRepeticao": "",
  "id": null
}

class UsuarioService extends ApiService {
  constructor() {
    super('/usuarios');
  }

  autenticar(credenciais) {
    credenciais.senha = this.hashSenha(credenciais.senha);
    return this.post('/autenticar', credenciais)
  }

  salvar(usuario) {
    usuario.senha = this.hashSenha(usuario.senha);
    return this.post('', usuario);
  }

  hashSenha(senha) {
    return MD5(senha).toString();
  }

  validar(usuario) {
    const erros = []
    if (!usuario.nome) {
      erros.push("O campo nome é obrigatório.")
    }
    if (!usuario.email) {
      erros.push("O campo email é obrigatório.")
    } else if (!usuario.email.match(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/)) {
      erros.push("Informe um email válido.")
    }
    if (!usuario.senha || !usuario.senhaRepeticao) {
      erros.push("O campo senha é obrigatório.")
    } else if (usuario.senha.length < 6) {
      erros.push("A senha deve ter pelo menos 6 caracteres.")
    } else if (usuario.senha !== usuario.senhaRepeticao) {
      erros.push("As senhas devem ser iguais.")
    }
    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }
}

export default UsuarioService