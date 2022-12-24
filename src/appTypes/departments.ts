import { TAdmin } from "./admins";

export type TDepartment = {
  id: number;
  name: string;
  description?: string;
  courseCount: number;
  author?: TAdmin;
  createdAt?: string;
  updatedAt?: string;
};
