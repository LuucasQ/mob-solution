export type RecoveryPasswordType = {
  email: string;
}

export type ValidateCodeType = {
  email: string;
  tokenRecuperarSenha: string;
}

export type ResetPasswordType = {
  email: string;
  tokenRecuperarSenha: string;
  novaSenha: string;
}