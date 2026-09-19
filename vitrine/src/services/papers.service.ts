import { api } from "./api";
import { AxiosError } from "axios";
import { teacherFromWire, type TeacherWire } from "./teachers.service";
import { congressFromWire, type CongressWire } from "./congress.service";
import type {
  Artigo,
  CreateArtigoPayload,
  UpdateArtigoPayload,
} from "../types/papers.types";

// Backend's PaperRequest/PaperResponse (Features/Papers/Shared) name these
// `title`/`yearOfPublication`/`description`/`authors`/`teacherId`/`congressId`, not
// `titulo`/`ano_de_publicacao`/`descricao`/`autores`/`professorId`/`congressoId`, and
// the response nests the full teacher/congress (as `teacher`/`congress`, not
// `professor`/`congresso`). Map at the wire boundary so the rest of the app can keep
// using the frontend's own field names.
interface PaperWire {
  id: string;
  title: string;
  yearOfPublication: number;
  description: string;
  keywords?: string;
  authors: string;
  base: string;
  teacher: TeacherWire;
  congress: CongressWire;
}

interface PaperWirePayload {
  title: string;
  yearOfPublication: number;
  description: string;
  keywords?: string;
  authors: string;
  base: string;
  teacherId: string;
  congressId: string;
}

function fromWire(wire: PaperWire): Artigo {
  return {
    id: wire.id,
    titulo: wire.title,
    ano_de_publicacao: wire.yearOfPublication,
    descricao: wire.description,
    keywords: wire.keywords,
    autores: wire.authors,
    base: wire.base,
    professor: teacherFromWire(wire.teacher),
    congresso: congressFromWire(wire.congress),
  };
}

function toWire(
  payload: CreateArtigoPayload | UpdateArtigoPayload,
): Partial<PaperWirePayload> {
  const { titulo, ano_de_publicacao, descricao, autores, professorId, congressoId, ...rest } =
    payload;
  return {
    ...rest,
    ...(titulo !== undefined ? { title: titulo } : {}),
    ...(ano_de_publicacao !== undefined ? { yearOfPublication: ano_de_publicacao } : {}),
    ...(descricao !== undefined ? { description: descricao } : {}),
    ...(autores !== undefined ? { authors: autores } : {}),
    ...(professorId !== undefined ? { teacherId: professorId } : {}),
    ...(congressoId !== undefined ? { congressId: congressoId } : {}),
  };
}

export async function listArtigos(): Promise<Artigo[]> {
  const response = await api.get<PaperWire[]>("/papers");
  return response.data.map(fromWire);
}

export async function createArtigo(
  payload: CreateArtigoPayload
): Promise<Artigo> {
  const response = await api.post<PaperWire>("/papers", toWire(payload));
  return fromWire(response.data);
}

export async function updateArtigo(
  id: string,
  payload: UpdateArtigoPayload
): Promise<Artigo> {
  const response = await api.put<PaperWire>(`/papers/${id}`, toWire(payload));
  return fromWire(response.data);
}


export async function deleteArtigo(id: string): Promise<void> {
  await api.delete(`/papers/${id}`);
}

export async function getArtigoById(
  id: string
): Promise<Artigo | null> {
  try {
    const response = await api.get<PaperWire>(`/papers/${id}`);
    return fromWire(response.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}
