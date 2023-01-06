import { Button, message, Spin, Typography, Upload } from "antd";
import React, { useContext } from "react";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";
import * as XLSX from "xlsx";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useQueryClient } from "react-query";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { openNotification } from "../../helpers/notifications";
import { useAddCoursesInBulk } from "../../helpersAPIHooks/courses";
import {
  downloadBulkCoursesUploadTemplate,
  ISaveCourseInBulkProps,
} from "../../helpers/courses";
import { downloadBulkStaffUploadTemplate } from "../../helpers/staff";
import { useAddStaffInBulk } from "../../helpersAPIHooks/staff";
import { downloadBulkStudentsUploadTemplate } from "../../helpers/students";

interface IProps {
  closeDrawer: Function;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  // if (!isJpgOrPng) {
  //   message.error("You can only upload JPG/PNG file!");
  // }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error("Image must smaller than 2MB!");
  // }
  return false;
};
const AddBulkStudentForm: React.FC<IProps> = ({ closeDrawer }) => {
  const queryClient = useQueryClient();

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id;
  const adminId = globalState?.currentSchool?.adminId as string;

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const [dataToBeSubmited, setDataToBeSubmited] = useState("");
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    setDataToBeSubmited("");
    console.log("FILE", info.file);
    var reader = new FileReader();
    reader.onload = function (e: any) {
      try {
        var data = e.target.result;
        let readedData = XLSX.read(data, { type: "binary" });
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];

        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, {
          header: 1,
        }) as unknown as string[][];
        console.log(dataParse[0], "reader");
        console.log("Data", dataParse);
        const columns: string[] = dataParse[0];
        const retrievedData: any[] = dataParse.splice(1);

        // validate the columns
        if (
          columns[0] !== "first name" ||
          columns[1] !== "middle name" ||
          columns[2] !== "last name" ||
          columns[3] !== "staff no" ||
          columns[4] !== "email"
        ) {
          console.log("DataNNN", dataParse, columns[0]);

          throw new Error(
            "The file uploaded is invalid, use the correct template!"
          );
        }

        // To Do
        // Make backend throw proper error when an empty department (name) field is sent OR from frontend(prevent it)
        const formattedData = retrievedData
          .map((item, entryIndex) => {
            let ans: any = {};
            columns.forEach((col, i) => {
              ans[col] = item[i] ? item[i] : null;

              // if (col === "first name" && ans[col] === null) {
              //   throw new Error(
              //     `A staff must have a first name, check the entry ${
              //       entryIndex + 2
              //     }`
              //   );
              // }
            });

            return ans;
          })
          .filter((item) => item?.email !== null);
        console.log("FData", retrievedData, formattedData);

        // convert to json also
        const jsonData = JSON.stringify(formattedData);
        setDataToBeSubmited(jsonData);
      } catch (error: any) {
        setDataToBeSubmited("");
        message.error(error?.message, 10);
      }
    };
    reader.readAsBinaryString(info.file as unknown as any);
    if (info.file.status === "uploading") {
      //   setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        // setLoading(false);
        // setImageUrl(url);
      });
    }
  };

  const { mutate, isLoading } = useAddStaffInBulk();

  const handleSubmit = (e: React.MouseEvent) => {
    if (schoolId) {
      const props: ISaveCourseInBulkProps = {
        schoolId,
        token,
        jsonData: dataToBeSubmited,
        adminId,
      };
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      mutate(props, {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          // const result = res.data.data;
          console.log("BULK", res);

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          closeDrawer();

          queryClient.invalidateQueries({
            queryKey: ["staff"],
            // exact: true,
          });
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="border border-dotted border-slate-500 rounded flex flex-col items-center gap-2 py-3 px-2">
        <p>Select file to be Imported</p>
        <Typography.Text title="Please Download template and populate">
          <a
            href={downloadBulkStudentsUploadTemplate({
              schoolId: schoolId as unknown as string,
            })}
          >
            <span className="text-sm pt-1 font-medium cursor-pointer hover:text-caramel underline">
              Download template
            </span>
          </a>
        </Typography.Text>

        <div className="flex justify-center w-3/5">
          <Upload
            // fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            className="flex flex-col items-center w-full"
            maxCount={1}
          >
            <div className="w-full border border-dotted border-caramel px-2 py-1 rounded text-caramel text-sm flex flex-col gap-1 items-center justify-center">
              <i className="ri-download-2-line text-2xl"></i>
              <span className="text-xs font-medium">Upload File</span>
            </div>
          </Upload>
        </div>
      </div>
      <Button
        type="primary"
        onClick={handleSubmit}
        loading={isLoading}
        disabled={dataToBeSubmited === ""}
      >
        Add Students
      </Button>
    </div>
  );
};

export default AddBulkStudentForm;
