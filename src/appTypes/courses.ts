import { TAdmin } from "./admins";

export type TCourse = {
  id: number;
  name: string;
  description?: string;
  levelCount: number;
  author?: TAdmin;
  createdAt?: string;
  updatedAt?: string;
};
