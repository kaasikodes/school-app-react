import { Button, Typography } from "antd";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { openNotification } from "../../helpers/notifications";
import {
  getCRTemplates,
  setupSchoolSessionCRTemplate,
} from "../../helpers/schoolCRecordTemplates";
import ErrorComponent from "../errors/ErrorComponent";
import ComponentLoader from "../loaders/ComponentLoader";
import CourseAssessmentTemplateCard, {
  TCourseRecordingTempate,
} from "./CourseAssessmentTemplateCard";
import { LoadingOutlined } from "@ant-design/icons";

interface IProps {
  assignSessionTemplate: boolean;
  setAssignSessionTemplate: Function;
}

const CourseAssessmentTemplateCards = ({
  assignSessionTemplate,
  setAssignSessionTemplate,
}: IProps) => {
  const auth = useAuthUser();
  const queryClient = useQueryClient();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;

  const {
    data: templatesData,
    isError,
    isFetching,
    isSuccess,
  } = useQuery(
    ["course-record-templates"],
    () => {
      return getCRTemplates({
        token,
        schoolId,
      });
    },
    {
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error occurs",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },

      select: (res: any) => {
        const result = res.data.data;

        const templates: TCourseRecordingTempate[] = result.map(
          (item: any) => ({
            id: item.id,
            title: item.title,
            sessionsUsedIn: item.sessionsUsedIn?.map((item: any) => ({
              id: item.id,
              name: item.name,
            })),
          })
        );

        return templates;
      },
    }
  );
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const { mutate } = useMutation(
    () =>
      setupSchoolSessionCRTemplate({
        token,
        schoolId: schoolId as unknown as string,
        templateId: selectedTemplate,
        sessionId,
      }),
    {
      onSuccess: (res: any) => {
        const result = res?.data;
        console.log(result, "res");
        // queryClient.invalidateQueries("cr-templates");

        openNotification({
          state: "success",
          title: "Success",
          description: `${
            result.message ?? "Course Record Template was created successfully."
          } `,
        });
        queryClient.invalidateQueries({
          queryKey: ["course-record-templates"],
          // exact: true,
        });
        setSelectedTemplate("");
        setAssignSessionTemplate(false);
      },
      onError: (err: any) => {
        console.log(err);
        openNotification({
          state: "error",
          title: "Error occurs",
          description: `Course Record Template was not created!`,
        });
      },
    }
  );
  const handleItemClick = (id: string) => {
    setSelectedTemplate(id);
  };
  const handleAssignTemplateToSession = () => {
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <LoadingOutlined />,
    });

    mutate();
  };
  return (
    <>
      {isFetching && !isSuccess && !isError && <ComponentLoader />}
      {isError && <ErrorComponent />}
      {isSuccess && (
        <div
          className={`${
            assignSessionTemplate && "shadow-md px-4 py-4 bg-white"
          }`}
        >
          {assignSessionTemplate && (
            <Typography.Title level={5}>
              <span className="mb-6 block text-sky-700 underline">
                Select a Template to Apply to Current Session
              </span>
            </Typography.Title>
          )}
          <div className={`grid md:grid-cols-4 gap-4`}>
            {templatesData.map((item) => (
              <CourseAssessmentTemplateCard
                {...{
                  ...item,
                  assignSessionTemplate,
                  handleClick: handleItemClick,
                  selectedTemplate,
                }}
                key={item.id}
              />
            ))}
          </div>
          {assignSessionTemplate && (
            <div className="flex mt-4 justify-end">
              <Button
                type="primary"
                disabled={!selectedTemplate}
                onClick={() => handleAssignTemplateToSession()}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CourseAssessmentTemplateCards;
