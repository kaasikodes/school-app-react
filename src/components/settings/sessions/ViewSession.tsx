import { Form, Input, DatePicker } from "antd";
import { useEffect, useState } from "react";

import moment from "moment";
import { getSession } from "../../../helpers/sessions";
import { ISessionEntry } from "./SessionsTable";
import ComponentLoader from "../../loaders/ComponentLoader";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../../appTypes/auth";

interface IProps {
  id: string;
}

const EditSessionForm = ({ id }: IProps) => {
  const [session, setSession] = useState<ISessionEntry | null>(null);
  const [fetching, setFetching] = useState(false);

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;

  // pheripherals
  useEffect(() => {
    // const token = localStorage.getItem(LOCAL_USER_TOKEN_KEY);
    console.log(token);
    setFetching(true);
    if (schoolId)
      getSession({ token, sessionId: id })
        .then((res: any) => {
          const result = res.data.data;
          console.log(result, "sess");
          const fSession: ISessionEntry = {
            id: result.id,
            name: result.name,
            starts: result.starts,
            ends: result.ends,
            description: result.description,
            duration: `${result.starts} - ${result.ends ? result.ends : ""}`,
            levelCount: 0,
            courseCount: 0,
            parentCount: 0,
            studentCount: 0,
            staffCount: 0,
          };

          setSession(fSession);
          setFetching(false);
        })
        .catch((err: any) => {
          console.log(err);
        });
  }, [token, id]);
  return (
    <div>
      {fetching ? (
        <ComponentLoader />
      ) : (
        <Form
          requiredMark={false}
          labelCol={{ span: 24 }}
          initialValues={{
            name: session?.name,
            description: session?.description,
            starts: moment(session?.starts, "YYYY-MM-DD"),
            ends: session?.ends ? moment(session?.ends, "YYYY-MM-DD") : "",
          }}
        >
          <Form.Item label={`Session name`} name="name">
            <Input placeholder="Session name" disabled />
          </Form.Item>
          <Form.Item label={`Description (optional)`} name="description">
            <Input.TextArea
              placeholder="Describe the school"
              rows={4}
              disabled
            />
          </Form.Item>
          <Form.Item label={`Starts`} name="starts">
            <DatePicker
              className="w-full"
              disabledDate={(d) =>
                !d ||
                d.isAfter("2042-12-31") ||
                d.isSameOrBefore(
                  moment(new Date().toLocaleDateString()).format("YYYY-MM-DD")
                )
              }
              disabled
            />
          </Form.Item>
          <Form.Item label={`Ends`} name="ends">
            <DatePicker
              className="w-full"
              disabledDate={(d) =>
                !d ||
                d.isAfter("2042-12-31") ||
                d.isSameOrBefore(
                  moment(new Date().toLocaleDateString()).format("YYYY-MM-DD")
                )
              }
              disabled
            />
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditSessionForm;
