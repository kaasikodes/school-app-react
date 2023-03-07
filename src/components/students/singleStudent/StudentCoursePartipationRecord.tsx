import { Table } from "antd";
import React, { useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { IAuthDets } from "../../../appTypes/auth";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";
import { getSessionCourseSingleParticipant } from "../../../helpers/courses";
import { openNotification } from "../../../helpers/notifications";
import { getCRTemplate } from "../../../helpers/schoolCRecordTemplates";
import { useFetchSchoolSessionSetting } from "../../../helpersAPIHooks/sessions";
import { IParticipantEntry } from "../../courses/CourseParticipantTable";

interface IProps {
  courseId: string;
  levelId: string;
  studentId: string;
}

const StudentCoursePartipationRecord = ({
  courseId,
  levelId,
  studentId,
}: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

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
      enabled: !!schoolSessionSetting?.courseRecordTemplateId,
      onError: (err) => {
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },
      onSuccess: (columns) => {
        const brkKeys: string[] = [];
        columns.forEach(
          (item: any) => item.editable && brkKeys.push(item.dataIndex)
        );
      },
      select: (res: any) => {
        const result = res.data.data;

        console.log("CRT", JSON.parse(result.break_down));
        const columns = JSON.parse(result.break_down);
        const templateColumns = columns;

        const fcolumns = columns
          .map((item: any) => ({
            title: item.name,
            dataIndex: item.name,
            key: item.name,
            editable: true,
          }))
          .map((col: any) => {
            if (!col.editable) {
              return col;
            }
            return {
              ...col,
              onCell: (record: IParticipantEntry) => ({
                record,
                inputType: col.dataIndex === "remark" ? "text" : "number",
                dataIndex: col.dataIndex,
                title: col.title,
              }),
            };
          });
        const mergedColumns = [
          {
            title: "Name",
            dataIndex: "studentName",
            key: "studentName",
            editable: false,
            fixed: "left",
          },
          ...fcolumns,
          {
            title: "Total",
            dataIndex: "total",
            key: "total",
            editable: false,
          },
          {
            title: "Grade",
            dataIndex: "grade",
            key: "grade",
            editable: false,
          },
        ];

        return { mergedColumns, templateColumns };
      },
    }
  );

  const {
    data: participant,
    isFetching: isPLoading,
    isSuccess: isPSuccess,
  } = useQuery<any, any, any, any>(
    ["course-participant", studentId],
    () => {
      return getSessionCourseSingleParticipant({
        token,
        schoolId: schoolId as string,

        courseId: courseId,
        studentId: studentId,
        levelId: levelId,
        sessionId: sessionId,
      });
    },
    {
      onError: (err) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      select: (res: any) => {
        const item = res.data;
        console.log("NERE", item, res);

        const ans = {
          key: item.data.id,
          id: item.data.id,
          studentName: item.user?.name,
          ...JSON.parse(item.data.break_down),

          grade: item.data.grade,
          total: item.data.total,
        };

        return [ans];
      },
    }
  );

  return (
    <div>
      {isSuccess && isPSuccess && (
        <Table
          bordered
          columns={templateData.mergedColumns}
          loading={isPLoading}
          dataSource={participant}
          scroll={{ x: "max-content" }}
          size="small"
        />
      )}
    </div>
  );
};

export default StudentCoursePartipationRecord;
