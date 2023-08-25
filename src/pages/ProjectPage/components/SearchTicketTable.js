// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables';

// components
import Ticket from './Ticket.js';

export default function SearchTicketTable({ tickets, ticketSearchPhrase }) {

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

    return (
        <StyledTicketTable>
            { 
                !tickets
                ? <div className="undefined">
                    <h1>You've haven't entered any tickets</h1>
                </div>
                : <div className="tickets-container">
                        <h5>Results <span>{filteredTickets.length}</span></h5>
                        {
                            filteredTickets.map((ticket, index) => {
                                return (
                                    <Ticket
                                        ticket={ticket}
                                        key={index}
                                    />
                                )
                            })
                        }
                </div>
                            
            }
        </StyledTicketTable>
    )
}

const StyledTicketTable = styled.div`
    display: flex;
    height: 100%;
    max-height: 93vh;
    width: 100%;
    margin-top: 7vh;
    position: relative;
    max-width: 500px;
    .tickets-container {
        width: 100%;
        background: black;
        padding: 10px;
        background: #0b2849;
        border-radius: 12px;
        h5 {
            color: ${palette.helperGrey};
            padding: 10px;
            font-size: ${palette.paraSize};
            span {
                font-weight: 400;
            }
        }
        .Open, .Underway, .Reviewing, .Completed {
            display: flex;
            &:hover {
                background: #000000;
                border: 1px #ffffff63 solid;
            }
        }
    }
`;