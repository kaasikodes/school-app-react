import { TAdmin } from "./admins";
import { TCourse } from "./courses";

export type TLevel = {
  id: number;
  name: string;
  description?: string;
  courseCount: number;
  author?: TAdmin;
  createdAt?: string;
  updatedAt?: string;
  courses?: TCourse[];
};
