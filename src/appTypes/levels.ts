import { TAdmin } from "./admins";

export type TLevel = {
  id: number;
  name: string;
  description?: string;
  courseCount: number;
  author?: TAdmin;
  createdAt?: string;
  updatedAt?: string;
};
