import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text } from "../../components/ui";
import Technical from "../../assets/icons/productions.svg";
import { ProjectCard } from "../../components/features";
import { useProducaoTecnica } from "../../hooks/producao-tecnica";
import { useSeo } from "../../hooks/seo";

export function ProducaoTecnicaPage() {
useSeo({
  title: "Produção Técnica",
  description:
    "Softwares, aplicativos e demais produções técnicas desenvolvidas no Campus UFC Itapajé.",
});

const { items: artifacts, loading, error } = useProducaoTecnica();

  const valores = [
    {
      title: "01",
      categoria: "Projetos integradores",
      description:
        "Desenvolvidos por turmas ao longo do semestre, articulando saberes de múltiplas disciplinas em um produto funcional.",
    },
    {
      title: "02",
      categoria: "TCCs",
      description:
        "TCCs com entregável técnico: sistemas, protótipos, guias e ferramentas validadas em contexto real.",
    },
    {
      title: "03",
      categoria: "Ações de extensão",
      description:
        "Softwares, apps e materiais criados em projetos de extensão que impactam diretamente comunidades externas.",
    },
  ];

  return (
    <>
      <PageHero
        title="Produção técnica"
        subtitle="Artefatos, softwares e ferramentas desenvolvidos em disciplinas integradoras, projetos e TCCs."
      />
      <Section title="O que é a produção técnica?" align="center">
        <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-2xl md:flex-row md:items-start md:p-8">
          <Text
            className="text-center md:text-left"
            as="h2"
            variant="body-lg"
          >
            A <strong>produção técnica</strong> se refere aos artefatos,
            ferramentas, softwares e outros resultados práticos gerados a partir
            de projetos, disciplinas integradoras, TCCs e outras atividades
            acadêmicas. Esses produtos técnicos representam a aplicação do
            conhecimento adquirido pelos estudantes e professores em soluções
            concretas para desafios reais.
            <br />
            <br />
            A produção técnica é fundamental para demonstrar o impacto prático
            das atividades acadêmicas, contribuindo para a formação de
            profissionais capacitados e para o desenvolvimento de soluções
            inovadoras que beneficiam a comunidade e o mercado.
          </Text>

          <img
            src={Technical}
            alt="Ilustração representando a produção de software e ferramentas técnicas"
            className="mt-8 w-56 object-contain md:ml-8 md:mt-0 md:w-72"
          />
        </div>
      </Section>
      <Section
        title="Como são produzidas?"
        description="A produção técnica do campus surge de diferentes contextos acadêmicos."
        align="center"
      >
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {valores.map((valor) => (
            <Card
              key={valor.title}
              className="flex flex-col items-center p-6 space-y-3 text-center md:items-start md:text-left"
            >
              <Text as="h3" variant="title-3" className="text-green-dark">
                {valor.title}
              </Text>
              <Text as="h3" variant="body-lg-bold">
                {valor.categoria}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {valor.description}
              </Text>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Artefatos e ferramentas"
        description="Abaixo é possível visualizar alguns exemplos de artefatos, projetos e ferramentas desenvolvidas por estudantes e professores da comunidade acadêmica."
        showSeparator={false}
        align="center"
      >
        {loading ? (
          <p className="text-center text-gray-base">Carregando artefatos...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : artifacts.length === 0 ? (
          <p className="text-center text-gray-base">
            Nenhum artefato registrado no momento.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {artifacts.map((artifact) => (
              <ProjectCard
                key={artifact.id}
                title={artifact.title}
                description={artifact.description}
                category={artifact.category}
                imageUrl={artifact.imageUrl}
                area={artifact.area}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
