import { TDepartment } from "./departments";
import { TLevel } from "./levels";

export type TCourse = {
  id: number;
  name: string;
  description?: string;
  levelCount?: number;
  levels?: TLevel[];
  department?: TDepartment;
  createdAt?: string;
  updatedAt?: string;
};
