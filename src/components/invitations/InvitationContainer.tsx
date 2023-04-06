import React, { useState } from "react";
import { InvitationTable } from "./InvitationTable";
import useFetchInvitations from "../../helpersAPIHooks/invites/useFetchInvitations";
import { TablePaginationConfig } from "antd";
import { TUserType } from "../../helpersAPIHooks/invites/useCreateSingleInvitation";

export const InvitationContainer: React.FC<{
  type: TUserType;
}> = ({ type }) => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 4,
    total: 0,
    showSizeChanger: false,
  });

  const onChange = (newPagination: TablePaginationConfig | number) => {
    if (typeof newPagination === "number") {
      setPagination((val) => ({
        ...val,
        current: newPagination,
      }));
    } else {
      setPagination((val) => ({
        ...val,
        current: newPagination.current,
      }));
    }
  };
  // query will be here and depend on type
  const { data, isLoading } = useFetchInvitations({
    pagination: { page: pagination.current, limit: pagination.pageSize },
    userType: type,
  });
  return (
    <div>
      <InvitationTable
        onChange={onChange}
        data={data?.data}
        loading={isLoading}
        pagination={{ ...pagination, total: data?.total }}
      />
    </div>
  );
};
