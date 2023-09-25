import React, { useState, useEffect } from 'react';
import { handleElapsedTime } from '../functions/handleDates';

export const Timer = ({ date }) => {
  const [ elapsedTime, setElapsedTime ] = useState(0);

  useEffect(() => {
    const initialElapsedTime = handleElapsedTime(date);
    setElapsedTime(initialElapsedTime);

    const intervalId = setInterval(() => {
      const updatedElapsedTime = handleElapsedTime(date);
      setElapsedTime(updatedElapsedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [ date ]);

  return (
    <h3>{elapsedTime}</h3>
  );
}
