import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { IAuthDets } from "../../appTypes/auth";
import { TPaymentCategry } from "../../appTypes/payments";
import { openNotification } from "../../helpers/notifications";
import { getPaymentCategories } from "../../helpers/payments";
import PaymentCategory from "./PaymentCategory";

const PaymentCategories = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const { data, isSuccess } = useQuery(
    "payment-cats",
    () => getPaymentCategories({ schoolId: schoolId as string, token }),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
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

        const data: TPaymentCategry[] = result.map(
          (item: any): TPaymentCategry => ({
            id: item.id,
            name: item.name,
            description: item?.description,
          })
        );

        return data;
      },
    }
  );
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {isSuccess &&
        data.map((item) => (
          <PaymentCategory
            name={item.name}
            id={item.id}
            description={item.description}
          />
        ))}
    </div>
  );
};

export default PaymentCategories;
