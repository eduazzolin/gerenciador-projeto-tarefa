import LocalStorageService from "./localStorageService";
import {jwtDecode} from "jwt-decode";
import ApiService from "./apiService";

export const USUARIO_LOGADO = '_usuario_logado';
export const TOKEN = 'access_token';
export default class AuthService {

  static isUsuarioAutenticado() {

    const token = LocalStorageService.obterItem(TOKEN);
    if (!token) {
      return false;
    }
    const decoded = jwtDecode(token);
    const expiracao = decoded.exp;
    const agora = new Date().getTime();
    return token && agora <= expiracao * 1000;
  }

  static removerUsuarioAutenticado() {
    LocalStorageService.removerItem(USUARIO_LOGADO);
    LocalStorageService.removerItem(TOKEN);
  }

  static logar(usuario, token) {
    LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario);
    LocalStorageService.adicionarItem(TOKEN, token);
    ApiService.registrarToken(token);
  }

  static obterUsuarioAutenticado() {
    return LocalStorageService.obterItem(USUARIO_LOGADO);
  }

  static refreshSession(){
    const token = LocalStorageService.obterItem(TOKEN);
    const usuario = AuthService.obterUsuarioAutenticado();
    AuthService.logar(usuario, token);
    return usuario;
  }
}