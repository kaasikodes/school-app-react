import { Button, Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";

import { ISchoolCardEntry } from "./SchoolCard";
import ComponentLoader from "../loaders/ComponentLoader";
import { getSchool, saveSchool } from "../../helpers/schools";
import { openNotification } from "../../helpers/notifications";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { FileUpload } from "../files/FileUpload";
import { useQueryClient } from "react-query";
import {
  GlobalContext,
  EGlobalOps,
} from "../../contexts/GlobalContextProvider";
import useApiAuth from "../../hooks/useApiAuth";
import { useCurrentFileUploadUrl } from "../../hooks/useCurrentFileUploadUrl";
import { useUpdateSchoolLogo } from "../../helpersAPIHooks/schools/useUpdateSchoolLogo";

interface IProps {
  id: string;
  closeDrawer: Function;
}

const EditSchoolForm = ({ id, closeDrawer }: IProps) => {
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const signIn = useSignIn();

  const token = authDetails.userToken;
  const [school, setSchool] = useState<ISchoolCardEntry | null>(null);
  const [fetching, setFetching] = useState(false);

  const queryClient = useQueryClient();
  const { userId } = useApiAuth();
  const { dispatch } = useContext(GlobalContext);
  const FILE_KEY = "photo";
  const photo = useCurrentFileUploadUrl(FILE_KEY);
  const { mutate } = useUpdateSchoolLogo();
  useEffect(() => {
    if (photo && school) {
      mutate(
        {
          photo,
          schoolId: +school.item.id,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            // const result = res.data.data;
            console.log("BULK", res);

            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });
            // delete the file string from context
            dispatch({
              type: EGlobalOps.setUploadFileString,
              payload: { value: "", key: FILE_KEY },
            });

            queryClient.invalidateQueries({
              queryKey: ["single-school"],
              // exact: true,
            });
          },
        }
      );
    }
  }, [photo, userId, dispatch, queryClient, mutate, school]);

  useEffect(() => {
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
    loadSchool();
  }, [id, token]);
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
        const schools = authDetails.schools.map((item) =>
          item.id === id
            ? { ...item, name: data.name, description: data.description }
            : item
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
          <Form.Item label="Upload School Logo">
            <FileUpload
              allowedFileTypes={["image/jpeg", "image/jpg", "image/png"]}
              fileKey={FILE_KEY}
            />
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
