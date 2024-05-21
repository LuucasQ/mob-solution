import { AxiosResponse } from "axios";
import { api } from "../config";

type RequestTema = {
  idUsuario: string
  ordenacao: 'A_Z' | 'Z_A' | 'TEMA_MAIS_DOMINADO' | 'TEMA_MENOS_DOMINADO' | 'TEMA_MAIS_RESPONDIDO'
}

export type ResponseTema = {
  listaEstatisticasTemas: [
    {
      qtdAcertos: number
      qtdErros: number
      qtdAcertosGeral: number
      qtdErrosGeral: number
      qtdRespondidas: number
      qtdRespondidasGeral: number
      qtdStatusGrau1: number
      qtdStatusGrau1Geral: number
      qtdStatusGrau2: number
      qtdStatusGrau2Geral: number
      qtdStatusGrau3: number
      qtdStatusGrau3Geral: number
      qtdStatusGrau4: number
      qtdStatusGrau4Geral: number
      qtdStatusGrau5: number
      qtdStatusGrau5Geral: number
      estudo: {
        id: number
        qtdRespondidas: number
        qtdAcertos: number
        qtdErros: number
        qtdSimuladosFeitos: number
        diasSemFaltar: number
        qtdFlashcardsRespondidos: number
        qtdAcertosFlashcards: number
        qtdErrosFlashcards: number
        qtdFlashcardsCasosClinicosRespondidos: number
        qtdAcertosFlashcardsCadosClinicos: number
        qtdErrosFlashcardsCadosClinicos: number
        questoesFavoritadas: number[]
      }
      tema: {
        id: number
        nome: string
        nomeHierarquia: string
        qtdQuestoes: number
        qtdTotaisQuestoes: number
        ativo: boolean
        temResumo: boolean
        qtdCartas: number
        qtdTotaisCartas: number
        qtdCartasCasosClinicos: number
        qtdTotaisCartasCasosClinicos: number
        resumo: string
        listaDeImagem: any[],
        icone: {
          id: number
          nomeArquivo: string
          largura: number
          altura: number
        },
        descendentes: number[]
        descendencia: any[],
        cardsDominados: number
        qtdQuestoesProvaDeTitulo:number
        qtdQuestoesOutrosCursos: number
      }
    }
  ]
}

export default async function Tema({ idUsuario, ordenacao }: RequestTema){
  
  const { data }: AxiosResponse<ResponseTema> = await api.post('api/estatisticas/porTema', {
    idUsuario,
    ordenacao
  })

  return JSON.parse(decodeURIComponent(String(data))) as ResponseTema
}