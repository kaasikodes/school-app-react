import { ERole } from "../appTypes/roles";
import {
  ApartmentOutlined,
  AuditOutlined,
  CalculatorOutlined,
  LogoutOutlined,
  BookOutlined,
  CheckSquareOutlined,
  UserOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

import { IoIosHammer } from "react-icons/io";

import { TbSchool } from "react-icons/tb";
import { FaSchool } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { IconType } from "react-icons";

interface IDSMProps {
  role: ERole;
}
export interface ILink {
  icon: IconType;
  label: string;
  link: string;
}
const ADMIN_LINKS: ILink[] = [
  { icon: FaSchool as IconType, label: "Home", link: "/" },
  // { icon: TbSchool as IconType, label: "Schools", link: "/schools" },
  {
    icon: ApartmentOutlined as IconType,
    label: "Departments",
    link: "/departments",
  },
  { icon: AuditOutlined as IconType, label: "Courses", link: "/courses" },
  {
    icon: BsFileEarmarkPostFill as IconType,
    label: "Levels",
    link: "/classes",
  },
  { icon: ApartmentOutlined as IconType, label: "Staff", link: "/staff" },
  { icon: IoIosHammer as IconType, label: "Policies", link: "/policies" },

  {
    icon: AuditOutlined as IconType,
    label: "Sessions",
    // link: "/sessions/admin",
    link: "/sessions",
  },

  //courses belongs to the current session

  { icon: BookOutlined as IconType, label: "Custodians", link: "/custodians" },
  { icon: GiTeacher as IconType, label: "Students", link: "/students" },

  {
    icon: CalculatorOutlined as IconType,
    label: "Reports",
    link: "/reports",
  },

  {
    icon: NotificationOutlined as IconType,
    label: "Announcements",
    link: "/announcements",
  },

  { icon: AiOutlineSchedule, label: "Payments", link: "/payments" },

  { icon: LogoutOutlined as IconType, label: "Log out", link: "/logout" },
  { icon: UserOutlined as IconType, label: "Filler", link: "/" },
];

const STAFF_LINKS: ILink[] = [
  { icon: FaSchool as IconType, label: "Home", link: "/" },
  // { icon: TbSchool as IconType, label: "Schools", link: "/schools" },

  { icon: AuditOutlined as IconType, label: "Classes", link: "/classes" },
  {
    icon: ApartmentOutlined as IconType,
    label: "Departments",
    link: "setting/departments",
  },
  {
    icon: AuditOutlined as IconType,
    label: "Sessions",
    link: "/sessions/staff",
  },

  { icon: BookOutlined as IconType, label: "Courses", link: "/courses" },

  {
    icon: CalculatorOutlined as IconType,
    label: "Assessments",
    link: "/assessments",
  },

  {
    icon: CheckSquareOutlined as IconType,
    label: "Approvals",
    link: "/approvals",
  },

  { icon: AiOutlineSchedule as IconType, label: "Events", link: "/events" },

  { icon: LogoutOutlined as IconType, label: "Log out", link: "/logout" },
];

const CUSTODIAN_LINKS: ILink[] = [
  { icon: FaSchool as IconType, label: "Home", link: "/" },
  // { icon: TbSchool as IconType, label: "Schools", link: "/schools" },

  { icon: AuditOutlined as IconType, label: "My Children", link: "/students" },

  { icon: BookOutlined as IconType, label: "Payments", link: "/courses" },

  {
    icon: CalculatorOutlined as IconType,
    label: "Academic Records",
    link: "/assessments",
  },

  {
    icon: CheckSquareOutlined as IconType,
    label: "Pending Approvals",
    link: "/approvals",
  },

  {
    icon: AiOutlineSchedule as IconType,
    label: "Upcoming Events",
    link: "/events",
  },

  { icon: LogoutOutlined as IconType, label: "Log out", link: "/logout" },
];
const STUDENT_LINKS: ILink[] = [
  { icon: FaSchool as IconType, label: "Home", link: "/" },
  // { icon: TbSchool as IconType, label: "Schools", link: "/schools" },

  {
    icon: AuditOutlined as IconType,
    label: "Academic Records",
    link: "student/academic-records",
  },

  { icon: BookOutlined as IconType, label: "My Courses", link: "/courses" },

  {
    icon: CalculatorOutlined as IconType,
    label: "Assessments",
    link: "/assessments",
  },

  {
    icon: CheckSquareOutlined as IconType,
    label: "My Requisitions",
    link: "/approvals",
  },

  {
    icon: AiOutlineSchedule as IconType,
    label: "Upcoming Events",
    link: "/events",
  },

  { icon: LogoutOutlined as IconType, label: "Log out", link: "/logout" },
];

export const dashboardSideMenuLinks = ({ role }: IDSMProps): ILink[] => {
  switch (role) {
    case ERole.ADMIN:
      return ADMIN_LINKS;
    case ERole.STAFF:
      return STAFF_LINKS;
    case ERole.CUSTODIAN:
      return CUSTODIAN_LINKS;
    case ERole.STUDENT:
      return STUDENT_LINKS;

    default:
      return [];
  }
};

// NOT NEEDED AGAIN

interface IUserLink {
  label: string;
  key: string;
  icon: IconType;
  title: string;
}

const ADMIN_USER_LINKS: IUserLink[] = [
  {
    label: "My Profile",
    key: "0",
    icon: TbSchool as IconType,
    title: "My Profile",
  },
  {
    label: "Transfer Admin Priviledge",
    key: "1",
    icon: TbSchool as IconType,
    title: "Switch school",
  },
  {
    label: "Switch School",
    key: "1",
    icon: TbSchool as IconType,
    title: "Switch school",
  },

  {
    label: `Switch role`,
    key: "3",
    title: "Switch role",

    icon: HiOutlineSwitchHorizontal as IconType,
  },
];
export const userMenuLinks = ({ role }: IDSMProps): IUserLink[] => {
  switch (role) {
    case ERole.ADMIN:
      return ADMIN_USER_LINKS;
    case ERole.STAFF:
      return [];
    case ERole.CUSTODIAN:
      return [];
    case ERole.STUDENT:
      return [];

    default:
      return [];
  }
};
