import { TAdmin } from "./admins";
import { TLevel } from "./levels";

export type TCourse = {
  id: number;
  name: string;
  description?: string;
  levelCount?: number;
  levels?: TLevel[];
  author?: TAdmin;
  createdAt?: string;
  updatedAt?: string;
};
