import { UploadOutlined } from "@ant-design/icons";
import { UploadProps, message, Upload, Button } from "antd";
import { useContext } from "react";
import {
  GlobalContext,
  EGlobalOps,
} from "../../contexts/GlobalContextProvider";

type TFileType =
  | "image/png"
  | "image/jpeg"
  | "image/jpg"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "text/plain"
  | "application/pdf"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
interface IFilesProps {
  allowedFileTypes: TFileType[];
  displayType?: "icon" | "button";
  fileKey: string;
}

const CLOUD_NAME = `${process.env.REACT_APP_CLOUD_NAME}`;
const UPLOAD_PRESET = `${process.env.REACT_APP_UPLOAD_PRESET}`;

export const FileUpload = ({
  allowedFileTypes,
  displayType = "button",
  fileKey,
}: IFilesProps) => {
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;

  const props: UploadProps = {
    beforeUpload: (file) => {
      let allowSubmission = true;
      if (!allowedFileTypes.includes(file.type as TFileType)) {
        allowSubmission = false;
      }
      if (!allowSubmission) {
        message.error(`This file type (${file.type}) is not allowed!`);
      }
      return allowSubmission || Upload.LIST_IGNORE;
    },
    name: "file",
    // showUploadList: false,
    action: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload?upload_preset=${UPLOAD_PRESET}`,
    headers: {
      Accept: "application/json",
      // Authorization: `Bearer ${token}`,
      // "x-company-id": companyId as string,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file.response.data);
      }
      if (info.file.status === "done") {
        console.log("FILE RESPONSE", info.file.response?.url);
        dispatch({
          type: EGlobalOps.setUploadFileString,
          payload: { value: info.file.response?.url, key: fileKey },
        });
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Upload {...props}>
        {displayType === "button" && (
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        )}
        {displayType === "icon" && <div>Test file +</div>}
      </Upload>
    </div>
  );
};
