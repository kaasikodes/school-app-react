import { Button, Drawer, Typography } from "antd";
import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import AddEstate from "../components/estates/AddEstate";
import EstateTable from "../components/estates/EstateTable";

const Estates = () => {
  const [showD, setShowD] = useState(false);
  return (
    <div>
      <Drawer
        visible={showD}
        onClose={() => setShowD(false)}
        title="Add Estate"
      >
        <AddEstate />
      </Drawer>
      <Typography.Title level={3}>Estates</Typography.Title>
      {/* content */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex justify-end">
          <Button type="primary" onClick={() => setShowD(true)}>
            Add Estate
          </Button>
        </div>
        <EstateTable />
      </div>
    </div>
  );
};

export default Estates;
