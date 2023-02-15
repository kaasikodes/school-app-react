import { useQuery } from "react-query";
import { TCourseRecordingTempate } from "../components/policies/CourseAssessmentTemplateCard";
import { openNotification } from "../helpers/notifications";
import {
  getCRTemplates,
  IGetCRTsProps,
} from "../helpers/schoolCRecordTemplates";

export const useFetchCourseRecordTemplates = ({
  token,
  schoolId,
}: IGetCRTsProps) =>
  useQuery(
    ["course-record-templates"],
    () => {
      return getCRTemplates({
        token,
        schoolId,
      });
    },
    {
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error occurs",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },

      select: (res: any) => {
        const result = res.data.data;

        const templates: TCourseRecordingTempate[] = result.map(
          (item: any) => ({
            id: item.id,
            title: item.title,
            sessionsUsedIn: item.sessions_used_in?.map((item: any) => ({
              id: item.session_id.id,
              name: item.session_id.name,
            })),
          })
        );

        return templates;
      },
    }
  );
