
// styled
import styled from 'styled-components';

// images
import BugPicture from '../images/bugYaleBlue.png';
import Feature from '../images/featureYaleBlue.png';
import Enhancement from '../images/cog.png';
import arrowUp from "../images/arrowUp.png";
import arrowUpYellow from "../images/arrowUpYellow.png";
import arrowDown from '../images/arrowDown.png';

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


	return (
		<StyledBug className={status}>
			<Link to={`/${projectId}/${bugId}`}>
				<div className="wrapper">
					{(() => {
						switch (tag) {
						case "Bug": return (
							<img src={BugPicture} alt="" />
						)
						case "Feature": return (
							<img src={Feature} alt="" />
						)
						case "Enhancement": return (
							<img src={Enhancement} alt="" />
						)
						default: return (
							<h2>{tag}</h2>
						)
						}
					})()}
					{(() => {
						switch (priority) {
						case "Standard": return (
							<img src={arrowDown} alt="" />
						)
						case "Medium": return (
							<img src={arrowUpYellow} alt="" />
						)
						case "High": return (
							<img src={arrowUp} alt="" />
						)
						default: return (
							<h2>{priority}</h2>
						)
						}
					})()}
				</div>
				<div className="center-wrapper">
					<h2 id="title">{title}</h2>
					<h2 id="date"><span>Updated: </span>{lastUpdate}</h2>
				</div>
				<div className="bottom-wrapper">
					<h2 id={status}>{status}</h2>
					{
						user === author ? (
							<h2 id="author" className={author}><span>Created by: </span>You</h2>
						) : (
							<h2 id="author" className={author}><span>Created by: </span>{author}</h2>
						)
					}
				</div>
			</Link>
		</StyledBug>
	)
}

const StyledBug = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 99%;
max-height: 250px;
min-height: 50px;
margin: 1% auto;
background: #ffffff;
box-shadow: 3px 3px 3px #5252528d;
border-radius: 12px;
cursor: pointer;
	@media (max-width: 750px){
        min-height: 150px;
		margin: 1em 0;
    }
	&:hover{
		transition: 0.2s;
		transform: scale(1.01);
		background: #ffeba8;
	}
	a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: auto;
		height: 100%;
		width: 98%;
		@media (max-width: 750px){
			flex-direction: column;
		}
		.wrapper {
			width: 20%;
			display: flex;
			justify-content: space-between;
			img {
				width: 25px;
			}
			@media (max-width: 750px){
				width: 98%;
				margin: 6px auto;
			}
		}
		h2 {
			width: 15%;
			font-size: 14px;
			color: black;
			display: flex;
			justify-content: center;
			text-align: center;
			@media (max-width: 750px){
				font-size: 12px;
			}
		}
		#title {
			color: black;
		}
		.bottom-wrapper, .center-wrapper {
			display: flex;
			justify-content: space-around;
			width: 98%;
			margin: 10px 0;
			@media (max-width: 750px){
				font-size: 12px;
			}
			#date, #author {
				display: flex;
				flex-direction: column;
				span {
					color: #5f5f5f;
				}
				@media (max-width: 750px){
					font-size: 10px;
				}
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
			color: green;
		}
		#Reviewing {
			color: #d40000;
		}
		#Underway {
			color: #0066ff;
		}
	}
`;
