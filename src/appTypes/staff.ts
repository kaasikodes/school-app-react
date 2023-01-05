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
};
