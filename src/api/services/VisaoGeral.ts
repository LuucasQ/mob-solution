import { AxiosResponse } from "axios";
import { api } from "../config";

type RequestVisaoGeral = {
  id: string
}

export type ResponseVisaoGeral = {
  error?: boolean;
  mensagem?: string;
  id: number;
  qtdRespondidas: number;
  qtdAcertos: number;
  qtdErros: number;
  qtdSimuladosFeitos: number;
  diasSemFaltar: number;
  qtdFlashcardsRespondidos: number;
  qtdAcertosFlashcards: number;
  qtdErrosFlashcards: number;
  qtdFlashcardsCasosClinicosRespondidos: number;
  qtdAcertosFlashcardsCadosClinicos: number;
  qtdErrosFlashcardsCadosClinicos: number;
  questoesFavoritadas: number[],
  temaDominado: {
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
    listaDeImagem: {
      id: number
      nomeArquivo: string
      largura: number
      altura: number
      token: string
      numero: number
    }[]
    icone: {
      id: number
      nomeArquivo: string
      largura: number
      altura: number
    }
    descendentes: number[]
    descendencia: any[]
    cardsDominados: number
    qtdQuestoesProvaDeTitulo: number
    qtdQuestoesOutrosCursos: number
  }
  temaMenosDominado: {
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
    listaDeImagem: any[]
    icone: {
      id: number
      nomeArquivo: string
      largura: number
      altura: number
    }
    descendentes: any[]
    descendencia: any[]
    cardsDominados: number
    qtdQuestoesProvaDeTitulo: number
    qtdQuestoesOutrosCursos: number
  }
}

export default async function VisaoGeral({ id }: RequestVisaoGeral){
  
  const { data }: AxiosResponse<ResponseVisaoGeral> = await api.post('api/estatisticas/visaogeral', {
    id: id
  })

  return JSON.parse(decodeURIComponent(String(data))) as ResponseVisaoGeral
}