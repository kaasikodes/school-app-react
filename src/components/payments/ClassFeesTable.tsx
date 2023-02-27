import { Button, Table } from "antd";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { IAuthDets } from "../../appTypes/auth";
import { TLevelfee } from "../../appTypes/payments";
import { openNotification } from "../../helpers/notifications";
import { getLevelFees } from "../../helpers/payments";

const ClassFeesTable = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const sessionId = "0"; //should be from ctx

  const columns = [
    {
      title: "Class",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Payment Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Installmental",
      dataIndex: "inPart",
      key: "inPart",
      render: (val: number) => (val === 1 ? "Yes" : "No"),
    },
    {
      title: "Breakdown",
      dataIndex: "docUrl",
      key: "docUrl",
      render: (val: string | null) =>
        val ? (
          <Button type="link" href={val}>
            Download
          </Button>
        ) : (
          <Button type="text">None</Button>
        ),
    },
  ];
  const {
    data: levelFees,
    isLoading,

    isSuccess: isLSuccess,
  } = useQuery(
    "levels",
    () => getLevelFees({ schoolId: schoolId as string, token, sessionId }),
    {
      onError: (err: any) => {
        // show notification
        openNotification({
          state: "error",
          title: "Error Occured",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (data: any) => {
        openNotification({
          state: "success",

          title: "Success",
          description: "Payment Categories fetched successfully",
          duration: 0.4,
        });
      },
      select: (res: any) => {
        const result = res.data.data;
        console.log("result", result);

        const data: TLevelfee[] = result.map(
          (item: any): TLevelfee => ({
            id: item.data.id,
            level: item?.level?.name,

            category: item.category.name,
            docUrl: item.data?.breakdown_document_url,
            amount: item.data.amount,
            inPart: item.data.can_be_installmental,
            currency: item?.currency?.name,
          })
        );

        return { data, totalCount: res.data.total };
      },
    }
  );
  return (
    <div>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={levelFees?.data}
        pagination={{ total: levelFees?.totalCount }}
        size="small"
      />
    </div>
  );
};

export default ClassFeesTable;
