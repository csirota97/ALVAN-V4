import React, { useState, useEffect } from "react";

export default function Clock (props) {
  const [time, setTime] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString());
    },1000);
  });

  return (<h1 className="clock">{time}</h1>);
}