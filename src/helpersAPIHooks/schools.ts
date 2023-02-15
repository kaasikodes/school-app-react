import { useMutation } from "react-query";
import { saveSchoolSessionSetting } from "../helpers/schools";

export const useSaveSchoolSessSettings = () =>
  useMutation(saveSchoolSessionSetting);
