import ApiService from "./apiService";
import ErroValidacao from "../exception/erroValidacao";

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
    console.log('credenciais:', credenciais)
    return this.post('/autenticar', credenciais)
  }

  obterSaldoPorUsuario(id) {
    return this.get('/' + id + '/saldo')
  }

  salvar(usuario) {
    return this.post('', usuario);
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
    } else if (usuario.senha !== usuario.senhaRepeticao) {
      erros.push("As senhas devem ser iguais.")
    }
    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }
}

export default UsuarioService