import { useMemo, useState } from "react";
import PageHero from "../../components/layout/page-hero/page-hero";
import { Section } from "../../components/ui";
import { TeacherCard, AreaCard } from "../../components/features";
import { useTeachers } from "../../hooks/teacher";
import { useSeo } from "../../hooks/seo";
import { GraduationCap } from "lucide-react";

interface TeacherAreaSummary {
  id: string;
  name: string;
  count: number;
}

export function ProfessoresPage() {
  useSeo({
    title: "Professores",
    description:
      "Conheça os professores responsáveis pelos projetos de pesquisa, inovação e extensão do Campus UFC Itapajé.",
  });

  const { teachers, loading, error } = useTeachers();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const areas = useMemo<TeacherAreaSummary[]>(() => {
    const counts = new Map<string, number>();
    teachers.forEach((teacher) => {
      if (!teacher.area) return;
      counts.set(teacher.area, (counts.get(teacher.area) ?? 0) + 1);
    });

    return Array.from(counts.entries())
      .map(([name, count]) => ({ id: name, name, count }))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }, [teachers]);

  const filteredTeachers = selectedArea
    ? teachers.filter((teacher) => teacher.area === selectedArea)
    : teachers;

  const handleAreaToggle = (areaId: string) => {
    setSelectedArea((current) => (current === areaId ? null : areaId));
  };

  return (
    <>
      <PageHero
        title="Professores"
        subtitle="Corpo docente, áreas de atuação e contatos institucionais."
      />

      <Section title="Corpo docente" align="center">
        {loading ? (
          <p className="text-center text-gray-base">
            Carregando professores...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">
            {error}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 transition-all duration-300 md:grid-cols-2 lg:grid-cols-3">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  name={teacher.name}
                  grau={teacher.grau}
                  imageUrl={undefined}
                  lattes={teacher.lattes}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-base">
                <p className="text-lg font-medium">
                  Nenhum professor encontrado nesta área
                </p>
              </div>
            )}
          </div>
        )}
      </Section>

      <Section
        title="Áreas de atuação"
        description="Explore as principais áreas de pesquisa e ensino"
        align="center"
      >
        {loading ? (
          <p className="text-center text-gray-base">
            Carregando áreas de atuação...
          </p>
        ) : areas.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <AreaCard
                key={area.id}
                name={area.name}
                description={`${area.count} ${area.count === 1 ? "professor" : "professores"} nesta área.`}
                icon={GraduationCap}
                isSelected={selectedArea === area.id}
                onClick={() => handleAreaToggle(area.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-base">
            Nenhuma área de atuação disponível no momento
          </p>
        )}

        {selectedArea && areas.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setSelectedArea(null)}
              className="rounded-lg border border-blue-dark bg-white px-6 py-2 font-semibold text-blue-dark transition hover:bg-blue-dark hover:text-white"
            >
              Ver todos
            </button>
          </div>
        )}
      </Section>

    </>
  );
}
