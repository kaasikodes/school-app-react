import React from "react";
import StudentEnrollmentPolicyCard from "./StudentEnrollmentPolicyCard";

const policies = [
  {
    id: "2",
    title: "Policy 1",
    sessionsUsedIn: [{ id: "123", name: "Session 1" }],
  },
];
const StudentEnrollmentPolicyCards = () => {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {policies.map((item) => (
        <StudentEnrollmentPolicyCard {...item} key={item.id} />
      ))}
    </div>
  );
};

export default StudentEnrollmentPolicyCards;
