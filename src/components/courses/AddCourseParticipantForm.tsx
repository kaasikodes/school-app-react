import React, { useContext, useState } from "react";
import { Button, Form, Select, Spin } from "antd";
import { useFetchAllStaff } from "../../helpersAPIHooks/staff";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import ComponentLoader from "../loaders/ComponentLoader";
import ErrorComponent from "../errors/ErrorComponent";
import { generalValidationRules } from "../../formValidation";

interface IProps {
  courseId?: string;
  levelId?: string;
  closeModal: () => void;
}

const AddCourseParticipantForm = ({
  courseId = "",
  levelId = "",
  closeModal,
}: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const [hint, setHint] = useState("");
  const { data: staff, isSuccess } = useFetchAllStaff({
    schoolId,
    token,
    searchParams: {
      name: hint,
    },
  });
  const handleSubmit = (data: any) => {
    closeModal();
  };
  return (
    <div>
      <Form
        labelCol={{ span: 24 }}
        requiredMark={false}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Select a student to add to course."
          name="studentId"
          rules={generalValidationRules}
        >
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
