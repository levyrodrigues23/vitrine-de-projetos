import { api } from "./api";
import type { Startup } from "../types/startup.types";
import { AxiosError } from "axios";

// TODO(#33): there is no Startups feature in backend/VitrineAPI/VitrineAPI/Features yet
// (only Projects, Teachers, WorksDone and Upload exist). Every call below hits an endpoint
// that doesn't exist on the real API. Paths are standardized to the same lower-case,
// plural convention used by projects.service.ts/teachers.service.ts so this is ready to
// wire up once the backend feature lands - this is a pending backend gap, not a fix.

export type CreateStartupPayload = Omit<Startup, "id">;

export async function listStartups(): Promise<Startup[]> {
  const response = await api.get<Startup[]>("/startups");
  return response.data;
}

export async function uploadStartupImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<{ url: string }>(
    "/upload/startups/image",
    formData,
  );

  return response.data.url;
}

export async function getStartupById(id: string): Promise<Startup | null> {
  try {
    const response = await api.get<Startup>(`/startups/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function createStartup(
  payload: CreateStartupPayload,
): Promise<Startup> {
  const response = await api.post<Startup>("/startups", payload);
  return response.data;
}

export async function updateStartup(
  id: string,
  payload: Partial<Startup>,
): Promise<Startup> {
  const response = await api.put<Startup>(`/startups/${id}`, payload);
  return response.data;
}

export async function deleteStartup(id: string): Promise<void> {
  await api.delete(`/startups/${id}`);
}
