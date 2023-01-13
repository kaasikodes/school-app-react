import { useQuery } from "react-query";
import { IPaginationProps, ISearchParams } from "../appTypes/requestParams";
import { TSession } from "../appTypes/sessions";
import { openNotification } from "../helpers/notifications";
import {
  getSchoolSessionSetting,
  IGetSchoolSessSettingProps,
} from "../helpers/schools";
import { getSessions } from "../helpers/sessions";

interface IFRQProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  schoolId: string;
  token: string;
  onSuccess?: Function;
}
export interface IFRQReturnProps {
  data: TSession[];
  total: number;
}

export const useFetchSessions = ({
  pagination,
  searchParams,
  token,
  schoolId,
  onSuccess,
}: IFRQProps) => {
  const queryData = useQuery(
    ["sessions", pagination?.page, pagination?.limit],
    () =>
      getSessions({
        schoolId,
        token,
        searchParams,
        pagination: { limit: pagination?.limit, page: pagination?.page },
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
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },

      select: (res: any) => {
        const fetchedData = res.data.data;
        const result = fetchedData;

        const data: TSession[] = result.map(
          (item: any): TSession => ({
            id: item.id,
            name: item.name,
            description: item.description,
            starts: item.starts,
            ends: item.ends,
          })
        );

        const ans: IFRQReturnProps = {
          data,
          total: fetchedData.totalCount,
        };

        return ans;
      },
    }
  );

  return queryData;
};
export const useFetchSchoolSessionSetting = ({
  token,
  schoolId,
  sessionId,
}: IGetSchoolSessSettingProps) => {
  const queryData = useQuery(
    ["school-session-setting", schoolId, sessionId],
    () =>
      getSchoolSessionSetting({
        token,
        schoolId,
        sessionId,
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

      select: (res: any) => {
        const fetchedData = res.data.data;
        const result = fetchedData;

        type TSchoolSessionSetting = {
          courseRecordTemplateId?: string;
          studentEnrollmentPolicyId?: string;
          gradingPolicyId?: string;
          id: string;
        };

        const data: TSchoolSessionSetting = {
          courseRecordTemplateId: result?.course_record_template_id,
          studentEnrollmentPolicyId: result?.student_enrollment_policy_id,
          gradingPolicyId: result?.grading_policy_id,
          id: result.id,
        };

        const ans = data;

        return ans;
      },
    }
  );

  return queryData;
};
