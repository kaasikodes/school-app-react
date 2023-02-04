import { useQuery } from "react-query";
import { IStudentEntry } from "../components/students/StudentsTable";
import { openNotification } from "../helpers/notifications";
import { getAllStudents, IGetMultipleStudentProps } from "../helpers/students";

export const useFetchAllStudents = ({
  page,
  searchTerm,
  token,
  schoolId,
  limit,
}: IGetMultipleStudentProps) => {
  const queryData = useQuery(
    ["staff", page, limit, searchTerm],
    () =>
      getAllStudents({
        schoolId,
        token,
        searchTerm,
        page,
        limit,
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        // show notification
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (data) => {},

      select: (res: any) => {
        const result = res.data.data;
        console.log("student", result);

        const data: IStudentEntry[] = result.map(
          (item: any): IStudentEntry => ({
            id: item.data.id,
            name: item.user.name,
            studentNo: item.data.id_number,
            photo: item.user.profile_photo_url ?? "",
            currentClass: item.currentLevel.name,
            sessionPaymentStatus: "not paid",
            enrollmentStatus: item.currentSessionEnrollmentStatus,
          })
        );
        return {
          data: data,
          limit: 4,
          total: res.data.meta.total,
        };
      },
    }
  );

  return queryData;
};
