import React, { useState } from "react";
import createContainer from "./createContainer";

function useCount() {
  const [number, setNumber] = useState(0);
  const increment = () => setCount(number + 1);
  const decrement = () => setCount(number - 1);
  return { count, increment, decrement };
}

export default createContainer(useCount);
