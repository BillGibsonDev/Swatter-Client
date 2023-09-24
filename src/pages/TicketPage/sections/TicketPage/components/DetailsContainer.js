// styled
import styled from "styled-components";
import * as palette from '../../../../../styled/ThemeVariables.js';

// icons
import * as icons from '../../../../../assets/IconImports.js';

export const DetailsSection = ({ ticket, setEditing }) => {

  const handleTagImage = (tag) => {
		switch (tag) {
		case "Bug":
			return icons.TicketPicture;
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

  const handleTicketPriorityImage = (priority) => {
		switch (priority) {
		case "High":
			return icons.ArrowRed;
		default:
			return '';
		};
	}

  return (
    <StyledArticle>
        <h3><span><img src={handleTagImage(ticket.tag)} alt="Tag" /></span>{ticket.tag}</h3>
        {
            ticket.priority ? <h3><span><img src={handleTicketPriorityImage(ticket.priority)} alt="Priority" /></span> {ticket.priority}</h3>
            : <></>
        }
        <h3>{ticket.status}</h3>
        {
            ticket.sprint ? <h3><span><img src={icons.Sprints} alt="Sprint" /></span>{ticket.sprint}</h3>
            : <></>
        }
        {
            ticket.link ? <a href={ticket.link} target="_blank" rel="noreferrer"><img src={icons.Link} alt="Link" /></a>
            : <></>
        }
        <button id="edit-btn" onClick={() => setEditing(true)}><span><img src={icons.Edit} alt="" /></span>Edit</button>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
    height: 100%;
    margin: 4px 0 0 0;
    display: flex;
    flex-wrap: wrap;
    #edit-btn {
        cursor: pointer;
        transition: 0.2s;
        &:hover {
            background: black;
        }
    }
    h3, button {
        border: none;
        color: #ffffff;
        background: ${palette.accentColor};
        font-size: .8em; 
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        padding: 2px 8px;
        height: 28px;
        border-radius: 4px;
        margin: 0 2px;
        span {
            color: ${palette.helperGrey};
            font-weight: 400;
            margin-right: 6px;
            width: 20px;
            height: 20px;
            img {
                width: 20px;
                height: 20px;
            }
        }
    }
`;