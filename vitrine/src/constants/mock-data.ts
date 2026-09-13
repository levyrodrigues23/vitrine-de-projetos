import { ProjectCategory, type Project } from "../types/project.types";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Sistema de Gestão Acadêmica",
    description: "Plataforma web para gerenciamento de cursos, alunos e notas",
    category: ProjectCategory.Pesquisa,
    imageUrl: "https://images.unsplash.com/photo-1516534775068-bb57e39f0bca?w=500&h=300&fit=crop",
    worksDone: [
      {
        id: "wd1",
        title: "Sistema X",
        description: "Descrição...",
        category: ProjectCategory.Pesquisa,
        imageUrl: "...",
      },
    ],
  },
  {
    id: "2",
    title: "App Mobile de Eventos",
    description: "Aplicativo para descobrir e participar de eventos na universidade",
    category: ProjectCategory.Inovacao,
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    worksDone: [
      {
        id: "wd2",
        title: "Trabalho 1",
        description: "Descrição do trabalho 1",
        category: ProjectCategory.Pesquisa,
        imageUrl: "https://images.unsplash.com/photo-1516534775068-bb57e39f0bca?w=500&h=300&fit=crop",
      },
    ],
  },
  {
    id: "3",
    title: "Dashboard de Analytics",
    description: "Dashboard interativo para análise de dados em tempo real",
    category: ProjectCategory.Extensao,
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    worksDone: [
      {
        id: "wd3",
        title: "Trabalho 2",
        description: "Descrição do trabalho 2",
        category: ProjectCategory.Pesquisa,
        imageUrl: "https://images.unsplash.com/photo-1516534775068-bb57e39f0bca?w=500&h=300&fit=crop",
      },
    ],
  },
  {
    id: "4",
    title: "Chatbot IA",
    description: "Assistente virtual com inteligência artificial para atendimento",
    category: ProjectCategory.Pesquisa,
    imageUrl:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&h=300&fit=crop",
    worksDone: [
      {
        id: "wd4",
        title: "Trabalho 3",
        description: "Descrição do trabalho 3",
        category: ProjectCategory.Pesquisa,
        imageUrl: "https://images.unsplash.com/photo-1516534775068-bb57e39f0bca?w=500&h=300&fit=crop",
      },
    ],
  },
  {
    id: "5",
    title: "Plataforma E-learning",
    description: "Ambiente virtual para cursos online e educação a distância",
    category: ProjectCategory.Extensao,
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    worksDone: [
      {
        id: "wd5",
        title: "Trabalho 4",
        description: "Descrição do trabalho 4",
        category: ProjectCategory.Pesquisa,
        imageUrl: "https://images.unsplash.com/photo-1516534775068-bb57e39f0bca?w=500&h=300&fit=crop",
      },
    ],
  },
  {
    id: "6",
    title: "API REST de Biblioteca",
    description: "Serviço de backend para gerenciamento de acervo bibliográfico",
    category: ProjectCategory.Inovacao,
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    worksDone: [
      {
        id: "wd6",
        title: "Trabalho 5",
        description: "Descrição do trabalho 5",
        category: ProjectCategory.Pesquisa,
        imageUrl: "https://images.unsplash.com/photo-1516534775068-bb57e39f0bca?w=500&h=300&fit=crop",
      },
    ],
  },
];

export const MOCK_AREAS = [
  {
    id: "software",
    name: "Engenharia de Software",
    description: "Desenvolvimento e gestão de projetos de software",
    icon: "Code2",
  },
  {
    id: "data",
    name: "Ciência de Dados",
    description: "Análise e interpretação de dados complexos",
    icon: "BarChart3",
  },
  {
    id: "ai",
    name: "Inteligência Artificial",
    description: "Machine learning e sistemas inteligentes",
    icon: "Brain",
  },
  {
    id: "web",
    name: "Desenvolvimento Web",
    description: "Aplicações web modernas e responsivas",
    icon: "Globe",
  },
  {
    id: "database",
    name: "Banco de Dados",
    description: "Armazenamento e gerenciamento de dados",
    icon: "Database",
  },
  {
    id: "games",
    name: "Jogos",
    description: "Desenvolvimento e design de jogos",
    icon: "Gamepad2",
  },
  {
    id: "security",
    name: "Segurança da Informação",
    description: "Proteção de dados e sistemas",
    icon: "Shield",
  },
  {
    id: "networks",
    name: "Redes de Computadores",
    description: "Comunicação e infraestrutura de rede",
    icon: "Network",
  },
  {
    id: "architecture",
    name: "Arquitetura de Sistemas",
    description: "Design e arquitetura de sistemas complexos",
    icon: "Building2",
  },
];
