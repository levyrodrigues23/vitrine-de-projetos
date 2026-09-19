export const Grau = {
  Graduacao: "graduacao",
  PosGraduacao: "posGraduacao",
  Mestrado: "mestrado",
  Doutorado: "doutorado",
} as const;

export type Grau = typeof Grau[keyof typeof Grau];

export interface Teacher {
  id: string;
  name: string;
  description: string;
  email: string;
  lattes: string;
  // Wire name is `field` on the backend (Features/Teachers/Shared); teachers.service.ts
  // maps between the two at the request/response boundary. See issue #33.
  area: string;
  // Wire name is `academicDegree` on the backend; same mapping in teachers.service.ts.
  grau: Grau;
  imageUrl?: string;
}