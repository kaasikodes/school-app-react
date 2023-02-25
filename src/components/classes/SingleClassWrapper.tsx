import { Typography, Breadcrumb, Card, Statistic } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

interface IProps {
  classId?: string;
}

// Not found page to account for classIds not found

const SingleClassWrapper = ({ classId }: IProps) => {
  return (
    <div>
      <div className="flex flex-col justify-between">
        <Typography.Title level={3}>Jss 1a</Typography.Title>

        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/classes">Classes</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Jss 1a</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* <div className=" mt-4 flex justify-end">
        <div className="flex gap-4">
          <Input.Search
            placeholder="Search classes"
            onSearch={(val) => setSearchTerm(val)}
            allowClear
            onChange={(e) => e.target.value === "" && setSearchTerm("")}
          />
          <Button onClick={() => setShowDrawer(true)} type="primary">
            Add Class
          </Button>
        </div>
      </div> */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Card hoverable>
          <div>
            <Statistic
              title={
                <Link to={`/classes/${classId}/courses`}>
                  <Typography.Title level={5}>Courses</Typography.Title>
                </Link>
              }
              value={16}
            />
          </div>
        </Card>
        <Card hoverable>
          <div>
            <Statistic
              title={
                <Link to={`/classes/${classId}/students`}>
                  <Typography.Title level={5}>Students</Typography.Title>
                </Link>
              }
              value={450}
            />
          </div>
        </Card>
        <Card hoverable>
          <div>
            <Statistic
              title={
                <Link to={`/classes/${classId}/submitted-assessments`}>
                  <Typography.Title level={5}>
                    Course Assessment Submissions
                  </Typography.Title>
                </Link>
              }
              value={12}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SingleClassWrapper;
