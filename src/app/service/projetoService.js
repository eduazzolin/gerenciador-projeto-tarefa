import ApiService from "./apiService";

export const projetoPrototype = {
    "id": 0,
    "data_criacao": "",
    "descricao": "",
    "is_deleted": false,
    "nome": "",
    "usuario": {
        "id": 0
    }
}

class ProjetoService extends ApiService {

    constructor() {
        super('/projetos');
    }

    salvar(projeto) {
        return this.post('', projeto);
    }

    consultar() {
        return this.get('');
    }

    deletar(id) {
        return this.delete('/' + id);
    }

}

export default ProjetoService

