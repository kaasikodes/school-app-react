import { Button, Drawer } from "antd";
import React, { useState } from "react";
import AddPaymentCategory from "./AddPaymentCategory";
import PaymentCategories from "./PaymentCategories";

const PaymentCategoriesContainer = () => {
  const [showD, setShowD] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-end">
          <Button type="primary" onClick={() => setShowD(true)}>
            Add Payment Category
          </Button>
        </div>
        <PaymentCategories />
      </div>
      <Drawer
        title="Add Payment Category"
        open={showD}
        onClose={() => setShowD(false)}
      >
        <AddPaymentCategory />
      </Drawer>
    </>
  );
};

export default PaymentCategoriesContainer;
