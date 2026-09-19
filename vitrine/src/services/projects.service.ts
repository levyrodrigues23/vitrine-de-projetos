import { AxiosError } from "axios";
import { api } from "./api";
import type { Project } from "../types/project.types";
import type { WorkDone } from "../types/workDone.types";

export type CreateProjectPayload = Omit<Project, "id">;

export async function listProjects(): Promise<Project[]> {
  const response = await api.get<Project[]>("/projects");
  return response.data;
}

// Backend's ProjectsResponse (Features/Projects/Shared/ProjectResponse.cs) never includes
// work items, so a project's worksDone has to be fetched separately and merged in here.
async function getProjectWorksDone(projectId: string): Promise<WorkDone[]> {
  const response = await api.get<WorkDone[]>(
    `/projects/${projectId}/worksdone`,
  );
  return response.data;
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const response = await api.get<Project>(`/projects/${id}`);
    const worksDone = await getProjectWorksDone(id);
    return { ...response.data, worksDone };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function uploadProjectImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<{ url: string }>(
    "/upload/projects/image",
    formData,
  );

  return response.data.url;
}

export async function createProject(
  payload: CreateProjectPayload,
): Promise<Project> {
  const response = await api.post<Project>("/projects", payload);
  return response.data;
}

export async function updateProject(
  id: string,
  payload: Partial<Project>,
): Promise<Project> {
  const response = await api.put<Project>(`/projects/${id}`, payload);
  return response.data;
}

export async function deleteProject(id: string): Promise<void> {
  await api.delete(`/projects/${id}`);
}
