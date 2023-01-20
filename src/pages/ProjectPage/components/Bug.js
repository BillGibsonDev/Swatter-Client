import { useState, useEffect } from 'react';

// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables';

// router
import { Link } from 'react-router-dom';

// icons
import * as icons from '../../../assets/IconImports.js';

export default function Bug({
    projectId,
    bugId,
    title,
    priority,
    author,
    status,
    tag,
    lastUpdate,
    user,
	sprint, 
	project,
	rerender
}) {

	const [ compareDate, setCompareDate] = useState("");
	const [ sprintColor, setSprintColor ] = useState("");

	useEffect(() => {
	  const handleDate = () => {
		const currentDate = new Date();
		setCompareDate( currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
	  }
	  setSprintColor(project.sprints.filter(sprints => sprints.title === sprint))
	  handleDate();
	}, [project, sprint, rerender])

	const [ currentDate ] = compareDate.split(",");
	const [ bugDate, bugTime ] = lastUpdate.split(",");

    return (
        <StyledBug className={status}>
			<Link to={`/${projectId}/${bugId}`}>
			<div className="top-container">
				<h2 id="title">{title}</h2>
			</div>
			<div className="center-container">
				<h2 id="date">
					{
						currentDate === bugDate 
						? bugTime
						: bugDate
					}
				</h2>
				<h2 id="sprint" style={{background: !sprintColor[0] ? "" : sprintColor[0].color}}>{sprint}</h2>
			</div>
			<div className="bottom-container">
				<div className="status-icons-container">
					{(() => {
						switch (tag) {
							case "Bug":
								return (<img src={icons.BugPicture} alt="Bug" />)
							case "Feature":
								return (<img src={icons.Feature} alt="Feature" />)
							case "Enhancement":
								return (<img src={icons.Enhancement} alt="Enhancement" />)
							case "Task":
								return (<img src={icons.Task} alt="Task" />)
							case "Redesign":
								return (<img src={icons.Redesign} alt="Redesign" />)
							default:
								return (
									<h2>{tag}</h2>
								)
							}	
						}
					)()}
					{(() => {
						switch (priority) {
							case "Standard":
								return (<img src={icons.ArrowGreen} alt="Standard Priority"/>)
							case "Medium":
								return (<img className="yellow-arrow" src={icons.ArrowYellow} alt="Medium Priority"/>)
							case "High":
								return (<img className="red-arrow" src={icons.ArrowRed} alt="high Priority"/>)
							default:
								return (
									<h2>{priority}</h2>
								)
							}
						}
					)()}
				</div>
				{
					user === author 
					? <h2 id="author" className={author}>You</h2>
					: <h2 id="author" className={author}>{author}</h2>
				}
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
	min-height: 150px;
	margin: 2% auto;
	border-radius: 4px;
	cursor: pointer;
	border: 1px solid white;
	background: ${pallette.accentColor};
		#title {
			color: #ffffff;
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
					width: 25px;
					&:first-child {
						margin-right: 10px;
					}
				}
			}
			h2 {
				font-size: 14px;
				font-weight: 400;
			}
			#date, #author {
				color: #e4e4e4;
				font-size: 12px;
				font-weight: 400;
			}
		}
		.center-container {
			flex-direction: column;
			#date, #sprint {
				margin-right: auto;
			}
			#sprint {
				margin-top: 6px;
				color: white;
				padding: 0 6px;
				font-size: 12px;
				border-radius: 4px;
			}
		}
	.bottom-container {
		margin-bottom: 0;
	}
	/* author colors */
	.Gibby {
		color: #008ee0;;
	}
	.Moose {
		color: #0dbe7a;
	}
	/* status  styles*/
	#Open {
		color: #00cc00;
	}
	#Reviewing {
		color: #ff4d4d;
	}
	#Underway {
		color: #83b5ff;
	}
	#Completed {
		color: #cccccc;
	}
	.red-arrow, .yellow-arrow {
		transform: rotate(-90deg);
	}
`;
