import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";

import { ISchoolCardEntry } from "./SchoolCard";
import ComponentLoader from "../loaders/ComponentLoader";
import { getSchool, saveSchool } from "../../helpers/schools";
import { openNotification } from "../../helpers/notifications";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";

interface IProps {
  id: string;
  closeDrawer: Function;
}

const EditSchoolForm = ({ id, closeDrawer }: IProps) => {
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const signIn = useSignIn();

  const user = authDetails.user;
  const token = authDetails.userToken;
  const [school, setSchool] = useState<ISchoolCardEntry | null>(null);
  const [fetching, setFetching] = useState(false);

  const loadSchool = async () => {
    if (token) {
      try {
        setFetching(true);

        const result = await getSchool({ token, id });
        console.log(result);
        const fetchedSchool: ISchoolCardEntry = {
          item: {
            id: result.data.id,
            name: result.data.name,
            description: result.data.description,
          },
          selected: false,
        };

        setSchool(fetchedSchool);
        setFetching(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    loadSchool();
  }, []);
  const handleFinish = (data: any) => {
    console.log(data, "sasa");
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <LoadingOutlined />,
    });

    saveSchool({
      name: data.name,
      description: data.description,
      token,
      id,
    })
      .then((res: any) => {
        console.log(res);
        //  sign in again with changes reflected
        const schools = authDetails.schools.map((school) =>
          school.id === id
            ? { ...school, name: data.name, description: data.description }
            : school
        );

        const newAuth: IAuthDets = {
          ...authDetails,
          loggedIn: true,

          schools,
        };
        signIn({
          token: authDetails.userToken,
          expiresIn: 120000000000,
          tokenType: "Bearer",
          authState: newAuth,
        });

        openNotification({
          state: "success",
          title: "Success",
          description: `${data.name} school was updated successfully!`,
        });
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
      {fetching ? (
        <ComponentLoader />
      ) : (
        <Form
          requiredMark={false}
          labelCol={{ span: 24 }}
          onFinish={handleFinish}
          initialValues={{
            name: school?.item.name,
            description: school?.item?.description,
          }}
        >
          <Form.Item label={`Name`} name="name">
            <Input placeholder="School name" required />
          </Form.Item>
          <Form.Item label={`Description (optional)`} name="description">
            <Input.TextArea placeholder="Describe the school" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" className="w-full">
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditSchoolForm;
