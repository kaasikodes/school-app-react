import { Tabs } from "antd";

import { openNotification } from "../../helpers/notifications";

import { LoadingOutlined } from "@ant-design/icons";
import { addSchoolSession } from "../../helpers/sessions";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import SessionDetailsForm from "./SessionDetailsForm";
import SessionConfigurationForm from "./SessionConfigurationForm";

interface IProps {
  closeDrawer: Function;
  refresh?: Function;
}

const SetUpCurrentSessionForm = ({ closeDrawer, refresh }: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;

  const handleFinish = (data: any) => {
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <LoadingOutlined />,
    });

    addSchoolSession({
      name: data.name,
      description: data.description,
      schoolId: schoolId as string,
      token,
      starts: data.starts.format("YYYY-MM-DD"),
    })
      .then((res: any) => {
        const result = res.data;
        console.log(result, "res");

        openNotification({
          state: "success",
          title: "Success",
          description: `${result.message} `,
        });
        refresh && refresh();

        closeDrawer();
      })
      .catch((err: any) => {
        console.log(err);
        openNotification({
          state: "error",
          title: "Error occures",
          description: `${data.name} school was not created!`,
        });
      });
  };
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Details" key={"single"}>
          <SessionDetailsForm />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Configuration" key={"bulk"}>
          <SessionConfigurationForm />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default SetUpCurrentSessionForm;
