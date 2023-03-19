import { Table } from "antd";
import moment from "moment";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { IAuthDets } from "../../appTypes/auth";
import { TSudentSessPaymentRec } from "../../appTypes/payments";
import { openNotification } from "../../helpers/notifications";
import { getStudentSessPaymentRecs } from "../../helpers/payments";

const PaymentRecordsTable = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const sessionId = "0"; //should be from ctx

  const columns = [
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
    },
    {
      title: "Payment Category",
      dataIndex: "category",
      key: "category",
      render: () => <span className="capitalize">School Fees</span>,
    },

    {
      title: "Complete",
      dataIndex: "complete",
      key: "complete",
      render: (val: number, record: TSudentSessPaymentRec) =>
        record.amountPaid >= record.amountDue ? "Yes" : "No",
    },
    // {
    //   title: "Proof of Payment",
    //   dataIndex: "docUrl",
    //   key: "docUrl",
    //   render: (val: string | null) =>
    //     val ? (
    //       <Button type="link" href={val}>
    //         Download
    //       </Button>
    //     ) : (
    //       <Button type="text">None</Button>
    //     ),
    // },
    {
      title: "Amount Due",
      dataIndex: "amountDue",
      key: "amountDue",
    },
    {
      title: "Amount Paid",
      dataIndex: "amountPaid",
      key: "amountPaid",
    },

    {
      title: "Recorder",
      dataIndex: "recorder",
      key: "recorder",
      render: (val: string | null) =>
        val ? <span className="capitalize">{val}</span> : "nil",
    },

    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];
  const { data: levelFees, isLoading } = useQuery(
    "student-sess-payment-recs",
    () =>
      getStudentSessPaymentRecs({
        schoolId: schoolId as string,
        token,
        sessionId,
      }),
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

        const data: TSudentSessPaymentRec[] = result.map(
          (item: any): TSudentSessPaymentRec => ({
            id: item.data.id,
            student: item?.user?.name,
            recorder: item?.recorder?.name,
            amountDue: item?.levelFee?.amount,
            amountPaid: item?.data?.amount,
            createdAt: moment(item.data.createdAt).format("DD/MM/YYYY"),
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

export default PaymentRecordsTable;
