import React, { useState, useEffect } from "react";

function Clock () {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    },1000);
  });

  return (<h1 className="clock nonselectable">{time}</h1>);
}

export default Clock;