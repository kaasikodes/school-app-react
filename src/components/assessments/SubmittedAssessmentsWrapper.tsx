import { Typography, Breadcrumb, Input, Button } from "antd";

import React from "react";
import { Link } from "react-router-dom";
import CourseAssessmentsSubmissionsTable from "./CourseAssessmentsSubmissionsTable";

interface IProps {
  classId: string;
}

const SubmittedAssessmentsWrapper = ({ classId }: IProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between">
        <Typography.Title level={3}>
          Course Assessment Submissions
        </Typography.Title>

        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={`/classes/${classId}`}>Jss1 a</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <span>Course Assessment Submissions</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className=" mt-4 flex md:justify-end">
        <div className="flex gap-4">
          <Input.Search placeholder="Search submissions" allowClear />
          {false ? (
            <Button type="primary">Compile Class Assessment</Button>
          ) : (
            <>
              <Button type="ghost">Rollback Class Assessment</Button>
              <Button type="dashed">Download Class Assessment</Button>
              <Button type="dashed">Submit Class Assessment</Button>

              {/* compilation should consider student combination first then generate class stats and positions */}
              {/* ADMIN compiles session assessment and then disperses to those concerned */}
              {/* track every action */}
            </>
          )}
        </div>
      </div>
      <div>
        <CourseAssessmentsSubmissionsTable />
      </div>
    </div>
  );
};

export default SubmittedAssessmentsWrapper;
