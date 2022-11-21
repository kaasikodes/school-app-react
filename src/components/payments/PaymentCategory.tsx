import { MoreOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, Menu, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { previewText } from "../../utilities";
import EditPaymentCategory from "./EditPaymentCategory";
import PaymentCategoryDetails from "./PaymentCategoryDetails";

interface IProps {
  name: string;
  id: string;
  description?: string;
}

enum EComp {
  EDIT = "Edit Payment Category",
  SHOW = "Payment Category",
  NO_COMP = "",
}

const PaymentCategory = ({ name, id, description }: IProps) => {
  const [comp, setComp] = useState<EComp>(EComp.NO_COMP);
  const [showD, setShowD] = useState(false);
  const handleAction = (action: EComp) => {
    setShowD(true);
    setComp(action);
  };
  return (
    <>
      {" "}
      <div className="rounded-md flex justify-between shadow-md py-2 px-4">
        <div>
          <Typography.Title level={5}>{name}</Typography.Title>
          <p>
            {description
              ? previewText({ text: description, length: 40 })
              : "No description"}
          </p>
        </div>
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  label: "Edit",
                  key: "edit",
                  onClick: () => handleAction(EComp.EDIT),
                },
                {
                  label: "Details",
                  key: "details",
                  onClick: () => handleAction(EComp.SHOW),
                },
              ]}
            />
          }
        >
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      </div>
      <Drawer title={comp} open={showD} onClose={() => setShowD(false)}>
        {comp === EComp.EDIT && <EditPaymentCategory id={id} />}
        {comp === EComp.SHOW && <PaymentCategoryDetails id={id} />}
      </Drawer>
    </>
  );
};

export default PaymentCategory;
