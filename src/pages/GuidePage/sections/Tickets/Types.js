import styled from "styled-components";
import * as palette from '../../../../styled/ThemeVariables.js';

import { HandleIcons } from "../../../../functions/handleIcons.js";

export const Types = () => {
  return (
    <StyledArticle>
        <div className="types-title-container">
            <h3 id="Creating-Tickets">Types of Tickets</h3>
            <p>Tickets have several different types to allow you to categorize, identify and distrubute them efficently. You can distinguish the type of ticket you create by adding a <b>'tag'</b>.</p>
        </div>
        <div className="types-container">
            <div className="image-container">
                <HandleIcons tag={'Bug'} />
            </div>
            <div className="types-text-container">
                <h6>Bug</h6>
                <p>Bugs are errors that are found throughout a project. Typically a ticket is categorized as a "bug" when the behavior of a function, style or structure is out of working condition.</p>
            </div>
        </div>
        <div className="types-container">
            <div className="image-container">
                <HandleIcons tag={'Task'} />
            </div>
            <div className="types-text-container">
                <h6>Task</h6>
                <p>Tasks can be a broad type to assign, generally this is assigned to maintanence, writing documentation, etc items.</p>
            </div>
        </div>
        <div className="types-container">
            <div className="image-container">
                <HandleIcons tag={'Redesign'} />
            </div>
            <div className="types-text-container">
                <h6>Redesign</h6>
                <p>A 'Redesign' tag is used for a ticket that requires the design to be alted. This could mean a full redesign or a different impletation.</p>
            </div>
        </div>
        <div className="types-container">
            <div className="image-container">
                <HandleIcons tag={'Enhancement'} />
            </div>
            <div className="types-text-container">
                <h6>Enhancement</h6>
                <p>This tag could be used for building off of a current functionality or design.</p>
            </div>
        </div>
        <div className="types-container">
            <div className="image-container">
                <HandleIcons tag={'Feature'} />
            </div>
            <div className="types-text-container">
                <h6>Feature</h6>
                <p>A 'Feature' tag is used for adding features to the project.</p>
            </div>
        </div>
    </StyledArticle>
  )
}

const StyledArticle = styled.article`
  position: relative;
  .types-title-container {
    margin-bottom: 1em;
    h3 {
        color: ${palette.titleColor};
        font-size: ${palette.titleSize};
    }
    p {
        font-size: ${palette.paraSize};
    }
  }
  .types-container {
    display: flex;
    margin-bottom: 1em;
    .image-container {
        margin-right: 10px;
    }
    .types-text-container {
        h6 {
            color: ${palette.titleColor};
            font-size: ${palette.subtitleSize};
        }
        p {
            font-size: ${palette.paraSize};
        }
    }
  }
`;