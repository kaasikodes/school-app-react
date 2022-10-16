import { Typography } from "antd";
import { useAuthUser } from "react-auth-kit";

const EstateOwners = () => {
  const auth = useAuthUser();
  console.log("POY => ", auth());
  return (
    <div>
      <Typography.Title level={3}>Estate Owners</Typography.Title>
      {/* content */}
      <div className="mt-8">wait ...</div>
    </div>
  );
};

export default EstateOwners;
