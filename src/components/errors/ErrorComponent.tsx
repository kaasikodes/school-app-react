import { Button, Typography } from "antd";
import React from "react";

interface IProps {
  message?: string;
  img?: string;
  link?: {
    text: string;
    url: string;
  };
}

const ErrorComponent = ({
  message = "Oops, an Error Occurred!",
  link,
  img,
}: IProps) => {
  return (
    <div className="min-h-32 flex flex-col gap-4 justify-center items-center">
      <div>
        {img && <img src={img} alt={message} className="object-contain h-80" />}
      </div>
      <Typography.Title level={3}>
        <span className="text-sky-700">{message}</span>
      </Typography.Title>

      {link && (
        <Button href={link.url} type="primary">
          {link.text}
        </Button>
      )}
    </div>
  );
};
// Does the component render props accordingly, as intended

export default ErrorComponent;
