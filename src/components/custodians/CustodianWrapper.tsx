import { Button, Drawer, Tabs, Typography } from "antd";
import { useState } from "react";
import AddCustodianForm from "./AddCustodianForm";
import CustodiansViewContainer from "./CustodiansViewContainer";

const CustodianWrapper = () => {
  const [showD, setShowD] = useState(false);
  return (
    <>
      <Drawer
        open={showD}
        title={`Add Custodian`}
        onClose={() => setShowD(false)}
      >
        <Tabs>
          <Tabs.TabPane tab="Single Custodian" key="item-1">
            <AddCustodianForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Bulk Upload" key="item-2">
            Bulk Upload of custodians
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
      <div className="flex flex-col gap-4">
        <Typography.Title level={3}>Custodians</Typography.Title>

        <div className="flex justify-end ">
          <Button type="primary" onClick={() => setShowD(true)}>
            Add Custodian
          </Button>
        </div>
        <CustodiansViewContainer />
      </div>
    </>
  );
};
export default CustodianWrapper;
