import React, { useState } from "react";
import createContainer from "./createContainer";

function useNumber() {
  const [number, setNumber] = useState(0);
  const increment = () => setCount(number + 1);
  const decrement = () => setCount(number - 1);
  return { number, increment, decrement };
}

export default createContainer(useNumber);
