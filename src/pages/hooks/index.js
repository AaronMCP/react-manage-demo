import React, { useState } from "react";

function Hooks() {
  const [count, setCount] = useState(0);
  return (
    <div className="hooks">
      <h3>{count}</h3>
      <button type="button" onClick={() => setCount(count + 1)}>
        click
      </button>
    </div>
  );
}
export default Hooks;
