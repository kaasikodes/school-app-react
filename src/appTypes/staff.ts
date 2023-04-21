import { TCourse } from "./courses";
import { TLevel } from "./levels";

export interface IStaffEntry {
  id: string;
  name: string;
  staffNo: string;
  photo?: string;

  courseCount?: number;
  groupCount?: number;
  enrollmentStatus?: boolean;
}

export type TStaff = {
  id: number;
  name: string;
  email: string;
  staffNo: string;
  createdAt: string;
  updatedAt: string;
  photo?: string;
  sessionLevels?: TLevel[];
  sessionLevelCount?: number;
};
export type TStaffCourseTeacherRecord = {
  id: number;
  staff: TStaff;
  course: TCourse;
  createdAt: string;
  updatedAt: string;
  canRecord: boolean;
};
