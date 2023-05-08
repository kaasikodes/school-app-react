import { useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../appTypes/auth";
import { GlobalContext } from "../contexts/GlobalContextProvider";

const useApiAuth = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const userId = +authDetails.user.id;
  const userEmail = authDetails.user.email;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as unknown as number;
  const currentSchool = globalState?.currentSchool;
  const sessionId = globalState?.currentSchool
    ?.currentSessionId as unknown as number;
  // TO DO: Potential redirect if auth not available
  return {
    token,
    schoolId,
    sessionId,
    userId,
    userEmail,
    currentSchool,
  };
};

export default useApiAuth;
