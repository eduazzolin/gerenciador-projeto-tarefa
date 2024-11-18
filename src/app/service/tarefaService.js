import ApiService from "./apiService";


export const tarefaPrototype = {
  "id": 1,
  "dataCriacao": "",
  "descricao": "",
  "isDeleted": false,
  "nome": "",
  "idProjeto": 1,
  "idStatus": 1,
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
    return this.get(idTarefa + '/comentarios/');
  }

}
