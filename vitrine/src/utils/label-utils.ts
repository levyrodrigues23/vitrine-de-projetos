const INTERNAL_VALUE_LABELS: Record<string, string> = {
  // curso (egresso)
  sistemas: "Sistemas de Informação",
  software: "Engenharia de Software",
  redes: "Redes de Computadores",
  outro: "Outro",
  // status de atuação (egresso)
  ativo: "Ativo no mercado",
  empreendendo: "Empreendendo",
  pesquisando: "Em pesquisa",
  transicao: "Em transição",
  // área de atuação (egresso) / setor (startup)
  tecnologia: "Tecnologia",
  gestao: "Gestão",
  educacao: "Educação",
  agro: "Agro",
  saude: "Saúde",
  // estágio (startup)
  ideia: "Ideia",
  validacao: "Validação",
  piloto: "Piloto",
};

function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Converte um valor técnico interno (enum, slug) na label acentuada exibida
 * ao usuário final. Valores fora do mapa recebem apenas a primeira letra
 * maiúscula, para nunca quebrar a exibição.
 */
export function formatLabel(value: string): string {
  return INTERNAL_VALUE_LABELS[value] ?? capitalize(value);
}
