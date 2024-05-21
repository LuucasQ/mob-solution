import { AxiosResponse } from "axios";
import { api } from "../config";

type RequestLogin = {
  login: string;
	senha: string;
}

type ResponseLogin = {
  error?: boolean
  mensagem?: string
  id?: number
  nome?: string
  email?: string
  token?: string
  tipoUsuario?: {
    id?: number
    codigo?: number
    nome?: string
    descricao?: string
  }
}

export default async function Login({ login, senha }: RequestLogin){
  
  const { data }: AxiosResponse<ResponseLogin> = await api.post('api/usuario/login', {
    login: login,
    senha: senha,
    tokenAcesso: process.env.TOKEN_ACESSO
  })

  return JSON.parse(decodeURIComponent(String(data))) as ResponseLogin
}