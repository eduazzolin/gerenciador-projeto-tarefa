import ApiService from "./apiService";
import ErroValidacao from "../exception/erroValidacao";


export const tarefaPrototype = {
  "id": 1,
  "dataCriacao": "",
  "descricao": "",
  "isDeleted": false,
  "nome": "",
  "idProjeto": 1,
  "idStatus": 1,
}

export const comentarioPrototype = {
  "id": null,
  "comentario": "",
  "idTarefa": null
}


export class TarefaService extends ApiService {

  constructor() {
    super('/tarefas');
  }

  salvar(tarefa) {
    return this.post('', tarefa);
  }

  consultarPorProjeto(idProjeto) {
    return this.get('/projeto/' + idProjeto);
  }

  consultarPorId(id) {
    return this.get('/' + id);
  }

  deletar(id) {
    return this.delete('/' + id);
  }

  consultarComentariosPorIdTarefa(idTarefa) {
    return this.get('/' + idTarefa + '/comentarios');
  }

  salvarComentario(comentario) {
    return this.post('/' + comentario.idTarefa + '/comentarios', comentario);
  }

  deletarComentario(comentario) {
    return this.delete('/' + comentario.tarefa.id + '/comentarios/' + comentario.id);
  }

  validar(tarefa) {
    const erros = []

    if (!tarefa.nome) {
      erros.push("O campo nome é obrigatório.")
    } else if (tarefa.nome.length < 3) {
      erros.push("O campo nome deve ter pelo menos 3 caracteres.")
    } else if (tarefa.nome.length > 100) {
      erros.push("O campo nome deve ter no máximo 100 caracteres.")
    }

    if (tarefa.descricao && tarefa.descricao.length > 999) {
      erros.push("O campo descrição deve ter no máximo 999 caracteres.")
    }

    if (!tarefa.idProjeto) {
      erros.push("O campo projeto é obrigatório.")
    }
    if (!tarefa.idStatus) {
      erros.push("O campo status é obrigatório.")
    }

    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }

  validarComentario(comentario) {
    const erros = []
    if (!comentario) {
      erros.push("Erro ao salvar comentário.")
      throw new ErroValidacao(erros);
    }
    if (!comentario.comentario) {
      erros.push("O campo descrição é obrigatório.")
    } else if (comentario.comentario.length > 999) {
      erros.push("O campo descrição deve ter no máximo 999 caracteres.")
    }

    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }

}
