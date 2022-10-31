import { Avatar, Button, Input, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";
import { loginUser } from "../../helpers/auth";
import { openNotification } from "../../helpers/notifications";
import { updateChoosenSchool } from "../../helpers/users";

const aschools = Array(6).fill(0);

interface IProps {
  handleStep: Function;
  authDetails: IAuthDets;
  setAuthDetails: Function;
}

const SelectSchoolOnLogin = ({
  handleStep,
  authDetails,
  setAuthDetails,
}: IProps) => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const choosenSchoolId = authDetails.choosenSchoolId;

  const [schoolId, setSchoolId] = useState("");
  useEffect(() => {
    if (choosenSchoolId) {
      setSchoolId(choosenSchoolId);
    }
  }, [choosenSchoolId]);
  const handleSelect = (id: string) => {
    setSchoolId(id);
  };
  const handleProceed = async () => {
    // need to first update in db the choosenSchoolId
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <Spin />,
    });
    try {
      // update the choosen school in db
      const res = await updateChoosenSchool({
        token: authDetails.userToken,
        schoolId: schoolId,
        userId: authDetails.user.id,
      });

      console.log("response =>", res);
      if (res.status === 200) {
        const result = res.data.data;
        const choosenSchoolId = result.choosen_school_id;
        const possUserRolesInChoosenSchool = JSON.parse(
          result.schools.find((school: any) => school.id === choosenSchoolId)
            ?.pivot.school_user_roles ?? null
        );
        const currentUserRoleInChoosenSchool = result.schools.find(
          (school: any) => school.id === choosenSchoolId
        )?.pivot.choosen_role;
        const schools = result.schools.map((school: any) => {
          return {
            name: school.name,
            id: school.id,
            description: school.description,
          };
        });
        const newAuth: IAuthDets = {
          ...authDetails,
          loggedIn: true,
          choosenSchoolId,
          currentUserRoleInChoosenSchool: currentUserRoleInChoosenSchool,
          possibleUserRolesInChoosenSchool: possUserRolesInChoosenSchool,
          schools,
        };
        setAuthDetails(() => newAuth);
        console.log("auth", authDetails);

        openNotification({
          state: "success",
          title: "Success",
          description: `Switching School successful!`,
        });
        if (
          signIn({
            token: authDetails.userToken,
            expiresIn: 120000000000,
            tokenType: "Bearer",
            authState: newAuth,
          })
        ) {
          openNotification({
            state: "success",

            title: "Login Successfull!",
            description: `Welcome to ${process.env.REACT_APP_APP_NAME}, ${authDetails.user.name}`,
            // duration: 0.4,
          });
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
      openNotification({
        state: "error",
        title: "Problem Switching School",
        description: "Please try again",
      });
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="md:w-2/4 w-3/4 self-center">
        <Input.Search placeholder="Search for school" size="small" />
      </div>{" "}
      <div className="grid md:grid-cols-3 gap-x-4 gap-y-4 md:gap-y-0 h-44 overflow-auto custom-sidebar px-2 items-start">
        {authDetails.schools.map((item, i) => (
          <div
            key={item.id}
            className={`${
              item.id === schoolId
                ? "bg-white border-blue-400 border shadow-md "
                : "bg-slate-200 shadow-sm hover:shadow-md"
            } p-2 cursor-pointer  rounded-md flex flex-col gap-2 items-center`}
            onClick={() => handleSelect(item.id)}
          >
            {/* logo */}
            <Avatar src="" size={"small"} />
            {/* school name */}
            <span className="text-xs font-semibold text-center ">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <Pagination size="small" pageSize={6} />
        <Button size="small" type="primary" onClick={() => handleProceed()}>
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default SelectSchoolOnLogin;
