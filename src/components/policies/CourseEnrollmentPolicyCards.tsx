import React from "react";
import CourseEnrollmentPolicyCard from "./CourseEnrollmentPolicyCard";
import StudentEnrollmentPolicyCard from "./StudentEnrollmentPolicyCard";

const policies = [
  {
    id: "2",
    title: "Policy 1",
    sessionsUsedIn: [{ id: "123", name: "Session 1" }],
  },
];
const CourseEnrollmentPolicyCards = () => {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {policies.map((item) => (
        <CourseEnrollmentPolicyCard {...item} key={item.id} />
      ))}
    </div>
  );
};

export default CourseEnrollmentPolicyCards;
