import { Button, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export interface ISettingCardProps {
  title: string;
  actions: {
    name: string;
    link?: string;
    callback?: (e: React.MouseEvent) => void;
  }[];
}

const SettingsCard = ({ actions, title }: ISettingCardProps) => {
  return (
    <Card title={title} bordered={false} className="shadow-sm" hoverable>
      <div className="flex flex-col gap-2">
        {actions.map((item) =>
          item.link ? (
            <Link key={item.name} to={item.link}>
              {item.name}
            </Link>
          ) : (
            <Button type="text" onClick={item.callback}>
              {item.name}
            </Button>
          )
        )}
      </div>
    </Card>
  );
};

export default SettingsCard;
