import { useMutation } from "react-query";
import { saveSchoolCustodian } from "../helpers/custodians";

export const useAddSingleCusodian = () => {
  return useMutation(saveSchoolCustodian);
};
