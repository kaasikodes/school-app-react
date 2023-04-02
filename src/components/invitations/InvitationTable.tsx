import { Table } from "antd";
import React from "react";

export const InvitationTable = () => {
  return (
    <div>
      <Table
        columns={[
          { title: "Email" },
          { title: "Invitation Code" },
          { title: "Sent On" },
          { title: "Accepted" },

          { title: "Accepted On" },
        ]}
      />
    </div>
  );
};
