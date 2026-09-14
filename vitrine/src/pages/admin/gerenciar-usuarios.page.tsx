import { NavLink } from "react-router";
import { Badge, Card, Text, buttonVariants } from "../../components/ui";
import { useManagers } from "../../hooks/admin";
import { useSeo } from "../../hooks/seo";

export function GerenciarUsuariosPage() {
  useSeo({ title: "Gerenciar usuários", noIndex: true });

  const { managers, loading, error } = useManagers();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <Text
            as="p"
            variant="body-sm-bold"
            className="uppercase tracking-widest text-gray-base"
          >
            Administração
          </Text>
          <Text as="h1" variant="title-1" className="text-black">
            Gerenciar usuários
          </Text>
          <Text as="p" variant="body-md" className="text-gray-base">
            Contas de gerenciador e o que cada uma cadastrou na vitrine.
          </Text>
        </div>

        <NavLink
          to="/admin"
          className={buttonVariants({ variant: "secondary", size: "md" })}
        >
          Voltar
        </NavLink>
      </div>

      {loading ? (
        <Text variant="body-sm">Carregando gerenciadores...</Text>
      ) : error ? (
        <Text variant="body-sm" className="text-red">
          {error}
        </Text>
      ) : managers.length === 0 ? (
        <Text variant="body-sm" className="text-gray-500">
          Nenhum gerenciador cadastrado.
        </Text>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {managers.map((manager) => (
            <Card
              key={manager.id}
              className="flex flex-col gap-4 border border-gray-base/10 p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Text as="h2" variant="body-lg-bold" className="text-black">
                    {manager.name}
                  </Text>
                  <Text variant="body-sm" className="text-gray-base">
                    {manager.email}
                  </Text>
                </div>
                <Badge variant="outline">{manager.role}</Badge>
              </div>

              <div className="space-y-2">
                <Text
                  variant="body-sm-bold"
                  className="uppercase tracking-wide text-gray-base"
                >
                  Projetos adicionados ({manager.contributions.length})
                </Text>
                {manager.contributions.length === 0 ? (
                  <Text variant="body-sm" className="text-gray-500">
                    Nenhum projeto adicionado ainda.
                  </Text>
                ) : (
                  <ul className="list-disc space-y-1 pl-5">
                    {manager.contributions.map((contribution) => (
                      <li key={contribution.projectId}>
                        <Text variant="body-sm" className="text-black">
                          {contribution.projectTitle}
                        </Text>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
