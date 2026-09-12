import { Badge, Card, Text } from "../../ui";
import type { Egresso } from "../../../types/egress.types";

export interface EgressoCardProps {
  egresso: Egresso;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

export function EgressoCard({ egresso }: EgressoCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue/10 text-lg font-bold text-blue-dark">
          {initials(egresso.nome)}
        </div>
        <div>
          <Text as="h3" variant="body-lg-bold">
            {egresso.nome}
          </Text>
          <Text variant="body-sm" className="text-gray-base">
            Turma {egresso.ano_graduacao}
          </Text>
        </div>
      </div>

      <Badge variant="secondary" className="w-fit">
        {egresso.curso}
      </Badge>

      <Text variant="body-md" className="text-gray-base">
        {egresso.descricao}
      </Text>

      <a
        href={`mailto:${egresso.contato}`}
        className="mt-auto text-sm font-semibold text-blue-dark hover:underline"
      >
        {egresso.contato}
      </a>
    </Card>
  );
}
