import React, { useReducer, createContext } from "react";
import { ERole } from "../appTypes/roles";

export type TCSchool = {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  adminId?: string;
  staffId?: string;
  custodianId?: string;
  studentId?: string;
  currentRole: ERole;
  currentSessionId: string;
  roles: ERole[];
};

export interface IGlobalState {
  currentSchool: TCSchool | null;
  showInitialSetUp: boolean;
  upLoadFileString: { key: string; value: string }[];
}

const initState: IGlobalState = {
  currentSchool: null,
  showInitialSetUp: true,
  upLoadFileString: [],
};

interface IGlobalContext {
  state: IGlobalState;
  dispatch: Function;
}

export enum EGlobalOps {
  setCurrentSchool,
  setRoleInCurrentSchool,
  setShowInitialSetup,
  setUploadFileString,
  clearUploadFileString,
}
type TUploadFile = { key: string; value: string };
interface IAction {
  payload?: TCSchool | ERole | boolean | TUploadFile;
  type: EGlobalOps;
}
const updateLocalStorage = ({
  key,
  val,
}: {
  key: string;
  val: string | TCSchool;
}) => {
  localStorage.setItem(key, JSON.stringify(val));
};
const removeAuthLocalStorage = ({ key }: { key: string }) => {
  localStorage.removeItem("currentSchool");
};

console.log(removeAuthLocalStorage);

const GlobalReducer = (
  state: IGlobalState = initState,
  action: IAction
): IGlobalState => {
  let newState: IGlobalState = state;
  switch (action.type) {
    case EGlobalOps.setCurrentSchool:
      newState = {
        ...state,
        currentSchool: action.payload as unknown as TCSchool,
      };
      updateLocalStorage({
        key: "currentSchool",
        val: action.payload as unknown as TCSchool,
      });

      return newState;
    case EGlobalOps.setRoleInCurrentSchool:
      newState = {
        ...state,
        currentSchool: {
          ...(state.currentSchool as TCSchool),
          currentRole: action.payload as unknown as ERole,
        },
      };
      updateLocalStorage({
        key: "currentSchool",
        val: newState.currentSchool as TCSchool,
      });

      return newState;
    case EGlobalOps.setShowInitialSetup:
      return {
        ...state,
        showInitialSetUp: action.payload as boolean,
      };
    case EGlobalOps.setUploadFileString:
      // delete the key if it exists
      const updatedFileString = state.upLoadFileString.filter(
        (item) => item.key !== (action.payload as TUploadFile).key
      );
      return {
        ...state,
        upLoadFileString: [
          ...updatedFileString,
          {
            key: (action.payload as TUploadFile).key,
            value: (action.payload as TUploadFile).value,
          },
        ],
      };
    case EGlobalOps.clearUploadFileString:
      // delete the key if it exists
      const clearedFileString = state.upLoadFileString.filter(
        (item) => item.key !== (action.payload as TUploadFile).key
      );
      return {
        ...state,
        upLoadFileString: [...clearedFileString],
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext<IGlobalContext>({
  state: initState,
  dispatch: Function,
});

interface IProps {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    GlobalReducer,
    initState,
    (): IGlobalState => {
      const localCS = localStorage.getItem("currentSchool");
      const currentSchool =
        typeof localCS === "string"
          ? (JSON.parse(localCS) as unknown as TCSchool)
          : null;
      return {
        currentSchool,
        showInitialSetUp: true,
        upLoadFileString: [],
      };
    }
  );

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
