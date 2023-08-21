import moment from "moment/moment";

export const handleActiveBugs = ( active, bugs ) => {
    let activeArray = [];
    let inactiveArray = [];
    for ( let i = 0; bugs.length > i; i++ ){
        let bugDate = bugs[i].lastUpdate.split(",");
        const days = moment(bugDate[0]).diff(moment(), 'days');
        if(days>-30){
            activeArray.push(bugs[i])
        } else {
            inactiveArray.push(bugs[i])
        }
    }
    if(active){
        return activeArray;
    } else {
        return inactiveArray;
    }
}

