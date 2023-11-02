import moment from "moment/moment";

export const handleActiveTickets = ( active, tickets, timeFrame ) => {
    let activeArray = [];
    let inactiveArray = [];
    for ( let i = 0; tickets.length > i; i++ ){
        let ticketDate;
        if(tickets[i].lastUpdate){
            ticketDate = tickets[i].lastUpdate.split(",");
        } else {
           ticketDate = tickets[i].date.split(",");
        }
        const days = moment(ticketDate[0]).diff(moment(), 'days');
        if(days>-timeFrame){
            activeArray.push(tickets[i]);
        } else if(timeFrame === 'All'){
            return tickets;
        } else {
            inactiveArray.push(tickets[i]);
        }
    }
    if(active){
        return activeArray;
    } else {
        return inactiveArray;
    }
}

