import { Button, Drawer, Menu, MenuProps } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import React from "react";
import { Link } from "react-router-dom";

export interface ILink {
  icon: any;
  label: string;
  link: string;
}

interface IProps {
  links: ILink[];
  onClose: Function;
  handleLogOut: Function;
  show: boolean;
}

const MobileMenu = ({ links, onClose, show, handleLogOut }: IProps) => {
  return (
    <Drawer
      title={
        <div className="px-6 py-2 bg-slate-900 text-white flex justify-between items-center">
          <Button
            onClick={() => onClose()}
            type="text"
            icon={<CloseOutlined color="#ffffff" size={25} />}
          />
        </div>
      }
      visible={show}
      onClose={() => onClose()}
      closable={false}
      className="mobile-menu"
      placement="left"
    >
      <div className="flex flex-col gap-4 bg-slate-900 text-white p-6">
        {links
          ?.filter((item) => item.label !== "Filler")
          .map((item: any) =>
            item.label !== "Logout" ? (
              <Link to={item.link}>
                <a className="flex gap-2 items-center text-base cursor-pointer text-white active:text-[#109fff] hover:text-[#109fff]">
                  {React.createElement(item.icon)}
                  <span>{item.label}</span>
                </a>
              </Link>
            ) : (
              <div
                className="flex gap-2 items-center text-base cursor-pointer"
                onClick={() => handleLogOut()}
              >
                {React.createElement(item.icon)}
                <span>{item.label}</span>
              </div>
            )
          )}
      </div>
    </Drawer>
  );
};

export default MobileMenu;
