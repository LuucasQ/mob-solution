import { AxiosResponse } from "axios";
import { api } from "../config";

type RequestRecoveryPassword = {
  email: string;
}

type ResponseRecoveryPassword = {
  error: boolean
  mensagem: string
}

export default async function SendCode({ email }: RequestRecoveryPassword){
  
  const { data }: AxiosResponse<ResponseRecoveryPassword> = await api.post('api/usuario/solicitarRecuperacao', {
    email: email,
  })

  return JSON.parse(decodeURIComponent(String(data))) as ResponseRecoveryPassword
}