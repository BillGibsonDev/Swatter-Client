// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables';

// functions
import { handleActiveTickets } from '../../../functions/handleActiveTickets';

// components
import Ticket from '../../ProjectPage/components/Ticket.js';

export default function ArchiveTicketTable({ project, tickets }) {

    const ticketStatuses = ['Open', 'Underway', 'Reviewing', 'Completed'];

    let archiveTickets = handleActiveTickets(false, tickets);

    archiveTickets.sort((a, b) => {
        let dateA = new Date(a.lastUpdate);
        let dateB = new Date(b.lastUpdate);
        return dateA - dateB;
    })

    return (
        <StyledTicketTable>
            { 
                !project
                ? <div className="undefined">
                    <h1>You've haven't entered any tickets</h1>
                </div>
                : <>
                    {
                        ticketStatuses.map((status, index) => {
                            return (
                                <div className="tickets-container" key={index}>
                                    <h5>{status} <span>{archiveTickets.filter(ticket => ticket.status === status).slice().reverse().length}</span></h5>
                                    {
                                       archiveTickets.filter(ticket => ticket.status === status).slice().reverse().map((ticket, index) => {
                                            return (
                                                <Ticket
                                                    ticket={ticket}
                                                    project={project}
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

const StyledTicketTable = styled.div`
    display: grid;
    grid-template-columns: 310px 310px 310px 310px;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    height: 100%;
    width: 100%;
    margin-top: 20px;
    .tickets-container {
        width: 100%;
        padding: 6px;
        background: #0b2849;
        border-radius: ${palette.borderRadius};
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