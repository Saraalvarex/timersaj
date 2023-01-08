import React, { useState, useEffect } from 'react';

export default function DateNow() {
  const [time, setTime] = useState('');
  localStorage.setItem('time', time);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      let hourString = hour;
    if (hour < 10) {
      hourString = '0' + hour;
    }
    let minuteString = minute;
    if (minute < 10) {
      minuteString = '0' + minute;
    }
    let secondString = second;
    if (second < 10) {
      secondString = '0' + second;
    }
      setTime(`${hourString}:${minuteString}:${secondString}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h4>Hora actual: {time}</h4>
    </div>
  );
}