import { api } from "./api";
import { AxiosError } from "axios";
import type { ProjetoEmpresaJr } from "../types/projetoEmpresaJr.types";

// Backend's feature is JrCompanyProjects (Features/JrCompanyProjects/Shared), routed
// at `/jr-company-projects`, not `/junior-companies`. Its JrCompanyProjectRequest/
// Response name the fields `imageUrl`/`companyName`, not `imageurl`/`nomeEmpresa`.
// Map at the wire boundary so the rest of the app can keep using the frontend's own
// field names.
interface JrCompanyProjectWire {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  companyName: string;
  contact: string;
}

type JrCompanyProjectWirePayload = Omit<JrCompanyProjectWire, "id">;

function fromWire(wire: JrCompanyProjectWire): ProjetoEmpresaJr {
  const { imageUrl, companyName, ...rest } = wire;
  return { ...rest, imageurl: imageUrl, nomeEmpresa: companyName };
}

function toWire<T extends Partial<ProjetoEmpresaJr>>(
  payload: T,
): Partial<JrCompanyProjectWirePayload> {
  const { imageurl, nomeEmpresa, ...rest } = payload;
  return {
    ...rest,
    ...(imageurl !== undefined ? { imageUrl: imageurl } : {}),
    ...(nomeEmpresa !== undefined ? { companyName: nomeEmpresa } : {}),
  };
}

export type CreateJuniorCompanyPayload = Omit<ProjetoEmpresaJr, "id">;

export async function listJuniorCompanies(): Promise<ProjetoEmpresaJr[]> {
  const response = await api.get<JrCompanyProjectWire[]>("/jr-company-projects");
  return response.data.map(fromWire);
}

export async function getJuniorCompanyById(
  id: string,
): Promise<ProjetoEmpresaJr | null> {
  try {
    const response = await api.get<JrCompanyProjectWire>(`/jr-company-projects/${id}`);
    return fromWire(response.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function uploadJuniorCompanyImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<{ url: string }>(
    "/upload/jr-company-projects/image",
    formData,
  );

  return response.data.url;
}

export async function createJuniorCompany(
  payload: CreateJuniorCompanyPayload,
): Promise<ProjetoEmpresaJr> {
  const response = await api.post<JrCompanyProjectWire>("/jr-company-projects", toWire(payload));
  return fromWire(response.data);
}

export async function updateJuniorCompany(
  id: string,
  payload: Partial<ProjetoEmpresaJr>,
): Promise<ProjetoEmpresaJr> {
  const response = await api.put<JrCompanyProjectWire>(
    `/jr-company-projects/${id}`,
    toWire(payload),
  );
  return fromWire(response.data);
}

export async function deleteJuniorCompany(id: string): Promise<void> {
  await api.delete(`/jr-company-projects/${id}`);
}
