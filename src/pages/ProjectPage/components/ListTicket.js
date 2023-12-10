// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables.js';

// router
import { Link } from 'react-router-dom';

// components
import { Timer } from '../../../components/Timer.js';
import { HandleIcons } from '../../../functions/handleIcons.js';

// redux
import { connect } from 'react-redux';

// functions
import { handleSprintColor, handleTimeAppraisal, handleTicketPriority } from './TicketFunctions.js';

const Ticket = ({ user, project, ticket, seeAssigned }) => {

	// #ff000070
    return (
        <StyledTicket style={ seeAssigned ? { background: user.username === ticket.assigned ? '#8000ff6f': '' } : {}}>
			<Link className="ticket-link-container" to={`/${user.id}/projects/${project._id}/tickets/${ticket._id}`}>
                <h2 id="title">
                    <img id="priority" src={handleTicketPriority(ticket.priority)} alt={ticket.priority} style={{ visibility: ticket.priority ? 'visible' : 'hidden' }}/>
                    <span id="key">{ticket.key ? `${ticket.key}` : ''}</span>
                    {ticket.title}
                    <span className="time-appraisal" style={{backgroundColor:handleTimeAppraisal(ticket.appraisal)}}></span>
                    <span id="sprint" style={handleSprintColor(project, ticket)}>{ticket.sprint ? ticket.sprint : ''}</span>
                </h2> 
                <h2 id="status">{ticket.status}</h2>
				<Timer id="date" date={ ticket.lastUpdate ? ticket.lastUpdate : ticket.date } />
                <HandleIcons tag={ticket.tag}/>
                <h2 id='author'>{ticket.author}</h2>
			</Link>
        </StyledTicket>
    )
}

const StyledTicket = styled.article`
	display: flex;
	width: 99%;
    max-width: 800px;
	margin: 6px 0;
	padding: 6px 0;
	border-radius: 4px;
	cursor: pointer;
	border: 1px solid white;
	background: #0f4d92bd;
	transition: 0.2s;
    .ticket-link-container {
        display: grid;
        grid-template-columns: 1fr auto 100px auto auto;
        grid-gap: 8px ;
        align-items: center;
        margin: 0 auto;
        width: 99%;
        padding: 0 10px;
        @media (max-width: 500px){
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
		}
        .time-appraisal {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-left: 4px;
        }
        h2 {
            font-size: .8em;
            font-weight: 400;
            text-align: center;
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            #sprint {
                margin-left: 4px;
                color: white;
                padding: 2px 10px;
            }
            #key {
                margin: 0 4px;
                color: #c5c5c5;
                font-weight: 400;
                font-size: 0.8em;
            }
        }
        #title {
            color: #ffffff;
            font-size: .9em;
            text-align: left;
        }
        #date, #author {
            color: #c5c5c5;
            font-size: .7em;
            font-weight: 400;
            text-align: center;
            width: auto;
        }
        p, #sprint, #status {
            font-size: .8em;
            font-weight: 400;
            border-radius: ${palette.borderRadius};
            color: ${palette.helperGrey};
            text-align: center;
            width: auto;
        }
        #priority {
            width: 12px;
            height: 12px;
        }
    }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Ticket);