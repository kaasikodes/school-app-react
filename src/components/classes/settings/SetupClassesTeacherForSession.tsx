import { Form, Button, Typography, Checkbox, Input, Select, Spin } from "antd";
import pagination from "antd/lib/pagination";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../../appTypes/auth";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";
import { useFetchClasses } from "../../../helpersAPIHooks/classes";
import { useFetchAllStaff } from "../../../helpersAPIHooks/staff";
import { IClassEntry } from "../ClassesTable";

const SetupClassesTeacherForSession = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const [staffHint, setStaffHint] = useState<string | undefined>();

  const { data: levelsData } = useFetchClasses({
    schoolId,
    token,
    pagination: {
      limit: 200,

      page: 1,
    },
    // searchParams: {
    //   name: searchTerm,
    // },
  });

  const { data: staffData, isSuccess: isStSucess } = useFetchAllStaff({
    schoolId,
    token,
    pagination: {
      limit: 200,

      page: 1,
    },
    searchParams: {
      name: staffHint,
    },
  });

  const handleSubmit = (data: any) => {
    console.log("ASS STAFF", data);
  };
  return (
    <div>
      {" "}
      <div className="mt-6">
        <Form onFinish={handleSubmit} initialValues={{ Quantum: true }}>
          <div className="flex items-center justify-end">
            <Button type="primary" htmlType="submit">
              Save Class Teachers
            </Button>
          </div>
          <div className="mt-2">
            <Typography.Title level={5}>
              Select the class teacher for each class
            </Typography.Title>

            <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
              {levelsData?.data.map((item: IClassEntry) => (
                <Form.Item
                  name={`${item.id}`}
                  label={item.name}
                  labelCol={{ span: 24 }}
                  // wrapperCol={{ span: 24 }}
                >
                  <Select
                    onSearch={(val) => setStaffHint(val)}
                    showSearch
                    value={staffHint}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    // onChange={handleChange}
                    notFoundContent={null}
                  >
                    {/* TO DO
            Convert all select to api searchable dropdowns */}
                    {isStSucess ? (
                      staffData?.data.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}({item.staffNo})
                        </Select.Option>
                      ))
                    ) : (
                      <div className="flex justify-center items-center w-full">
                        <Spin size="small" />
                      </div>
                    )}
                  </Select>
                </Form.Item>
              ))}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SetupClassesTeacherForSession;
