import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Section, Text } from "../../components/ui";
import { useJuniorCompanies } from "../../hooks/junior-company";
import { useSeo } from "../../hooks/seo";

export function EmpresaJrPage() {
  useSeo({
    title: "Empresa Júnior",
    description:
      "Conheça os projetos da Empresa Júnior do Campus UFC Itapajé para pequenas empresas e iniciativas comunitárias.",
  });

  const { companies, loading, error } = useJuniorCompanies();

  return (
    <>
      <PageHero
        title="Empresa Jr"
        subtitle="Projetos de consultoria e experiências práticas com impacto local."
      />
      <Section
        title="Sobre a Empresa Jr"
        description="A Empresa Jr promove experiências práticas para alunos, oferecendo projetos de consultoria, tecnologia e apoio a negócios locais."
        align="center"
      />
      <Section
        title="Projetos recentes"
        description="Exemplos de entregas realizadas por equipes da Empresa Jr."
        showSeparator={false}
        align="center"
      >
        {loading ? (
          <p className="text-center text-gray-base">Carregando projetos...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : companies.length === 0 ? (
          <p className="text-center text-gray-base">
            Nenhum projeto registrado no momento.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Card
                key={company.id}
                className="flex flex-col items-center p-6 space-y-3 text-center md:items-start md:text-left"
              >
                <Text as="h3" variant="body-lg-bold">
                  {company.title}
                </Text>
                <Text variant="body-md" className="text-gray-base">
                  {company.description}
                </Text>
                {company.nomeEmpresa && (
                  <Text variant="body-sm" className="text-gray-base">
                    Empresa parceira: {company.nomeEmpresa}
                  </Text>
                )}
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
