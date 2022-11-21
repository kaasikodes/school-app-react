import { Table } from "antd";

const CourseLessonTable = () => {
  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      render: (_: string, rec: any) => (
        <a href={rec.link} rel="download lesson">
          {rec.name}
        </a>
      ),

      // downloadable link
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Created on",
      dataIndex: "createdOn",
      key: "createdOn",
    },
  ];
  return (
    <div>
      <Table columns={columns} />
    </div>
  );
};

export default CourseLessonTable;
