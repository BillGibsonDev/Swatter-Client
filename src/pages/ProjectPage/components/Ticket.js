// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables.js';

// router
import { Link } from 'react-router-dom';

// icons
import * as icons from '../../../assets/IconImports.js';

// components
import { Timer } from '../../../components/Timer.js';
import { HandleIcons } from '../../../functions/handleIcons.js';

// redux
import { connect } from 'react-redux';

const Ticket = ({ user, project, ticket, seeAssigned }) => {

	const handleSprintColor = (project) => {
		if(project.sprints){
			let sprintColor = project.sprints.find(sprint => sprint.title === ticket.sprint)
			if(sprintColor){
				let color = sprintColor.color;
				if(color){
					return { background: color, padding: '1px 4px' };
				}
			} else {
				return {};
			}
		}
	}

	const handleTicketPriority = (priority) => {
		switch (priority) {
		case "High":
			return icons.ArrowRed;
		default:
			return '';
		};
	}

	// #ff000070
    return (
        <StyledTicket className={ticket.status} style={ seeAssigned ? { background: user.username === ticket.assigned ? '#8000ff6f': '' } : {}}>
			<Link to={`/${user.id}/projects/${project._id}/tickets/${ticket._id}`}>
				<h2 id="title">{ticket.title}</h2> 
				<h2 id="sprint" style={handleSprintColor(project)}>{ticket.sprint}</h2>
				<Timer id="date" date={ ticket.lastUpdate ? ticket.lastUpdate : ticket.date } />
				<div className="bottom-container">
					<div className="status-icons-container">
						<HandleIcons tag={ticket.tag}/>
						<h2 id="key">{ticket.key ? `${ticket.key}` : ''}</h2>
						<img id="priority" src={handleTicketPriority(ticket.priority)} alt={ticket.priority} />
					</div>
					<h2 id={ticket.author} className='author'>{ticket.author}</h2>
				</div>
			</Link>
        </StyledTicket>
    )
}

const StyledTicket = styled.article`
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: 99%;
	margin: 2% auto;
	padding: 6px 0;
	border-radius: 4px;
	cursor: pointer;
	border: 1px solid white;
	background: #0f4d92bd;
	transition: 0.2s;
	h2 {
		font-size: .8em;
		font-weight: 400;
		width: 90%;
		margin: 0 auto;
	}
	#title {
		color: #ffffff;
		font-size: 1em;
	}
	#date, .author, #key {
		color: #c5c5c5;
		font-size: .7em;
		font-weight: 400;
	}
	p, #sprint {
		font-size: .8em;
		font-weight: 400;
		margin: auto auto 4px auto;
		width: 90%;
		border-radius: ${palette.borderRadius};
		color: ${palette.helperGrey};
	}
	p {
		margin-bottom: 6px;
	}
	#sprint {
		color: white;
		width: fit-content;
		max-width: fit-content;
		margin-left: 5%;
	}
	.bottom-container, .top-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 90%;
		height: 50%;
		margin: 4px auto;
		.author {
			margin-right: 0;
			width: auto;
		}
		.status-icons-container {
			display: flex;
			align-items: center;
			width: fit-content;
			#key {
				margin: 0 10px;
			}
			#priority {
				width: 20px;
			}
		}
	}
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Ticket);