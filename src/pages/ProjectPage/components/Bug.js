import { useState, useEffect } from 'react';
// styled
import styled from 'styled-components';

// images
import BugPicture from '../../../assets/icons/bugYaleBlue.png';
import Feature from '../../../assets/icons/featureYaleBlue.png';
import Enhancement from '../../../assets/icons/cog.png';
import arrowUp from "../../../assets/icons/arrowUp.png";
import arrowUpYellow from "../../../assets/icons/arrowUpYellow.png";
import arrowDown from '../../../assets/icons/arrowDown.png';
import Task from '../../../assets/icons/taskIcon.png';
import Redesign from '../../../assets/icons/design0f4d92.png';

// router
import { Link } from 'react-router-dom';

export default function Bug({
    projectId,
    bugId,
    title,
    priority,
    author,
    status,
    tag,
    lastUpdate,
    user
}) {

	const [ compareDate, setCompareDate] = useState("");

	useEffect(() => {
	  const handleDate = () => {
		const currentDate = new Date();
		setCompareDate( currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
	  }
	  handleDate();
	}, [])
	
	const [ currentDate ] = compareDate.split(",");
	const [ bugDate, bugTime ] = lastUpdate.split(",");

    return (
        <StyledBug className={status} style={{ display: status === "Completed" ? "none": ""}}>
            <Link to={`/${projectId}/${bugId}`}>
                <div className="wrapper">
                    {(() => {
                        switch (tag) {
                            case "Bug":
                                return (<img src={BugPicture} alt=""/>)
                            case "Feature":
                                return (<img src={Feature} alt=""/>)
                            case "Enhancement":
                                return (<img src={Enhancement} alt=""/>)
                            case "Task":
                                return (<img src={Task} alt=""/>)
							case "Redesign":
                                return (<img src={Redesign} alt=""/>)
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
                                return (<img src={arrowDown} alt=""/>)
                            case "Medium":
                                return (<img src={arrowUpYellow} alt=""/>)
                            case "High":
                                return (<img src={arrowUp} alt=""/>)
                            default:
                                return (
                                    <h2>{priority}</h2>
                                )
                        	}
                    	}
					)()}
                </div>
                <div className="center-wrapper">
                    <h2 id="title">{title}</h2>
                    <h2 id="date"><span>Updated:</span>
						{
							currentDate === bugDate 
							? bugTime
							: lastUpdate
						}
					</h2>
                </div>
                <div className="bottom-wrapper">
                    <h2 id={status}>{status}</h2>
                    {
						user === author 
						? <h2 id="author" className={author}><span>Created by:</span>You</h2>
						: <h2 id="author" className={author}><span>Created by:</span>{author}</h2>
					}
                </div>
            </Link>
        </StyledBug>
    )
}

const StyledBug = styled.div `
	display: flex;
	justify-content: center;
	width: 99%;
	max-height: 250px;
	min-height: 50px;
	margin: 2% auto;
	border-radius: 4px;
	cursor: pointer;
	border: 1px solid white;
	@media (max-width: 750px){
        min-height: 150px;
		margin: 20px 0;
    }
	&:hover{
		transition: 0.2s;
		transform: scale(1.01);
	}
	a {
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		height: 100%;
		width: 98%;
		@media (max-width: 750px){
			flex-direction: column;
		}
		.wrapper {
			width: 10%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			img {
				width: 25px;
			}
			@media (max-width: 750px){
				width: 98%;
				margin: 6px auto;
			}
		}
		h2 {
			font-size: 14px;
			color: #ffffff;
			display: flex;
			width: 50%;
			@media (max-width: 750px){
				font-size: 14px;
				width: 90%;
				margin: auto;
			}
		}
		#title {
			color: #ffffff;
		}
		.bottom-wrapper, .center-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 30%;
			@media (max-width: 750px){
				font-size: 14px;
				width: 90%;
				margin: auto;
			}
			#date, #author {
				display: flex;
				justify-content: center;
				flex-direction: column;
				span {
					color: #c2c2c2;
				}
				@media (max-width: 750px){
					font-size: 12px;
					justify-content: left;
				}
			}
		}
		.center-wrapper {
			margin: 0 10px;
			width: 50%;
			@media (max-width: 750px){
				font-size: 14px;
				width: 90%;
				margin: 0 auto;
				margin-bottom: 10px;
			}
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
	}
`;
