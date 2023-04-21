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
}

const initState: IGlobalState = {
  currentSchool: null,
  showInitialSetUp: true,
};

interface IGlobalContext {
  state: IGlobalState;
  dispatch: Function;
}

export enum EGlobalOps {
  setCurrentSchool,
  setRoleInCurrentSchool,
  setShowInitialSetup,
}

interface IAction {
  payload?: TCSchool | ERole | boolean;
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

const GlobalReducer = (state: IGlobalState, action: IAction): IGlobalState => {
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
