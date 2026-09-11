import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text } from "../../components/ui";
import { useSeo } from "../../hooks/seo";

export function NoticiasEgressosPage() {
  useSeo({
    title: "Notícias de Egressos",
    description:
      "Notícias e histórias de sucesso de egressos do Campus UFC Itapajé.",
  });

  const news = [
    {
      title: "Egresso participa de pesquisa internacional",
      description:
        "Ex-aluno integra grupo de pesquisa em universidade parceira.",
      date: "Mar 2026",
    },
    {
      title: "Projeto de egresso vira negócio local",
      description:
        "Solução criada no campus se transforma em serviço regional.",
      date: "Fev 2026",
    },
    {
      title: "Egressa assume liderança em empresa de tecnologia",
      description: "Trajetória profissional reconhecida em evento regional.",
      date: "Jan 2026",
    },
  ];

  return (
    <>
      <PageHero
        title="Notícias dos Egressos"
        subtitle="Destaques e notícias sobre atuações de egressos do campus."
      />
      <Section title="Destaques">
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Notícias pontuais sobre atuações científicas, profissionais e projetos
          realizados por egressos do Campus Itapajé.
        </Text>
      </Section>
      <Section title="Notícias recentes" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Seleção de notícias e destaques recentes da comunidade de egressos.
        </Text>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Card
              key={item.title}
              className="p-6 space-y-3 text-center md:text-left"
            >
              <Text as="h3" variant="body-lg-bold">
                {item.title}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {item.description}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {item.date}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
