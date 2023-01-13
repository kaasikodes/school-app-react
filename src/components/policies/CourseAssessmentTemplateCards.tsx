import { Button, Typography } from "antd";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { isError, useQuery } from "react-query";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { openNotification } from "../../helpers/notifications";
import { getCRTemplates } from "../../helpers/schoolCRecordTemplates";
import ErrorComponent from "../errors/ErrorComponent";
import ComponentLoader from "../loaders/ComponentLoader";
import CourseAssessmentTemplateCard, {
  TCourseRecordingTempate,
} from "./CourseAssessmentTemplateCard";

interface IProps {
  assignSessionTemplate: boolean;
}

const CourseAssessmentTemplateCards = ({ assignSessionTemplate }: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
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
  const handleItemClick = (id: string) => {
    setSelectedTemplate(id);
  };
  const handleAssignTemplateToSession = () => {
    console.log(selectedTemplate);
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
