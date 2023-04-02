import { useMutation } from "react-query";
import { loginUser, registerSchool } from "../helpers/auth";

export const useRegisterSchool = () => {
  return useMutation(registerSchool);
};
export const useRegisterStaff = () => {
  return useMutation(registerSchool);
};
export const useLoginUser = () => {
  return useMutation(loginUser);
};
