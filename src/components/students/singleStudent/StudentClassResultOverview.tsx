import { PageHeader, Table, Typography } from "antd";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";
import { openNotification } from "../../../helpers/notifications";
import { getCRTemplate } from "../../../helpers/schoolCRecordTemplates";
import { useFetchSchoolSessionSetting } from "../../../helpersAPIHooks/sessions";
import { ICGByLevel } from "./StudentClasses";

interface IProps {
  classDetails: ICGByLevel;
  clearClassDetails: Function;
  token: string;
}

const StudentClassResultOverview = ({
  classDetails,
  clearClassDetails,
  token,
}: IProps) => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;
  const {
    data: schoolSessionSetting,
    isSuccess: isSessSettingSuccess,
    isError: isSessSettingErr,
  } = useFetchSchoolSessionSetting({
    sessionId,
    schoolId,
    token,
  });
  const {
    data: templateData,

    isFetching,
    isSuccess,
  } = useQuery<any, any, any, any>(
    ["course-record-templates", schoolSessionSetting?.courseRecordTemplateId],
    () => {
      return getCRTemplate({
        token,
        id: schoolSessionSetting?.courseRecordTemplateId as string,
      });
    },
    {
      onError: (err) => {
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },

      select: (res: any) => {
        const result = res.data.data;

        console.log("CRT", JSON.parse(result.break_down));
        const columns = JSON.parse(result.break_down);
        const templateColumns = columns;

        const fcolumns = columns.map((item: any) => ({
          title: item.name,
          dataIndex: item.name,
          key: item.name,
          editable: true,
        }));

        const mergedColumns = [
          {
            title: "Course",
            dataIndex: "courseName",
            key: "courseName",
            fixed: "left",
          },
          ...fcolumns,
          {
            title: "Total",
            dataIndex: "total",
            key: "total",
          },
          {
            title: "Grade",
            dataIndex: "grade",
            key: "grade",
          },
        ];

        return { mergedColumns, templateColumns };
      },
    }
  );

  const data: any = classDetails.levelCoursesTaking.map((item) => {
    const record = JSON.parse(item.breakdown);
    return {
      courseName: item.name,
      grade: item.grade,
      total: item.total,
      ...record,
    };
  });
  return (
    <div className="flex flex-col gap-4">
      {/* title */}
      <div>
        <PageHeader
          onBack={() => clearClassDetails()}
          title={classDetails.levelName}
          subTitle="Courses"
        />
      </div>
      {/* content -> table */}
      {isSuccess && (
        <Table
          columns={templateData.mergedColumns}
          loading={isFetching}
          dataSource={data}
        />
      )}
    </div>
  );
};

export default StudentClassResultOverview;
