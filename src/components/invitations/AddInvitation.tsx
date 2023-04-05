import { Tabs } from "antd";
import { AddSingleInvitationForm } from "./AddSingleInvitationForm";
import { AddBulkInvitationsForm } from "./AddBulkInvitationsForm";

interface IProps {
  closeDrawer: Function;
}

const AddInvitation = ({ closeDrawer }: IProps) => {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Single" key={"single"}>
          <AddSingleInvitationForm closeDrawer={closeDrawer} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bulk" key={"bulk"}>
          <AddBulkInvitationsForm closeDrawer={closeDrawer} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AddInvitation;
