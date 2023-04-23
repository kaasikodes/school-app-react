import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContextProvider";

export const useCurrentFileUploadUrl = (key: string) => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const url = globalState.upLoadFileString.find((item) => item.key === key);
  return url?.value;
};
