import React from "react";
import GradingPolicyCard from "./GradingPolicyCard";

const policies = [
  {
    id: "2",
    title: "Policy 1",
    sessionsUsedIn: [{ id: "123", name: "Session 1" }],
  },
];
const GradingPolicyCards = () => {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {policies.map((item) => (
        <GradingPolicyCard {...item} key={item.id} />
      ))}
    </div>
  );
};

export default GradingPolicyCards;
