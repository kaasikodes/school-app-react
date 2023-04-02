import React from "react";
import { InvitationTable } from "./InvitationTable";

export const InvitationContainer: React.FC<{
  type: "staff" | "custodian" | "student";
}> = () => {
  // query will be here and depend on typw
  return (
    <div>
      <InvitationTable />
    </div>
  );
};
