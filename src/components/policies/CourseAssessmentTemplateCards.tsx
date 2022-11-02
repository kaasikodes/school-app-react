import React from "react";
import CourseAssessmentTemplateCard from "./CourseAssessmentTemplateCard";

const templates = [
  {
    id: "2",
    title: "Template 1",
    sessionsUsedIn: [{ id: "123", name: "Session 1" }],
  },
];
const CourseAssessmentTemplateCards = () => {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {templates.map((item) => (
        <CourseAssessmentTemplateCard {...item} key={item.id} />
      ))}
    </div>
  );
};

export default CourseAssessmentTemplateCards;
