import { Curso, type Egresso } from "../types/egress.types";

export const EGRESSO_CURSO_FILTERS: Curso[] = [
  Curso.AnaliseeDesenvolvimentodeSistemas,
  Curso.SegurançadaInformaçãoo,
  Curso.CienciadeDados,
  Curso.Teatro,
];

export const MOCK_EGRESSOS: Egresso[] = [
  {
    id: "1",
    nome: "Ana Beatriz Oliveira",
    descricao:
      "Atua como desenvolvedora backend em uma fintech, trabalhando principalmente com APIs de pagamento e integrações bancárias.",
    ano_graduacao: "2022",
    contato: "ana.oliveira@exemplo.com",
    curso: Curso.AnaliseeDesenvolvimentodeSistemas,
  },
  {
    id: "2",
    nome: "Carlos Eduardo Lima",
    descricao:
      "Pesquisador em segurança ofensiva, hoje colaborando com um time de resposta a incidentes de uma empresa de telecomunicações.",
    ano_graduacao: "2021",
    contato: "carlos.lima@exemplo.com",
    curso: Curso.SegurançadaInformaçãoo,
  },
  {
    id: "3",
    nome: "Fernanda Costa Rego",
    descricao:
      "Cientista de dados em uma cooperativa agrícola, aplicando modelos preditivos para otimizar safras da região.",
    ano_graduacao: "2023",
    contato: "fernanda.rego@exemplo.com",
    curso: Curso.CienciadeDados,
  },
  {
    id: "4",
    nome: "Juliana Pereira Alves",
    descricao:
      "Segue carreira artística com um coletivo de teatro comunitário, levando peças autorais a escolas públicas da região.",
    ano_graduacao: "2020",
    contato: "juliana.alves@exemplo.com",
    curso: Curso.Teatro,
  },
  {
    id: "5",
    nome: "Rafael Souza Martins",
    descricao:
      "Trabalha como analista de sistemas em uma prefeitura da região, modernizando processos internos de atendimento ao cidadão.",
    ano_graduacao: "2022",
    contato: "rafael.martins@exemplo.com",
    curso: Curso.AnaliseeDesenvolvimentodeSistemas,
  },
  {
    id: "6",
    nome: "Larissa Nunes Farias",
    descricao:
      "Consultora de privacidade e conformidade com a LGPD para pequenas e médias empresas do estado.",
    ano_graduacao: "2021",
    contato: "larissa.farias@exemplo.com",
    curso: Curso.SegurançadaInformaçãoo,
  },
  {
    id: "7",
    nome: "Pedro Henrique Barros",
    descricao:
      "Cursando mestrado em aprendizado de máquina, com pesquisa voltada a diagnóstico por imagem na área da saúde.",
    ano_graduacao: "2023",
    contato: "pedro.barros@exemplo.com",
    curso: Curso.CienciadeDados,
  },
  {
    id: "8",
    nome: "Camila Rodrigues Dias",
    descricao:
      "Produtora cultural, organiza festivais de artes cênicas independentes na região metropolitana.",
    ano_graduacao: "2019",
    contato: "camila.dias@exemplo.com",
    curso: Curso.Teatro,
  },
];
