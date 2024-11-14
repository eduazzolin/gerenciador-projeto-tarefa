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

export async function consultarProjetos() {
    return [
        {
            "id": 1,
            "data_criacao": "2021-10-14T00:00:00",
            "descricao": "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsumm Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsumm Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
            "is_deleted": false,
            "nome": "Projeto 1",
            "usuario": {
                "id": 1
            }
        },
        {
            "id": 2,
            "data_criacao": "2021-10-14T00:00:00",
            "descricao": "Projeto de teste Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ",
            "is_deleted": false,
            "nome": "Projeto 2",
            "usuario": {
                "id": 1
            }
        }
    ];
}