import { Breadcrumb, Tabs, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ClassSchoolFeesContainer from "../components/payments/ClassSchoolFeesContainer";
import PaymentCategoriesContainer from "../components/payments/PaymentCategoriesContainer";

const Payments = () => {
  return (
    <div>
      <div className="flex flex-col justify-between">
        <Typography.Title level={3}>Payments</Typography.Title>

        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={`/classes/`}>
              <a>dumm</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/classes/courses`}>
              <a>Courses</a>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Tabs>
        <Tabs.TabPane tab="Payment Categories" key="item-1">
          <PaymentCategoriesContainer />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Class Fees" key="item-2">
          <ClassSchoolFeesContainer />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Records" key="item-3">
          Payments made{" "}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Payments;
