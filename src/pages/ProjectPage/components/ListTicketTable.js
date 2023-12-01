// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables';

// functions
import { handleActiveTickets } from '../../../functions/handleActiveTickets';

// components
import ListTicket from './ListTicket.js';

export default function ListTicketTable({ project, seeAssigned, ticketTimeFrame }) {

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
            <div className="tickets-container">
                {
                    activeTickets.map((ticket, index) => {
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