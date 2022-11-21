import { Button, Drawer } from "antd";
import React, { useState } from "react";
import AddClassFee from "./AddClassFee";
import AddPaymentCategory from "./AddPaymentCategory";
import ClassFeesTable from "./ClassFeesTable";
import PaymentCategories from "./PaymentCategories";

const ClassSchoolFeesContainer = () => {
  const [showD, setShowD] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-end">
          <Button type="primary" onClick={() => setShowD(true)}>
            Add Class Fee
          </Button>
        </div>
        <ClassFeesTable />
      </div>
      <Drawer
        title="Add Class Fee"
        open={showD}
        onClose={() => setShowD(false)}
      >
        <AddClassFee />
      </Drawer>
    </>
  );
};

export default ClassSchoolFeesContainer;
