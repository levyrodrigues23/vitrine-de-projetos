import { api } from "./api";
import type { Grau, Teacher } from "../types/teachers.types";
import { AxiosError } from "axios";

// Backend's TeacherRequest/TeacherResponse (Features/Teachers/Shared) name these
// `field` and `academicDegree`, not `area`/`grau`. Map at the wire boundary so the
// rest of the app can keep using the frontend's own field names.
export interface TeacherWire {
  id: string;
  name: string;
  description: string;
  email: string;
  lattes: string;
  field: string;
  academicDegree: string;
  imageUrl: string;
}

type TeacherWirePayload = Omit<TeacherWire, "id">;

export function teacherFromWire(wire: TeacherWire): Teacher {
  const { field, academicDegree, ...rest } = wire;
  return { ...rest, area: field, grau: academicDegree as Grau };
}

function toWire<T extends Partial<Teacher>>(
  payload: T,
): Partial<TeacherWirePayload> {
  const { area, grau, ...rest } = payload;
  return {
    ...rest,
    ...(area !== undefined ? { field: area } : {}),
    ...(grau !== undefined ? { academicDegree: grau } : {}),
  };
}

export async function listTeachers(): Promise<Teacher[]> {
  const response = await api.get<TeacherWire[]>("/teachers");
  return response.data.map(teacherFromWire);
}


export async function getTeacherById(id: string): Promise<Teacher | null> {
  try {
    const response = await api.get<TeacherWire>(`/teachers/${id}`);
    return teacherFromWire(response.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function createTeacher(payload: Teacher) : Promise<Teacher>{
  const response = await api.post<TeacherWire>("/teachers", toWire(payload));
  return teacherFromWire(response.data);
}

export async function updateTeacher(id: string, payload: Partial<Teacher>) : Promise<Teacher> {
  const response = await api.put<TeacherWire>(`/teachers/${id}`, toWire(payload));
  return teacherFromWire(response.data);
}


export async function deleteTeacher(id: string): Promise<void> {
  await api.delete(`/teachers/${id}`);
}