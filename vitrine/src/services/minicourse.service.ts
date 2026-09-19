import { AxiosError } from "axios";
import { api } from "./api";
import { Público } from "../types/minicourse.types";
import type { Minicourse } from "../types/minicourse.types";

// Backend's MiniCourseRequest/MiniCourseResponse (Features/MiniCourses/Shared) name
// this field `targetAudience`, not `publico`, and its valid values are the
// capitalized "Interno"/"Externo", not the lower-case "interno"/"externo" used in the
// rest of the app. Map at the wire boundary. MiniCourse has no image field on the
// backend, so there is no upload step here (unlike Projects/Teachers/Startups).
interface MiniCourseWire {
  id: string;
  title: string;
  description: string;
  organizers: string;
  targetAudience: "Interno" | "Externo";
}

type MiniCourseWirePayload = Omit<MiniCourseWire, "id">;

const PUBLICO_TO_WIRE: Record<Público, MiniCourseWire["targetAudience"]> = {
  [Público.Internal]: "Interno",
  [Público.External]: "Externo",
};

const PUBLICO_FROM_WIRE: Record<MiniCourseWire["targetAudience"], Público> = {
  Interno: Público.Internal,
  Externo: Público.External,
};

function fromWire(wire: MiniCourseWire): Minicourse {
  const { targetAudience, ...rest } = wire;
  return { ...rest, publico: PUBLICO_FROM_WIRE[targetAudience] };
}

function toWire<T extends Partial<Minicourse>>(
  payload: T,
): Partial<MiniCourseWirePayload> {
  const { publico, ...rest } = payload;
  return {
    ...rest,
    ...(publico !== undefined ? { targetAudience: PUBLICO_TO_WIRE[publico] } : {}),
  };
}

export type CreateMinicoursePayload = Omit<Minicourse, "id">;

export async function listMinicourses(): Promise<Minicourse[]> {
  const response = await api.get<MiniCourseWire[]>("/minicourses");
  return response.data.map(fromWire);
}

export async function getMinicourseById(id: string): Promise<Minicourse | null> {
  try {
    const response = await api.get<MiniCourseWire>(`/minicourses/${id}`);
    return fromWire(response.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function createMinicourse(
  payload: CreateMinicoursePayload,
): Promise<Minicourse> {
  const response = await api.post<MiniCourseWire>("/minicourses", toWire(payload));
  return fromWire(response.data);
}

export async function updateMinicourse(
  id: string,
  payload: Partial<Minicourse>,
): Promise<Minicourse> {
  const response = await api.put<MiniCourseWire>(`/minicourses/${id}`, toWire(payload));
  return fromWire(response.data);
}

export async function deleteMinicourse(id: string): Promise<void> {
  await api.delete(`/minicourses/${id}`);
}
