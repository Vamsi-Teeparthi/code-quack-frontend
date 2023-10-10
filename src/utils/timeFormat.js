export const timeFormat = (date) => {
    const inputDate = new Date(date);

    // Define options for formatting
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Use 12-hour clock with AM/PM
    };

    // Format the date
    const formattedDate = inputDate.toLocaleString('en-US', options);
    return formattedDate
}