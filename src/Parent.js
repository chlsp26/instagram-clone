import React, { useEffect, useState } from "react";

function Parent() {
  const [state, setState] = useState(0);
  useEffect(() => {
    console.log("Parent component");
  }, [state]);
  return (
    <div>
      <button onClick={() => setState(s => s + 1)}>submit</button>
      {state}
    </div>
  );
}

export default Parent;
