import ApiService from "./apiService";
import ErroValidacao from "../exception/erroValidacao";

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

    validar(projeto) {
        const erros = []

        if (!projeto.nome) {
            erros.push("O campo nome é obrigatório.")
        } else if (projeto.nome.length < 3) {
            erros.push("O campo nome deve ter pelo menos 3 caracteres.")
        } else if (projeto.nome.length > 50) {
            erros.push("O campo nome deve ter no máximo 50 caracteres.")
        }

        if (!projeto.descricao) {
            erros.push("O campo descrição é obrigatório.")
        } else if (projeto.descricao.length < 3) {
            erros.push("O campo descrição deve ter pelo menos 3 caracteres.")
        } else if (projeto.descricao.length > 999) {
            erros.push("O campo descrição deve ter no máximo 999 caracteres.")
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }

}

export default ProjetoService

