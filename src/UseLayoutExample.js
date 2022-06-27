import { wait } from "@testing-library/react";
import React, { useState, useLayoutEffect, useEffect } from "react";

const UseLayoutExample = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("useLayoutEffect");
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
    console.log("useLayoutEffect");
  }, [value]);

  console.log("render", value);

  return <div onClick={() => setValue(0)}>value: {value}</div>;
};

export default UseLayoutExample;
