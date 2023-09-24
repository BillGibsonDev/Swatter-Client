const sameDate = (date1, date2) => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
}

export const handleDate = (timestamp) => {
  const inputDate = new Date(timestamp);
  const currentDate = new Date();

  if (sameDate(inputDate, currentDate)) {
    const options = { hour: 'numeric', minute: '2-digit', seconds: '2-digit', timeZoneName: 'short' };
    return inputDate.toLocaleTimeString(undefined, options);
  } else {
    const options = { year:'numeric', month:'short', day:'numeric', hour: 'numeric', minute: '2-digit', seconds: '2-digit', timeZoneName: 'short' };
    return inputDate.toLocaleDateString(undefined, options);
  }
}

export const handleActivityDate = (timestamp) => {
    const inputDate = new Date(timestamp);

    const options = { hour: 'numeric', minute: '2-digit', seconds: '2-digit', timeZoneName: 'short' };
    return inputDate.toLocaleTimeString(undefined, options);
}

export const handleElapsedTime = (dateString) => {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  const timeDifference = currentDate - targetDate;

  const elapsedMinutes = Math.floor(timeDifference / (1000 * 60));
  const elapsedHours = Math.floor(timeDifference / (1000 * 60 * 60));
  const elapsedDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (elapsedMinutes < 60) {
    return `${elapsedMinutes} minute${elapsedMinutes !== 1 ? 's' : ''} ago`;
  } else if (elapsedHours < 24) {
    return `${elapsedHours} hour${elapsedHours !== 1 ? 's' : ''} ago`;
  } else {
    return `${elapsedDays} day${elapsedDays !== 1 ? 's' : ''} ago`;
  }
}