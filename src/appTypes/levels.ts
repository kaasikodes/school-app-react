import { TAdmin } from "./admins";
import { TCourse } from "./courses";
import { TStaff } from "./staff";

export type TLevel = {
  id: number;
  name: string;
  description?: string;
  courseCount: number;
  author?: TAdmin;
  createdAt?: string;
  updatedAt?: string;
  courses?: TCourse[];
  classTeacher?: TStaff;
};
