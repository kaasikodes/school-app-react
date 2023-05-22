import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

interface IProps {
  releaseDate?: string;
}

const img = "/assets/loginIll.svg";
const ComingSoon = ({ releaseDate = "4th of Sept., 2023" }: IProps) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-32 flex flex-col gap-4 justify-center items-center">
      <div>
        {img && (
          <img src={img} alt={releaseDate} className="object-contain h-52" />
        )}
      </div>
      <Typography.Title level={4} className="text-center text-slate-500">
        Please be patient, feature will be available soon <br />
        <span className="text-sky-700">{releaseDate}</span>
      </Typography.Title>

      <Button onClick={() => navigate("/")} type="primary">
        Go back
      </Button>
    </div>
  );
};

export default ComingSoon;
