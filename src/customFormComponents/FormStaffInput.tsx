import { Select, Spin } from "antd";

import React, { useState } from "react";
import { TStaff } from "../appTypes/staff";
import { generalValidationRules } from "../formValidation";
import { useFetchAllStaff } from "../helpersAPIHooks/staff";
import useApiAuth from "../hooks/useApiAuth";
import { useDebounce } from "../hooks/useDebounce";

export const FormStaffInput: React.FC<{
  handleSelect?: (
    val: number,
    staff?: Pick<TStaff, "id" | "email" | "name" | "staffNo">
  ) => void;

  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control, handleSelect }) => {
  const { schoolId, token } = useApiAuth();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isSuccess } = useFetchAllStaff({
    schoolId: `${schoolId}`,
    token,

    searchParams: {
      name: debouncedSearchTerm,
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "staffId"}
      label={showLabel ? control?.label ?? "staff" : null}
      rules={generalValidationRules}
    >
      <Select
        onSelect={(val: number) => {
          if (handleSelect) {
            const item = data?.data.find((emp) => emp.id === val);
            handleSelect(val, item);
          }
        }}
        placeholder="Select staff"
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full "
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
      >
        {isSuccess ? (
          data.data.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <Spin size="small" />
          </div>
        )}
      </Select>
    </Form.Item>
  );
};
