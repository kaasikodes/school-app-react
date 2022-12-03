import { useMutation } from "react-query";
import {
  addSessionCourseParticipant,
  addSessionCourseTeacher,
} from "../helpers/courses";

export const useAddSessionCourseParticipantHook = () => {
  return useMutation(addSessionCourseParticipant);
};
export const useAddSessionCourseTeacher = () => {
  return useMutation(addSessionCourseTeacher);
};
