import { Typography, Collapse, Tag } from "antd";
import React from "react";
import { useFetchSingleClass } from "../../../helpersAPIHooks/classes";
import useApiAuth from "../../../hooks/useApiAuth";

const { Panel } = Collapse;

export const AssignStaffToCourseResult: React.FC<{ classId: number }> = ({
  classId,
}) => {
  const { schoolId, token, sessionId } = useApiAuth();
  const { data } = useFetchSingleClass({
    id: `${classId}`,
    schoolId: `${schoolId}`,
    token,
    sessionId,
  });
  return (
    <div>
      <Typography.Title level={5}>{data?.name} Courses</Typography.Title>
      <div className="flex flex-col gap-4">
        <Collapse accordion>
          {data?.courses?.map((course) => (
            <Panel header={course.name} key={course.id}>
              <div className="flex flex-col gap-4">
                {/* <div className="flex gap-3">
                  <Typography.Text className="font-semibold">
                    Teachers:
                  </Typography.Text>
                  <div>
                    {["Matt Walsh", "Peter Simon"].map((item) => (
                      <Tag key={item} color="#2db7f5">
                        {item}
                      </Tag>
                    ))}
                  </div>
                </div> */}
                <div className="flex gap-3">
                  <Typography.Text className="font-semibold">
                    Main Teacher:
                  </Typography.Text>
                  <div>
                    <Tag
                      key={course.courseSessionTeacherStaffUser?.staffNo}
                      color="#87d068"
                    >
                      {course.courseSessionTeacherStaffUser?.name}
                    </Tag>
                  </div>
                </div>
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};
