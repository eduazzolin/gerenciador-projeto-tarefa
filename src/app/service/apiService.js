import axios from "axios";
import {mensagemErro} from "../../components/app/toastr";
import {useNavigate} from "react-router-dom";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://gerenciador-projeto.onrender.com',
  withCredentials: true
});

class ApiService {

  constructor(apiUrl) {
    this.apiUrl = apiUrl
  }


  post(url, objeto) {
    let token = localStorage.getItem('access_token') || '';
    token = token.replace(/^"|"$/g, '');
    const header = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    const requestUrl = `${this.apiUrl}${url}`
    if (token) {
      return httpClient.post(requestUrl, objeto, header)
    } else {
      return httpClient.post(requestUrl, objeto)
    }
  }

  put(url, objeto) {
    let token = localStorage.getItem('access_token') || '';
    token = token.replace(/^"|"$/g, '');
    const header = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    const requestUrl = `${this.apiUrl}${url}`
    if (token) {
      return httpClient.put(requestUrl, objeto, header)
    } else {
      return httpClient.put(requestUrl, objeto)
    }
  }

  delete(url) {
    let token = localStorage.getItem('access_token') || '';
    token = token.replace(/^"|"$/g, '');
    const header = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    const requestUrl = `${this.apiUrl}${url}`
    if (token) {
      return httpClient.delete(requestUrl, header)
    } else {
      return httpClient.delete(requestUrl)
    }
  }

  get(url) {
    let token = localStorage.getItem('access_token') || '';
    token = token.replace(/^"|"$/g, '');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const requestUrl = `${this.apiUrl}${url}`;

    if (token) {
      console.log(headers);
      return httpClient.get(requestUrl, {headers});
    } else {
      mensagemErro("Sua sessão expirou. Faça login novamente.");
      return Promise.reject({
        response: {
          data: {
            message: 'Sua sessão expirou. Faça login novamente.'
          }
        }
      });
    }
  }


}

export default ApiService