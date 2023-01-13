import {
  Button,
  Dropdown,
  List,
  Menu,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";

import { EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { IAuthDets } from "../../../appTypes/auth";
import { openNotification } from "../../../helpers/notifications";
import { getStaffSessionLevelsAndCourses } from "../../../helpers/staff";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { getStudentCoursesGroupedByLevel } from "../../../helpers/students";
import { useContext, useState } from "react";
import StudentClassResultOverview from "./StudentClassResultOverview";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";

interface IProps {
  studentId: string;
}
interface IReturnProps {
  coursesGroupedByLevel: ICGByLevel[];
  courses: ICourse[];
}

export interface ICGByLevel {
  levelId: number;
  levelName: string;
  levelCoursesTaking: ICourse[];
  levelCoursesTakingCount: number;
}

interface ICourse {
  id: number;
  name: string;
  assessmentCount: number;
  breakdown: string;
  grade: string;
  total: number;
}

const StudentClasses = ({ studentId }: IProps) => {
  const [selectedClass, setSelectedClass] = useState<ICGByLevel | null>(null);
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;
  const { data: levelsAndCourses, isFetching } = useQuery(
    ["getStudentCoursesGroupedByLevel", studentId],
    () => {
      return getStudentCoursesGroupedByLevel({
        token,
        schoolId: schoolId as string,
        studentId,
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

        const coursesGroupedByLevel: ICGByLevel[] =
          result.coursesGroupedByLevel.map(
            (courses: any): ICGByLevel => ({
              levelId: courses[0]?.level?.id,
              levelName: courses[0]?.level?.name,
              levelCoursesTaking: courses?.map(
                (item: any): ICourse => ({
                  id: item?.course?.id,
                  name: item?.course?.name,
                  assessmentCount: 0,
                  breakdown: item?.break_down,
                  grade: item.grade,
                  total: item.total,
                })
              ),
              levelCoursesTakingCount: courses?.length ?? 0,
            })
          );

        const courses: ICourse[] = result.courses.map(
          (item: any): ICourse => ({
            id: item?.level?.id,
            name: item?.level?.name,
            assessmentCount: 0,
            breakdown: item?.break_down,
            grade: item.grade,
            total: item.total,
          })
        );

        const ans: IReturnProps = {
          coursesGroupedByLevel,
          courses,
        };
        console.log("ANS", ans);

        return ans;
      },
    }
  );

  const handleSelectedClass = (ans: ICGByLevel) => {
    setSelectedClass(ans);
  };

  const columns: ColumnsType<ICGByLevel> = [
    {
      title: "Name",
      dataIndex: "levelName",
      key: "levelName",
      render: (_: string, record) => (
        <Button type="link" onClick={() => handleSelectedClass(record)}>
          {record.levelName}
        </Button>
      ),
    },
    {
      title: "Courses Taking",
      dataIndex: "levelCoursesTeachingCount",
      key: "levelCoursesTeachingCount",
      render: (_: string, record) => record.levelCoursesTakingCount,
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
                      Drop participant{" "}
                    </button>
                  ),
                },
                {
                  key: "3",
                  label: (
                    <button className="w-full text-left">
                      View Class Assessment{" "}
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
      {!selectedClass ? (
        <div className="flex flex-col gap-4">
          <Typography.Title level={5}>Classes I'm Taking</Typography.Title>

          <Table
            columns={columns}
            loading={isFetching}
            size="small"
            dataSource={levelsAndCourses?.coursesGroupedByLevel.map((item) => ({
              ...item,
              key: item.levelId,
            }))}
            expandable={{
              expandedRowRender: (record) => (
                <div className="flex gap-4 px-8">
                  {record.levelCoursesTaking.map((item) => (
                    <Link
                      key={item.id}
                      to={`/students/${studentId}/course-participant-record/course/${item.id}/class/${record.levelId}`}
                    >
                      <Tag>{item.name}</Tag>
                    </Link>
                  ))}
                </div>
              ),
              rowExpandable: (record) => record.levelCoursesTakingCount > 0,
            }}
          />
        </div>
      ) : (
        <div>
          <StudentClassResultOverview
            classDetails={selectedClass}
            clearClassDetails={() => setSelectedClass(null)}
            token={token}
          />
        </div>
      )}
    </div>
  );
};

export default StudentClasses;
