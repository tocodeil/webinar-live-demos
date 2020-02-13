import React, { useState } from "react";

function canVote(age: number) {
  return age >= 18;
}

export default function Person(props: { initialAge: number }) {
  const { initialAge } = props;
  // Generics
  const [age, setAge] = useState<number>(0);

  const growUp = () => {
      setAge(v => v + 1);
  };

  return (
    <p className="person">
      Hi!, I {canVote(age) ? "can" : "can't"} vote I'm only {age}
      <button onClick={growUp}>Grow Up</button>
    </p>
  )
}