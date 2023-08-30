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
        const options = { hour: '2-digit', minute: '2-digit', seconds: '2-digit', timeZoneName: 'short' };
        return inputDate.toLocaleTimeString(undefined, options);
    } else {
        const options = { year:'numeric', month:'short', day:'numeric' };
        return inputDate.toLocaleDateString(undefined, options);
    }
}

export const handleActivityDate = (timestamp) => {
    const inputDate = new Date(timestamp);

    const options = { hour: '2-digit', minute: '2-digit', seconds: '2-digit', timeZoneName: 'short' };
    return inputDate.toLocaleTimeString(undefined, options);
}