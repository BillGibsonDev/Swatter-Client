// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables';

// functions
import { handleActiveTickets } from '../../../functions/handleActiveTickets';

// components
import Ticket from './Ticket.js';

export default function TicketTable({ project }) {

    const ticketStatuses = ['Open', 'Underway', 'Reviewing', 'Completed'];

    let activeTickets = handleActiveTickets(true, project.tickets);

    activeTickets.sort((a, b) => {
        let dateA = new Date(a.lastUpdate);
        let dateB = new Date(b.lastUpdate);
        return dateA - dateB;
    })

    return (
        <StyledTicketTable>
            { 
                !project.tickets
                ? <div className="undefined">
                    <h1>You've haven't entered any tickets</h1>
                </div>
                : <>
                    {
                        ticketStatuses.map((status, index) => {
                            return (
                                <div className="tickets-container" key={index}>
                                    <h5>{status} <span>{activeTickets.filter(ticket => ticket.status === status).slice().reverse().length}</span></h5>
                                    {
                                       activeTickets.filter(ticket => ticket.status === status).slice().reverse().map((ticket, index) => {
                                            return (
                                                <Ticket
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
                </>
            }
        </StyledTicketTable>
    )
}

const StyledBugTable = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    height: 100%;
    max-height: 93vh;
    width: 100%;
    margin-top: 20px;
    position: relative;
    @media (max-width: 1440px){
        grid-template-columns: 275px 275px 275px 275px;
    }
    @media (max-width: 834px){
        grid-template-columns: 310px 310px 310px 310px;
    }
    @media (max-width: 428px){
        grid-template-columns: 310px 310px 310px 310px;
        width: 85vw;
    }
    .bugs-container {
        width: 100%;
        background: black;
        padding: 6px;
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