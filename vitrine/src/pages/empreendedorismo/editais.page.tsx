import PageHero from "../../components/layout/page-hero/page-hero";
import { Badge, Card, Section, Text, buttonVariants, type BadgeProps } from "../../components/ui";
import { useEditais } from "../../hooks/edital/useEditais";
import { useSeo } from "../../hooks/seo";
import { Status, type Edital } from "../../types/edital.types";

const statusLabel: Record<Status, string> = {
  [Status.Andamento]: "Em andamento",
  [Status.Finalizado]: "Finalizado",
  [Status.Aserpublicado]: "A ser publicado",
};

const statusBadgeVariant: Record<Status, NonNullable<BadgeProps["variant"]>> = {
  [Status.Andamento]: "secondary",
  [Status.Finalizado]: "outline",
  [Status.Aserpublicado]: "tertiary",
};

function EditalCard({ edital }: { edital: Edital }) {
  return (
    <Card className="flex flex-col items-center p-6 space-y-3 text-center md:items-start md:text-left">
      <Badge variant={statusBadgeVariant[edital.status] ?? "default"}>
        {statusLabel[edital.status] ?? edital.status}
      </Badge>
      <Text as="h3" variant="body-lg-bold">
        {edital.title}
      </Text>
      <Text variant="body-md" className="text-gray-base">
        {edital.description}
      </Text>
      {edital.link && (
        <a
          href={edital.link}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          Ver edital
        </a>
      )}
    </Card>
  );
}

export function EditaisPage() {
  useSeo({
    title: "Editais",
    description:
      "Editais, programas de pré-aceleração e oportunidades de fomento para projetos do Campus UFC Itapajé.",
  });

  const { editais, loading, error } = useEditais();

  return (
    <>
      <PageHero
        title="Editais e Oportunidades"
        subtitle="Chamadas e oportunidades de fomento para projetos do campus."
      />
      <Section
        title="Sobre os editais"
        description="Aqui você encontra editais, chamadas e oportunidades de fomento para projetos de empreendedorismo. Acompanhe prazos, requisitos e linhas de apoio disponíveis."
        align="center"
      />
      <Section
        title="Oportunidades em destaque"
        description="Seleção de oportunidades abertas para equipes do campus."
        showSeparator={false}
        align="center"
      >
        {loading ? (
          <p className="text-center text-gray-base">Carregando editais...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : editais.length === 0 ? (
          <p className="text-center text-gray-base">
            Nenhum edital publicado no momento.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {editais.map((edital) => (
              <EditalCard key={edital.id} edital={edital} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
