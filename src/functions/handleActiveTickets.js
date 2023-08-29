import moment from "moment/moment";

export const handleActiveTickets = ( active, tickets ) => {
    let activeArray = [];
    let inactiveArray = [];
    for ( let i = 0; tickets.length > i; i++ ){
        let ticketDate = tickets[i].lastUpdate.split(",");
        const days = moment(ticketDate[0]).diff(moment(), 'days');
        if(days>-30){
            activeArray.push(tickets[i])
        } else {
            inactiveArray.push(tickets[i])
        }
    }
    if(active){
        return activeArray;
    } else {
        return inactiveArray;
    }
}

