// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables';

// functions
import { handleActiveTickets } from '../../../functions/handleActiveTickets';

// components
import Ticket from './Ticket.js';

export default function TicketTable({ project, seeAssigned, ticketTimeFrame }) {

    const ticketStatuses = ['Open', 'Underway', 'Reviewing', 'Completed'];

    let activeTickets = handleActiveTickets(true, project.tickets, ticketTimeFrame);

    activeTickets.sort((a, b) => {
        let ticketDateA = a.lastUpdate;
        let ticketDateB = b.lastUpdate;
        if(!ticketDateA && !ticketDateB){
            ticketDateA = a.date;
            ticketDateB = b.date;
        } else if(!a.lastUpdate){
            ticketDateA = a.date;
        } else if(!b.lastUpdate){
            ticketDateB = b.date;
        } 
        let dateA = new Date(ticketDateA);
        let dateB = new Date(ticketDateB);
        return dateB - dateA;
    })

    if(!project.tickets){
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
            {
                ticketStatuses.map((status, index) => {
                    return (
                        <div className="tickets-container" key={index}>
                            <h5>{status} <span>{activeTickets.filter(ticket => ticket.status === status).length}</span></h5>
                            {
                                activeTickets.filter(ticket => ticket.status === status).map((ticket, index) => {
                                    return (
                                        <Ticket
                                            seeAssigned={seeAssigned}
                                            project={project}
                                            ticket={ticket}
                                            key={index}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </StyledTicketTable>
    )
}

const StyledTicketTable = styled.section`
    display: grid;
    grid-template-columns: 310px 310px 310px 310px;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    height: 100%;
    width: 100%;
    margin-top: 20px;
    /* scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
        width: none;
    } */
    .tickets-container {
        width: 100%;
        background: black;
        padding: 6px;
        background: #0b2849;
        border-radius: ${palette.borderRadius};
        height: 100%;
        max-height: 85vh;
        overflow: auto;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
            width: none;
        }
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