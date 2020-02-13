import React from "react";
import "./person.css";

function canVote(age: number) {
  return age > 18;
}

export default function Person() {
  const age = 18;

  return (
    <p className="person">
      Hi!, I {canVote(age) ? "can" : "can't"} vote
    </p>
  )
}