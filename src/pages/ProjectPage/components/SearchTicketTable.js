// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables';

// components
import ListTicket from './ListTicket';

export default function SearchTicketTable({ project, tickets, ticketSearchPhrase, seeAssigned }) {

    // save me :)
    // Object.keys(ticketObject).forEach((key) => {
    //     let string = `${ticketObject[key]}`;
    //     string = string.toLowerCase();
    //     if(string.includes(ticketSearchPhrase.toLowerCase())){
    //         if(array.findIndex(ticket => ticket._id === ticketObject._id) < 0){
    //             ticketArray.push(project.tickets[i])
    //         }
    //     }
    // })

    const handleSearch = (status) => {
        let ticketArray = [];
        if(ticketSearchPhrase){
            let x = tickets.length;
            for ( let i = 0; x > i; i++ ){
                let ticketObject = tickets[i];
                let index = ticketArray.findIndex(ticket => ticket._id === ticketObject._id)
                if( index < 0){
                    Object.keys(ticketObject).forEach((key) => {
                        let string = `${ticketObject[key]}`;
                        string = string.toLowerCase();
                        if(string.includes(ticketSearchPhrase.toLowerCase())){
                            if(ticketArray.findIndex(ticket => ticket._id === ticketObject._id) < 0){
                                ticketArray.push(tickets[i])
                            }
                        }
                    })
                }
            }
            return ticketArray;
        } else {
            let array = tickets.filter(ticket => ticket.status === status).slice().reverse()
            return array;
        }
    }

   const filteredTickets = handleSearch();

    if(!tickets){
        return (
            <StyledTicketTable>
                <div className="undefined">
                    <h1>You've haven't entered any tickets</h1>
                </div>
            </StyledTicketTable>
        )
    }

    return (
        <StyledTicketTable>
            <div className="tickets-container">
                {
                    filteredTickets.map((ticket, index) => {
                        return (
                            <ListTicket
                                seeAssigned={seeAssigned}
                                project={project}
                                ticket={ticket}
                                key={index}
                            />
                        )
                    })
                }
            </div>
        </StyledTicketTable>
    )
}

const StyledTicketTable = styled.section`
    height: 100%;
    width: 100%;
    margin-top: 10px;
    .tickets-container {
        width: 100%;
        height: 100%;
        padding: 6px;
        h5 {
            color: ${palette.helperGrey};
            padding: 10px;
            font-size: ${palette.paraSize};
            span {
                font-weight: 400;
            }
        }
    }
`;