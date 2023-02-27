import { Button, Dropdown, Menu, Tag, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";

export type TCourseRecordingTempate = {
  id: string;
  title: string;
  sessionsUsedIn?: [{ id: string; name: string }];
};
interface IProps extends TCourseRecordingTempate {
  assignSessionTemplate: boolean;
  handleClick: (id: string) => void;
  selectedTemplate: string;
}
const CourseAssessmentTemplateCard = ({
  id,
  title,
  sessionsUsedIn,
  assignSessionTemplate,
  selectedTemplate,
  handleClick,
}: IProps) => {
  const menu = (
    <Menu>
      <Menu.Item>Edit</Menu.Item>
      <Menu.Item>Assign template to session</Menu.Item>
    </Menu>
  );
  if (assignSessionTemplate) {
    return (
      <div
        className={`${
          selectedTemplate === id
            ? "shadow-lg border border-sky-600"
            : "shadow-md"
        }  hover:shadow-lg cursor-pointer flex flex-col gap-4 py-4 px-2 bg-white rounded-sm`}
        onClick={() => handleClick(id)}
      >
        <div className="flex justify-between">
          <Typography.Title level={5}>{title}</Typography.Title>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-semibold text-sky-700">Sessions used in:</span>
          <div className="flex gap-2">
            {sessionsUsedIn?.map((item) => (
              <Tag key={item.id}>{item.name}</Tag>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`${
        selectedTemplate === id
          ? "shadow-lg border border-green-600"
          : "shadow-md"
      }  flex flex-col gap-4 py-4 px-2 bg-white rounded-sm`}
    >
      <div className="flex justify-between">
        <Typography.Title level={5}>{title}</Typography.Title>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button icon={<MoreOutlined />} size="small" type="text" />
        </Dropdown>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-semibold text-sky-700">Sessions used in:</span>
        <div className="flex gap-2">
          {sessionsUsedIn?.map((item) => (
            <Tag key={item.id}>{item.name}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseAssessmentTemplateCard;
