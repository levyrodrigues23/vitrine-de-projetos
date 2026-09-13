import type { WorkDone } from "./workDone.types";

export const ProjectCategory = {
  Inovacao: "Inovação",
  Extensao: "Extensão",
  Pesquisa: "Pesquisa",
} as const;

export type ProjectCategory =
  (typeof ProjectCategory)[keyof typeof ProjectCategory];
export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl?: string;
  // TODO(#33): `ProjectRequest`/`ProjectsResponse` on the backend (Features/Projects/Shared)
  // have no "Responsible" field at all, so this is silently dropped on create/update and
  // never comes back from the API. Real backend gap, not a naming mismatch.
  responsible?: string;
  // TODO(#33): `ProjectsResponse` never includes work items; `projects.service.ts#getProjectById`
  // fetches GET /projects/{id}/worksdone separately and merges it in here.
  worksDone?: WorkDone[];
}
