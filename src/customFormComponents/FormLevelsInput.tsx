import { Select, Spin } from "antd";

import React, { useState } from "react";
import { TLevel } from "../appTypes/levels";
import { generalValidationRules } from "../formValidation";
import { useFetchClasses } from "../helpersAPIHooks/classes";
import useApiAuth from "../hooks/useApiAuth";
import { useDebounce } from "../hooks/useDebounce";

export const FormLevelsInput: React.FC<{
  handleSelect?: (val: number, level?: TLevel) => void;

  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control, handleSelect }) => {
  const { schoolId, token } = useApiAuth();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isSuccess } = useFetchClasses({
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
      name={control?.name ?? "levelId"}
      label={showLabel ? control?.label ?? "Class" : null}
      rules={generalValidationRules}
    >
      <Select
        onSelect={(val: number) => {
          if (handleSelect) {
            const item = data?.data.find((emp) => emp.id === val);
            handleSelect(val, item);
          }
        }}
        placeholder="Select class"
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
