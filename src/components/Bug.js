
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
	date,
	priority,
	author,
	status,
	role,
	tag,
	lastUpdate,
	lastLogin,
	user
}) {


	return (
		<StyledBug className={status}>
			<Link to={`/${projectId}/${bugId}`}>
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
				<h2 id="title">{title}</h2>
				<h2 id="date"><span>Updated: </span>{lastUpdate}</h2>
				<h2 id={status}>{status}</h2>
				{
					user === author ? (
						<h2 id="author" className={author}><span>Created by: </span>You</h2>
					) : (
						<h2 id="author" className={author}><span>Created by: </span>{author}</h2>
					)
				}
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
		img {
			width: 25px;
		}
		h2 {
			width: 15%;
			font-size: 14px;
			color: black;
			display: flex;
			justify-content: center;
			text-align: center;
		}
		#title {
			color: black;
		}
		#date, #author {
			display: flex;
			flex-direction: column;
			span {
				color: #5f5f5f;
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
