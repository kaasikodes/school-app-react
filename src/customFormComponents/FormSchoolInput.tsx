import { Select, Spin } from "antd";

import React, { useState } from "react";
import { generalValidationRules } from "../formValidation";
import { useDebounce } from "../hooks/useDebounce";
import { TSchool, useFetchAllSchools } from "../helpersAPIHooks/schools";

export const FormSchoolsInput: React.FC<{
  handleSelect?: (val: number, level?: TSchool) => void;

  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control, handleSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isSuccess } = useFetchAllSchools({
    searchParams: {
      name: debouncedSearchTerm,
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "schoolId"}
      label={showLabel ? control?.label ?? "School" : null}
      rules={generalValidationRules}
    >
      <Select
        onSelect={(val: number) => {
          if (handleSelect) {
            const item = data?.data.find((emp) => emp.id === val);
            handleSelect(val, item);
          }
        }}
        placeholder="Select school"
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
