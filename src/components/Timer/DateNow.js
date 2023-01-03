import React, { useState, useEffect } from 'react';

export default function DateNow() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      setTime(`${hour}:${minute}:${second}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>{time}</h1>
    </div>
  );
}