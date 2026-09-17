import PageHero from "../../components/layout/page-hero/page-hero";
import { Card, Icon, Section, Text } from "../../components/ui";
import Egress from "../../assets/icons/egresss.svg?react";
import { useSeo } from "../../hooks/seo";

export function EgressosPage() {
  useSeo({
    title: "Egressos",
    description:
      "Conheça a trajetória profissional dos egressos dos cursos do Campus UFC Itapajé.",
  });

  const courses = [
    {
      title: "Engenharia de Software",
      description: "Egressos atuando em empresas de tecnologia e startups.",
    },
    {
      title: "Sistemas de Informação",
      description: "Profissionais em análise de dados e gestão de projetos.",
    },
    {
      title: "Redes de Computadores",
      description: "Atuação em infraestrutura, segurança e suporte técnico.",
    },
  ];

  return (
    <>
      <PageHero
        title="Egressos por Curso"
        subtitle="Panorama dos egressos do campus e suas áreas de atuação."
      />
      <Section title="Por que acompanhar os egressos?">
        <div className="flex md:flex-row flex-col bg-white p-4 items-center rounded-2xl text-shadow-olive-200 shadow-2xl">
          <Text className="pt-3 pl-3" as="h2" variant="body-lg">
            Os <strong>egressos</strong> são ex-alunos que concluíram a
            graduação no Campus Itapajé e seguem carreira acadêmica ou
            profissional dentro e fora da universidade. Acompanhar sua
            trajetória ajuda a entender o impacto da formação oferecida pelo
            campus e fortalece a conexão entre a instituição e quem já passou
            por ela.
            <br />
            <br />Nesta página você encontra um panorama de cursos e as
            principais áreas em que os egressos atuam depois de formados,
            servindo como referência para estudantes e para a comunidade
            acadêmica.
          </Text>

          <Icon
            svg={Egress}
            className=" object-cover w-100 h-100 md:w-72 md:h-72 md:ml-6 "
          />
        </div>
      </Section>
      <Section title="Cursos e atuações" showSeparator={false}>
        <Text as="h2" variant="body-lg" className="text-center md:text-left">
          Seleção de cursos com exemplos de áreas em que os egressos atuam.
        </Text>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card
              key={course.title}
              className="p-6 space-y-3 text-center md:text-left"
            >
              <Text as="h3" variant="body-lg-bold">
                {course.title}
              </Text>
              <Text variant="body-md" className="text-gray-base">
                {course.description}
              </Text>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
