import { AxiosResponse } from "axios";
import { api } from "../config";

type RequestResetPassword = {
  email: string;
  tokenRecuperarSenha: string;
  novaSenha: string;
}

type ResponseResetPassword = {
  erro: boolean
  mensagem: string
}

export default async function ResetPassword({ email, novaSenha, tokenRecuperarSenha }: RequestResetPassword){
  
  const { data }: AxiosResponse<ResponseResetPassword> = await api.post('api/usuario/alterarSenha', {
    email: email,
    tokenRecuperarSenha: tokenRecuperarSenha,
    novaSenha: novaSenha,
  })

  return JSON.parse(decodeURIComponent(String(data))) as ResponseResetPassword
}