import { useState } from "react";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Icon, Section, Text } from "../../components/ui";
import { EgressoCard } from "../../components/features";
import Egress from "../../assets/icons/egresss.svg?react";
import { useEgressos } from "../../hooks/egress";
import { EGRESSO_CURSO_FILTERS } from "../../constants/egressos.mock";
import type { Curso } from "../../types/egress.types";
import { useSeo } from "../../hooks/seo";

export function EgressosPage() {
  useSeo({
    title: "Egressos",
    description:
      "Conheça a trajetória profissional dos egressos dos cursos do Campus UFC Itapajé.",
  });

  const { egressos, loading, error } = useEgressos();
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);

  const filteredEgressos = selectedCurso
    ? egressos.filter((egresso) => egresso.curso === selectedCurso)
    : egressos;

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

      <Section
        title="Egressos em destaque"
        description="Conheça alguns egressos e onde estão atuando depois de formados."
        showSeparator={false}
        align="center"
      >
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setSelectedCurso(null)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedCurso === null
                ? "bg-blue-dark text-white"
                : "border border-blue-dark/30 text-blue-dark hover:bg-blue-dark/10"
            }`}
          >
            Todos os cursos
          </button>
          {EGRESSO_CURSO_FILTERS.map((curso) => (
            <button
              key={curso}
              type="button"
              onClick={() => setSelectedCurso(curso)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCurso === curso
                  ? "bg-blue-dark text-white"
                  : "border border-blue-dark/30 text-blue-dark hover:bg-blue-dark/10"
              }`}
            >
              {curso}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-base">Carregando egressos...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredEgressos.length === 0 ? (
          <p className="text-center text-gray-base">
            Nenhum egresso encontrado para este curso.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEgressos.map((egresso) => (
              <EgressoCard key={egresso.id} egresso={egresso} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
