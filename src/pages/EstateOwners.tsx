import { Button, Drawer, Typography } from "antd";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import AddEstateOwner from "../components/estateOwner/AddEstateOwner";
import EstateOwnerTable from "../components/estateOwner/EstateOwnerTable";

const EstateOwners = () => {
  const auth = useAuthUser();
  const user = auth();
  const [showD, setShowD] = useState(false);
  return (
    <div>
      <Drawer visible={showD} onClose={() => setShowD(false)} title="Add Owner">
        <AddEstateOwner />
      </Drawer>
      <Typography.Title level={3}>Estate Owners</Typography.Title>
      {/* content */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex justify-end">
          <Button type="primary" onClick={() => setShowD(true)}>
            Add Owner
          </Button>
        </div>
        <EstateOwnerTable />
      </div>
    </div>
  );
};

export default EstateOwners;
