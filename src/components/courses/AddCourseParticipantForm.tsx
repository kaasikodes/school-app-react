import React, { useContext, useState } from "react";
import { Button, Form, Select, Spin } from "antd";
import { useFetchAllStaff } from "../../helpersAPIHooks/staff";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import ComponentLoader from "../loaders/ComponentLoader";
import ErrorComponent from "../errors/ErrorComponent";

interface IProps {
  courseId?: string;
  levelId?: string;
}

const AddCourseParticipantForm = ({ courseId = "", levelId = "" }: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const [hint, setHint] = useState("");
  const {
    data: staff,
    isSuccess,
    isError,
    isFetching,
  } = useFetchAllStaff({
    schoolId,
    token,
    searchParams: {
      name: hint,
    },
  });

  return (
    <div>
      <Form labelCol={{ span: 24 }} requiredMark={false}>
        <Form.Item label="Select a student to add to course.">
          <Select
            options={staff?.data.map((item) => ({
              label: `${item.name}(${item.staffNo})`,
              value: item.id,
            }))}
            onSearch={(val) => setHint(val)}
            showSearch
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            notFoundContent={null}
          >
            {isSuccess ? (
              staff.data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}{" "}
                </Select.Option>
              ))
            ) : (
              <div className="flex justify-center items-center w-full">
                <Spin size="small" />{" "}
              </div>
            )}
          </Select>
        </Form.Item>
        <Button type="primary">Add Participant</Button>
      </Form>
    </div>
  );
};

export default AddCourseParticipantForm;
