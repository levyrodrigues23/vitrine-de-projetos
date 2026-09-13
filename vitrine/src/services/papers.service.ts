import { api } from "./api";
import { AxiosError } from "axios";
import type {
  Artigo,
  CreateArtigoPayload,
  UpdateArtigoPayload,
} from "../types/papers.types";

// TODO(#33): there is no Papers feature in backend/VitrineAPI/VitrineAPI/Features yet
// (only Projects, Teachers, WorksDone and Upload exist). Every call below hits an
// endpoint that doesn't exist on the real API - pending backend gap, not a fix.


export async function listArtigos(): Promise<Artigo[]> {
  const response = await api.get<Artigo[]>("/papers");
  return response.data;
}


export async function createArtigo(
  payload: CreateArtigoPayload
): Promise<Artigo> {
  const response = await api.post<Artigo>("/papers", payload);
  return response.data;
}

export async function updateArtigo(
  id: string,
  payload: UpdateArtigoPayload
): Promise<Artigo> {
  const response = await api.put<Artigo>(`/papers/${id}`, payload);
  return response.data;
}


export async function deleteArtigo(id: string): Promise<void> {
  await api.delete(`/papers/${id}`);
}

export async function getArtigoById(
  id: string
): Promise<Artigo | null> {
  try {
    const response = await api.get<Artigo>(`/papers/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}