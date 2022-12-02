import { useMutation } from "react-query";
import { addSessionCourseParticipant } from "../helpers/courses";

export const useAddSessionCourseParticipantHook = () => {
  return useMutation(addSessionCourseParticipant);
};
