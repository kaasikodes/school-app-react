import React, { useState } from "react";
import { IAuthDets } from "../../appTypes/auth";
import LoginForm from "./LoginForm";
import RegisterSchoolForm from "./ORegisterSchoolForm";
import SelectSchoolOnLogin from "./SelectSchoolOnLogin";

export enum ELoginStep {
  LOGIN = "Welcome to School App",
  REGISTER_SCHOOL = "Register School", //different flow as per payment later on
  SELECT_EXISTING_SCHOOL = "Select a School",
}

const LoginWrapper = () => {
  const [currentStep, setCurrentStep] = useState<ELoginStep>(ELoginStep.LOGIN);
  const [authDetails, setAuthDetails] = useState<IAuthDets | null>(null);
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-cover bg-slate-700">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md max-w-sm lg:max-w-lg flex flex-col gap-4">
        <div className="flex justify-center">
          <img
            src="https://t4.ftcdn.net/jpg/02/38/94/05/240_F_238940516_0BihE7YocY9vpgClPDDWuuaLneDwxtWn.jpg"
            className="object-contain h-16"
          />
        </div>
        <h1 className="text-xl font-semibold text-center text-slate-500">
          {currentStep}
        </h1>
        {currentStep === ELoginStep.LOGIN && (
          <LoginForm
            handleStep={setCurrentStep}
            authDetails={authDetails as unknown as IAuthDets}
            setAuthDetails={setAuthDetails}
          />
        )}
        {currentStep === ELoginStep.REGISTER_SCHOOL && (
          <RegisterSchoolForm
            handleStep={setCurrentStep}
            authDetails={authDetails as unknown as IAuthDets}
          />
        )}
        {currentStep === ELoginStep.SELECT_EXISTING_SCHOOL && (
          <SelectSchoolOnLogin
            handleStep={setCurrentStep}
            authDetails={authDetails as unknown as IAuthDets}
            setAuthDetails={setAuthDetails}
          />
        )}
        {currentStep === ELoginStep.LOGIN && (
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <a href="#" className="font-medium text-slate-600 hover:underline">
              Sign up
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginWrapper;
