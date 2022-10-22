import { Drawer, Typography, Button, Select } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import AddStaff from "../components/staff/AddStaff";
import StaffTable from "../components/staff/StaffTable";
import { openNotification } from "../components/utils/notifcations";
import { getEstates } from "../helpers/estate";

const Staff = () => {
  const [showD, setShowD] = useState(false);
  const [estateId, setEstateId] = useState<string | null>(null);
  const handleSelect = (val: string) => {
    setEstateId(val);
  };
  const {
    data: estates,
    isError,
    isFetching,
    isSuccess,
  } = useQuery("estates", () => getEstates({ limit: "10", offset: "0" }), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    onError: (err: any) => {
      // show notification
      openNotification({
        state: "error",
        title: "Error Occured",
        description:
          err?.response.data.message ?? err?.response.data.error.message,
      });
    },
    onSuccess: (data: any) => {
      if (data[0]) setEstateId(data[0].key);
    },
    select: (res) => {
      const result = res.data.data;

      const ans = result.result.map((item: any) => ({
        ownerId: item.estateOwnerId["_id"],
        key: item["_id"],
        location: item.location,

        address: item.address,
        ownerPhone: "rere",
        nextRenewalDate: item.nextRenewalDate,
        ...item,
      }));
      console.log(ans, "ytt");
      return ans;
    },
  });
  return (
    <div>
      <Drawer
        visible={showD}
        onClose={() => setShowD(false)}
        title="Add Estate"
      >
        <AddStaff />
      </Drawer>
      <Typography.Title level={3}>Staff</Typography.Title>
      {/* content */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex justify-between">
          <Select
            className="w-1/5"
            placeholder="Select estate"
            onSelect={handleSelect}
            value={estateId}
          >
            {isSuccess &&
              estates.map((item: any) => (
                <Select.Option value={item["_id"]}>{item.name}</Select.Option>
              ))}
          </Select>
          <Button type="primary" onClick={() => setShowD(true)}>
            Add Staff
          </Button>
        </div>
        {estateId ? (
          <StaffTable estateId={estateId} />
        ) : (
          <div>No estates yet</div>
        )}
      </div>
    </div>
  );
};

export default Staff;
