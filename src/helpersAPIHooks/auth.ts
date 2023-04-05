import { useMutation } from "react-query";
import {
  loginUser,
  registerSchool,
  registerUserThroughInvitation,
} from "../helpers/auth";

export const useRegisterSchool = () => {
  return useMutation(registerSchool);
};

export const useRegisterUserThroughInvitation = () => {
  return useMutation(registerUserThroughInvitation);
};
export const useLoginUser = () => {
  return useMutation(loginUser);
};
