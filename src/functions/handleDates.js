export const handleDate = (dateString) => {
    if(dateString){
        const options = { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone };
        
        let currentDate = new Date();
        currentDate = currentDate.toLocaleString('en-US', options).split(",");

        let date = new Date(dateString)
        date = date.toLocaleString('en-US', options).split(",");
        
        if(date[0] === currentDate[0]){
            return date[1];
        } else {
            return date[0];
        }
    }
}