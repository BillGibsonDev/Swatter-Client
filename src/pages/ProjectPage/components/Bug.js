// styled
import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';

// icons
import * as icons from '../../../assets/IconImports.js';

export const Bug = ({ project, bug }) => {

	const handleDate = (bug) => {
		let currentDate = new Date();
		let compareDate = currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",");
		const [ bugDate, bugTime ] = bug.lastUpdate.split(",");
		if(compareDate[0] === bugDate){
			return bugTime;
		} else {
			return bugDate;
		}
	}
	
	const handleSprintColor = (project) => {
		if(project.sprints.find(sprints => sprints.title === bug.sprint)){
			let color = project.sprints.find(sprints => sprints.title === bug.sprint).color;
			return color;
		} else {
			return '';
		}
	}

	const handleTagImage = (tag) => {
		switch (tag) {
		case "Bug":
			return icons.BugPicture;
		case "Feature":
			return icons.Feature;
		case "Enhancement":
			return icons.Enhancement;
		case "Task":
			return icons.Task;
		case "Redesign":
			return icons.Redesign;
		default:
			return '';
		}
	}

	const handleBugPriority = (priority) => {
		switch (priority) {
		case "Standard":
			return icons.ArrowGreen;
		case "Medium":
			return icons.ArrowYellow;
		case "High":
			return icons.ArrowRed;
		default:
			return '';
		};
	}

    return (
        <StyledBug className={bug.status}>
			<Link to={`/${project._id}/${bug._id}`}>
				<div className="top-container">
					<h2 id="title">{bug.title}</h2>
				</div>
				<div className="center-container">
					<h2 id="date">{handleDate(bug)}</h2>
					<h2 id="sprint" style={{background: handleSprintColor(project)}}>{bug.sprint}</h2>
				</div>
				<div className="bottom-container">
					<div className="status-icons-container">
						<img src={handleTagImage(bug.tag)} alt={bug.tag} />
						<img src={handleBugPriority(bug.priority)} alt={bug.priority} />
					</div>
				<h2 id={bug.author} className='author'>{bug.author}</h2>
				</div>
			</Link>
        </StyledBug>
    )
}

const StyledBug = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: 99%;
	margin: 2% auto;
	border-radius: 4px;
	cursor: pointer;
	border: 1px solid white;
	background: #0f4d92bd;
	transition: 0.2s;
	h2 {
		font-size: .8em;
		font-weight: 400;
	}
	#title {
		color: #ffffff;
	}
	#date, .author, #sprint {
		color: #e4e4e4;
		font-size: .8em;
		font-weight: 200;
	}
	.center-container, .bottom-container, .top-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 90%;
		height: 50%;
		margin: 10px auto;
		.status-icons-container {
			img {
				width: 20px;
				&:first-child {
					margin-right: 10px;
				}
			}
		}
	}
	.center-container {
		flex-direction: column;
		#date, #sprint {
			margin-right: auto;
		}
		#sprint {
			color: white;
			border-radius: 4px;
			font-weight: 200;
		}
	}
	/* author colors */
	#Gibby {
		color: #8bd4ff;;
	}
	#Moose {
		color: #0dbe7a;
	}
`;