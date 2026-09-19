import type { User } from "../store/useAuthStore";

export interface ManagerContribution {
  projectId: string;
  projectTitle: string;
}

export interface ManagerWithActivity extends User {
  contributions: ManagerContribution[];
}
