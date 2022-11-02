import React from "react";
import StudentPromotionPolicyCard from "./StudentPromotionPolicyCard";

const policies = [
  {
    id: "2",
    title: "Policy 1",
    sessionsUsedIn: [{ id: "123", name: "Session 1" }],
  },
];
const StudentPromotionPolicyCards = () => {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {policies.map((item) => (
        <StudentPromotionPolicyCard {...item} key={item.id} />
      ))}
    </div>
  );
};

export default StudentPromotionPolicyCards;
