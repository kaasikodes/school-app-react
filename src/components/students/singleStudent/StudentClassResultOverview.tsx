import { Button, PageHeader, Table } from "antd";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";
import { openNotification } from "../../../helpers/notifications";
import { getCRTemplate } from "../../../helpers/schoolCRecordTemplates";
import { useFetchSchoolSessionSetting } from "../../../helpersAPIHooks/sessions";
import { ICGByLevel } from "./StudentClasses";
import { downloadStudentAcademicResult } from "../../../helpers/students";

interface IProps {
  classDetails: ICGByLevel;
  clearClassDetails: Function;
  token: string;
  studentId: string;
}

const StudentClassResultOverview = ({
  classDetails,
  clearClassDetails,
  token,
  studentId,
}: IProps) => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;
  const { data: schoolSessionSetting } = useFetchSchoolSessionSetting({
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
            render: (val: any, data: any) => (
              <Link
                to={`/students/${studentId}/course-participant-record/course/${data.courseId}/class/${classDetails.levelId}`}
              >
                {val}
              </Link>
            ),
          },
          ...fcolumns,
          {
            title: "Total",
            dataIndex: "total",
            key: "total",
          },
          {
            title: "Highest in Class",
            dataIndex: "highestScore",
            key: "highestScore",
            width: 50,
          },
          {
            title: "Lowest in Class",
            dataIndex: "lowestScore",
            key: "lowestScore",
            width: 50,
          },
          {
            title: "Class Average",
            dataIndex: "classAverage",
            key: "classAverage",
            width: 50,
          },
          {
            title: "Position",
            dataIndex: "position",
            key: "position",
            width: 50,
          },
          {
            title: "Out of",
            dataIndex: "totalStudents",
            key: "totalStudents",
            width: 50,
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
      courseId: item.id,
      grade: item.grade,
      total: item.total,
      classAverage: item.sessionLevelCourseStats?.classAverage,
      highestScore: item.sessionLevelCourseStats?.highestScore,
      lowestScore: item.sessionLevelCourseStats?.lowestScore,
      position: item.sessionLevelCourseStats?.position,
      totalStudents: item.sessionLevelCourseStats?.totalStudents,
      ...record,
    };
  });
  return (
    <div className="flex flex-col gap-4">
      {/* title */}
      <div className="flex justify-between">
        <PageHeader
          onBack={() => clearClassDetails()}
          title={classDetails.levelName}
          subTitle="Courses"
        />
        <Button
          type="primary"
          href={downloadStudentAcademicResult({
            studentId: +studentId,
            sessionId: +sessionId,
            levelId: +classDetails.levelId,
            schoolId: +schoolId,
          })}
          target="_blank"
        >
          Download Result
        </Button>
      </div>
      {/* content -> table */}
      {isSuccess && (
        <Table
          columns={templateData.mergedColumns}
          loading={isFetching}
          dataSource={data}
          scroll={{ x: "max-content" }}
        />
      )}
    </div>
  );
};

export default StudentClassResultOverview;
