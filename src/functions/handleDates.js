const sameDate = (date1, date2) => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
}

export const handleDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const currentDate = new Date();

    if (sameDate(date, currentDate)) {
        // If the date is the same as today, return just the time
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
        return date.toLocaleTimeString(undefined, options);
    } else {
        // If the date is not the same as today, return the full formatted date
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
        return date.toLocaleDateString(undefined, options);
    }
}