import { Drawer } from "antd";
import React from "react";
import { ILink } from "../../data/dashboard";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

interface IProps {
  links: ILink[];
  onClose: Function;
  handleLogOut: Function;
  show: boolean;
}

const MobileMenu = ({ links, onClose, show, handleLogOut }: IProps) => {
  return (
    <Drawer
      title={<span className="text-white">Menu</span>}
      open={show}
      onClose={() => onClose()}
      className="mobile-menu"
      placement="left"
      closeIcon={<IoMdClose color="#fff" />}
    >
      <div className="flex flex-col gap-4 pb-6 text-white">
        {links
          ?.filter((item) => item.label !== "Filler")
          .map((item: any) =>
            item.label !== "Logout" ? (
              <Link to={item.link} onClick={() => onClose()}>
                <div className="flex gap-2 items-center text-base cursor-pointer text-white active:text-[#109fff] hover:text-[#109fff]">
                  {React.createElement(item.icon)}
                  <span>{item.label}</span>
                </div>
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
