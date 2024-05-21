import { AxiosResponse } from "axios";
import { api } from "../config";

type RequestValidateCode = {
  email: string;
  tokenRecuperarSenha: string;
}

type ResponseValidateCode = {
  error: boolean
  mensagem: string
}

export default async function ValidateCodeEmail({ email, tokenRecuperarSenha }: RequestValidateCode){
  
  const { data }: AxiosResponse<ResponseValidateCode> = await api.post('api/usuario/validarCodigoRecuperacao', {
    email: email,
    tokenRecuperarSenha: tokenRecuperarSenha
  })

  return JSON.parse(decodeURIComponent(String(data))) as ResponseValidateCode
}