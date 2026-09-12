import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text } from "../../components/ui";
import { useEgressNews } from "../../hooks/egress";
import { useSeo } from "../../hooks/seo";

export function NoticiasEgressosPage() {
  useSeo({
    title: "Notícias de Egressos",
    description:
      "Notícias e histórias de sucesso de egressos do Campus UFC Itapajé.",
  });

  const { news, loading, error } = useEgressNews();

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

        {loading ? (
          <p className="mt-8 text-center text-gray-base">
            Carregando notícias...
          </p>
        ) : error ? (
          <p className="mt-8 text-center text-red-500">{error}</p>
        ) : news.length === 0 ? (
          <p className="mt-8 text-center text-gray-base">
            Nenhuma notícia publicada no momento.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <Card
                key={item.id}
                className="flex flex-col space-y-3 p-6 text-center md:text-left"
              >
                <Text as="h3" variant="body-lg-bold">
                  {item.title}
                </Text>
                <Text variant="body-md" className="text-gray-base">
                  {item.description}
                </Text>
                <Text variant="body-sm" className="text-gray-base">
                  {new Date(item.date).toLocaleDateString("pt-BR", {
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
