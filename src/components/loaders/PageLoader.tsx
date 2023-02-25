import { Spin } from "antd";

const PageLoader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default PageLoader;
