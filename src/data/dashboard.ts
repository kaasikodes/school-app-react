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
import { routes } from "../routes";

interface IDSMProps {
  role: ERole;
}
export interface ILink {
  icon: IconType;
  label: string;
  link: string;
}
const ADMIN_LINKS: ILink[] = [
  { icon: FaSchool as IconType, label: "Profile", link: routes.index },
  // { icon: TbSchool as IconType, label: "Schools", link: "/schools" },
  {
    icon: ApartmentOutlined as IconType,
    label: "Departments",
    link: routes.departments,
  },
  { icon: AuditOutlined as IconType, label: "Courses", link: routes.courses },
  {
    icon: BsFileEarmarkPostFill as IconType,
    label: "Classes",
    link: routes.classes,
  },
  { icon: ApartmentOutlined as IconType, label: "Staff", link: routes.staff },
  {
    icon: IoIosHammer as IconType,
    label: "Policies & Templates",
    link: routes.policies,
  },

  {
    icon: AuditOutlined as IconType,
    label: "Sessions",
    // link: "/sessions/admin",
    link: routes.sessions,
  },

  //courses belongs to the current session

  {
    icon: BookOutlined as IconType,
    label: "Custodians",
    link: routes.custodians,
  },
  { icon: GiTeacher as IconType, label: "Students", link: routes.students },

  {
    icon: CalculatorOutlined as IconType,
    label: "Reports",
    link: routes.reports,
  },

  {
    icon: NotificationOutlined as IconType,
    label: "Announcements",
    link: routes.announcements,
  },
  {
    icon: NotificationOutlined as IconType,
    label: "My Requisitions",
    link: routes.requisitions,
  },
  {
    icon: NotificationOutlined as IconType,
    label: "Approvals",
    link: routes.approvals,
  },
  {
    icon: NotificationOutlined as IconType,
    label: "Events",
    link: routes.events,
  },

  { icon: AiOutlineSchedule, label: "Payments", link: routes.payments },

  { icon: LogoutOutlined as IconType, label: "Log out", link: "/logout" },
  { icon: UserOutlined as IconType, label: "Filler", link: routes.index },
];

const STAFF_LINKS: ILink[] = [
  { icon: FaSchool as IconType, label: "Profile", link: routes.index },
  // { icon: TbSchool as IconType, label: "Schools", link: "/schools" },

  { icon: AuditOutlined as IconType, label: "Classes", link: routes.classes },
  { icon: AuditOutlined as IconType, label: "Courses", link: routes.courses },

  {
    icon: CheckSquareOutlined as IconType,
    label: "My Requisitions",
    link: routes.requisitions,
  },
  {
    icon: CheckSquareOutlined as IconType,
    label: "Approvals",
    link: routes.approvals,
  },

  { icon: AiOutlineSchedule as IconType, label: "Events", link: routes.events },

  { icon: LogoutOutlined as IconType, label: "Log out", link: "/logout" },
];

const STUDENT_LINKS: ILink[] = [
  { icon: FaSchool as IconType, label: "Profile", link: routes.index },
  // { icon: TbSchool as IconType, label: "Schools", link: "/schools" },

  { icon: AuditOutlined as IconType, label: "Classes", link: routes.classes },
  { icon: AuditOutlined as IconType, label: "Courses", link: routes.courses },
  {
    icon: AuditOutlined as IconType,
    label: "Assessments",
    link: routes.assessments,
  },
  {
    icon: AuditOutlined as IconType,
    label: "Academic Records",
    link: routes.academicRecords,
  },

  {
    icon: CheckSquareOutlined as IconType,
    label: "My Requisitions",
    link: routes.requisitions,
  },

  { icon: AiOutlineSchedule as IconType, label: "Events", link: routes.events },

  { icon: LogoutOutlined as IconType, label: "Log out", link: "/logout" },
];

const CUSTODIAN_LINKS: ILink[] = [
  { icon: FaSchool as IconType, label: "Profile", link: routes.index },
  // { icon: TbSchool as IconType, label: "Schools", link: "/schools" },

  { icon: AuditOutlined as IconType, label: "My Wards", link: routes.students },

  { icon: BookOutlined as IconType, label: "Payments", link: routes.payments },

  {
    icon: AuditOutlined as IconType,
    label: "Academic Records",
    link: routes.academicRecords,
  },

  {
    icon: CheckSquareOutlined as IconType,
    label: "Approvals",
    link: routes.approvals,
  },

  {
    icon: AiOutlineSchedule as IconType,
    label: "Upcoming Events",
    link: routes.events,
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

// TO DO
// Make use of this in profile dropdown [NO NEED]
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
