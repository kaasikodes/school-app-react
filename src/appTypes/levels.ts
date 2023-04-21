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
  courses?: Pick<
    TCourse & {
      courseSessionTeacherStaffId?: number;
      courseSessionTeacherStaffUser?: {
        name: string;
        email: string;
        staffNo: string;
      };
    },
    | "id"
    | "name"
    | "courseSessionTeacherStaffId"
    | "courseSessionTeacherStaffUser"
  >[];

  classTeacher?: Pick<TStaff, "name" | "id" | "email">;
};
