import { ERole } from "./roles";

export enum EAuthOps {
  LOGIN_USER, // SHOULD BE LOGIN
  LOGOUT_USER,
  RETRIEVE_USER,
  UPDATE_SCHOOLS,
  CHANGE_SCHOOL,
  CHANGE_USER_ROLE_IN_CHOOSEN_SCHOOL,
  UPDATE_POSSIBLE_USER_ROLES_IN_CHOOSEN_SCHOOL,
  SET_USER_LOGIN_DETAILS,
}

export interface IUser {
  id: string;
  email: string;
  photo?: string;
  name: string;
  phone?: string;
  password?: string;
}

export interface IAuthSchool {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  adminId?: string;
  staffId?: string;
  custodianId?: string;
  studentId?: string;
  currentRole?: ERole;
  roles: ERole[];
  currentSessionId: string;
}

export interface IAuthDets {
  loggedIn: boolean;
  user: IUser;
  userToken: string;
  choosenSchoolId?: string;
  choosenSchoolCurrentSessionId?: string;
  currentUserRoleInChoosenSchool?: ERole;
  possibleUserRolesInChoosenSchool?: ERole[];

  //   staff in the following schools
  schools: IAuthSchool[];
}
