import { Button, Dropdown, List, Menu, Space, Table, Typography } from "antd";

import React, { useContext } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { IAuthDets } from "../../../appTypes/auth";
import { openNotification } from "../../../helpers/notifications";
import { getStaffSessionLevelsAndCourses } from "../../../helpers/staff";
import { ColumnsType } from "antd/lib/table";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";

interface IProps {
  staffId: string;
  show?: "coursesGroupedByLevel" | "both" | "classesTeacherIsManaging";
}
interface IReturnProps {
  coursesGroupedByLevel: ICGByLevels[];
  classesGroupedBySession: ICGBySess[];
}

interface ICGByLevels {
  levelId: number;
  levelName: string;
  levelCoursesTeaching: {
    id: number;
    name: string;
    canRecordAssessment: boolean;
  }[];
  levelCoursesTeachingCount: number;
}

interface ICGBySess {
  id: number;
  name: string;
  canCompileAssessment: boolean;
}

const StaffClassesAndCourses = ({ staffId, show = "both" }: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;
  const { data: levelsAndCourses, isFetching } = useQuery(
    ["getStaffSessionLevelsAndCourses", staffId],
    () => {
      return getStaffSessionLevelsAndCourses({
        token,
        schoolId: schoolId as string,
        staffId,
        sessionId,
      });
    },
    {
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },
      onSuccess: (res: any) => {
        // const result = res.data.data;

        console.log("staff concern", res);
      },
      select: (res: any) => {
        const result = res.data.data;

        const coursesGroupedByLevel: ICGByLevels[] =
          result.coursesGroupedByLevel.map(
            (courses: any): ICGByLevels => ({
              levelId: courses[0]?.level?.id,
              levelName: courses[0]?.level?.name,
              levelCoursesTeaching: courses?.map((item: any) => ({
                id: item?.course?.id,
                name: item?.course?.name,
                canRecordAssessment: item?.can_record === 1 ? true : false,
              })),
              levelCoursesTeachingCount: courses?.length ?? 0,
            })
          );

        const classesGroupedBySession: ICGBySess[] =
          result.classesGroupedBySession.map(
            (item: any): ICGBySess => ({
              id: item?.level?.id,
              name: item?.level?.name,
              canCompileAssessment:
                item?.can_compile_assessment === 1 ? true : false,
            })
          );

        const ans: IReturnProps = {
          coursesGroupedByLevel,
          classesGroupedBySession,
        };
        return ans;
      },
    }
  );

  const columns: ColumnsType<ICGByLevels> = [
    {
      title: "Name",
      dataIndex: "levelName",
      key: "levelName",
      render: (_: string, record: any) => (
        <Link to={`/classes/${record.levelId}/staff/${staffId}`}>
          {record.levelName}
        </Link>
      ),
    },
    {
      title: "Courses teaching",
      dataIndex: "levelCoursesTeachingCount",
      key: "levelCoursesTeachingCount",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  key: "1",
                  label: (
                    <button className="w-full text-left">
                      {/* the courses he/she is teaching */}
                      View Details
                    </button>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <button className="w-full text-left">
                      Drop as class teacher{" "}
                    </button>
                  ),
                },
              ]}
            />
          }
          trigger={["click"]}
        >
          <Space>
            <Button icon={<EllipsisOutlined />} type="text" />
          </Space>
        </Dropdown>
      ),
    },
  ];
  return (
    <div className="mt-4 flex flex-col gap-4">
      {(show === "both" || show === "coursesGroupedByLevel") && (
        <div className="flex flex-col gap-4">
          <Typography.Title level={5}>
            Courses your teaching grouped by class
          </Typography.Title>

          <Table
            columns={columns}
            loading={isFetching}
            size="small"
            dataSource={levelsAndCourses?.coursesGroupedByLevel}
          />
        </div>
      )}
      {(show === "both" || show === "classesTeacherIsManaging") && (
        <div>
          <List
            size="small"
            split
            header={
              <Typography.Title level={5}>
                Classes your managing as a class teacher
              </Typography.Title>
            }
            loading={isFetching}
            bordered
            dataSource={levelsAndCourses?.classesGroupedBySession}
            renderItem={(item) => <List.Item>{item.name}</List.Item>}
          />
        </div>
      )}
    </div>
  );
};

export default StaffClassesAndCourses;
