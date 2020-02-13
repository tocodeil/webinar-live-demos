import React from "react";

function canVote(age: number = 18) {
  return age > 18;
}

export default function Person(props: { age: number }) {
  const { age } = props;

  return (
    <p className="person">
      Hi!, I {canVote(age) ? "can" : "can't"} vote
    </p>
  )
}

Person.defaultProps = {
  age: 18,
};