import React from "react";
import { ApartmentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface IProps {
  alternativeAction: {
    text: string;
    link: string;
    promptText: string;
  };
  children: React.ReactNode;
  heading: string;
}

const AuthLayout = ({ alternativeAction, children, heading }: IProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      {/* image n animation */}
      <div className="bg-white hidden lg:flex shadow-lg">
        asa
        <div className="fixed lg:w-2/4 top-0  bg-cover left-0 z-20 h-screen  bg-gradient-to-tl from-sky-700 to-blue-800 shadow-lg flex flex-col gap-4 items-center pt-12">
          <div className="w-2/4">
            <img
              src="/assets/loginIll.svg"
              alt="result compilation"
              className=" object-contain"
            />
          </div>
          <p className="text-white text-center font-light italic w-4/5">
            Smooth result compilation no matter the amount of students present,
            save time by uploading students in bulk, and have parents monitor
            the academic progress of their students in real time.
          </p>
          <div className=" text-white mt-4">
            <p className="font-bold text-lg text-center mb-0">Inokpa</p>

            <span className="font-light text-xs  text-sky-300 italic">
              School Management Simplified
            </span>
          </div>
        </div>
      </div>
      {/* register school form */}
      <div className="flex flex-col gap-4 items-center pt-8">
        {/* heading */}
        <div className="flex flex-col items-center">
          <ApartmentOutlined size={400} className="text-2xl" />
          <h4 className="text-2xl"> {heading}</h4>
          <p>
            {alternativeAction.promptText}{" "}
            <Link to={alternativeAction.link}>{alternativeAction.text}</Link>
          </p>
        </div>
        {/* form */}
        <div className="w-3/5">{children}</div>

        <div className="h-72" />
      </div>
    </div>
  );
};

export default AuthLayout;
