import { Pagination, PaginationProps } from "antd";
import { useEffect, useState } from "react";
import SchoolCard, { ISchoolCardEntry } from "./SchoolCard";

interface IProps {
  schools: ISchoolCardEntry[];
  total: number;
  onChange: PaginationProps["onChange"];
  current: number;
  pageSize?: number;
  choosenSchoolId?: string;
}

const SchoolCards = ({
  schools,

  choosenSchoolId,
}: IProps) => {
  const pageSize = 3;
  const total = schools.length;

  const [currentPage, setCurrentPage] = useState(1);
  const [pschools, setPSchools] = useState<ISchoolCardEntry[]>([]);

  useEffect(() => {
    const sortedSchools = schools
      .sort((a, b) => a.item.name.localeCompare(b.item.name))
      .sort((item) => (item.item.id === choosenSchoolId ? -1 : 0));
    const defaultPSchools = sortedSchools.slice(0, pageSize);
    setPSchools(defaultPSchools);
  }, [schools]);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
    const result = schools.slice((page - 1) * pageSize, page * pageSize);
    setPSchools(result);
  };

  return (
    <div className="flex flex-col gap-3">
      {total > 0 ? (
        pschools.map((item) => (
          <SchoolCard
            key={item.item.id}
            item={{ name: item.item.name, id: item.item.id }}
            selected={item.item.id === choosenSchoolId}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-52">
          <p>You currently do not belong to any school!</p>
        </div>
      )}
      <div className="mt-4">
        <Pagination
          current={currentPage}
          onChange={onChange}
          total={total}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default SchoolCards;
