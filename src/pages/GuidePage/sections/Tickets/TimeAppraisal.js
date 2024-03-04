import styled from "styled-components";
import * as palette from '../../../../styled/ThemeVariables.js';

// functions
import { handleTimeAppraisal } from "../../../ProjectPage/components/TicketFunctions.js";

export const TimeAppraisal = () => {
  return (
    <StyledArticle>
        <div className="time-title-container">
            <h3>Ticket Time Appraisals</h3>
            <p>If a user wishes to add a time appraisal to a ticket, <em>i.e. this ticket will take X amount of time</em>, they can add it to the created ticket or add it later. Keep in mind that also sprints are also available for large issues. A sprint would help break up large issues into smaller bit sized pieces.</p>
        </div>
        <div className="time-container">
            <div className="dot-container">
                <div className="time-appraisal" style={{backgroundColor: handleTimeAppraisal('Unknown')}}></div>
            </div>
            <div className="time-text-container">
                <h6>Unknown</h6>
                <p>Unknown is the default value for time appraisals. If the user does not specify a time, an 'Unknown' value is entered automatically.</p>
            </div>
        </div>
        <div className="time-container">
            <div className="dot-container">
                <div className="time-appraisal" style={{backgroundColor: handleTimeAppraisal('Minor')}}></div>
            </div>
            <div className="time-text-container">
                <h6>Minor</h6>
                <p>A Minor time appraisal is added to a ticket when the user estimates that the ticket will take no more than a few hours or less of development time. An example could be change the color of a button or size of a paragraph.</p>
            </div>
        </div>
        <div className="time-container">
            <div className="dot-container">
                <div className="time-appraisal" style={{backgroundColor: handleTimeAppraisal('Moderate')}}></div>
            </div>
            <div className="time-text-container">
                <h6>Moderate</h6>
                <p>This time appraisal is given to a ticket that will take several hours or days to complete. An example could be adding a new component or reworking a page.</p>
            </div>
        </div>
        <div className="time-container">
            <div className="dot-container">
                <div className="time-appraisal" style={{backgroundColor: handleTimeAppraisal('Major')}}></div>
            </div>
            <div className="time-text-container">
                <h6>Major</h6>
                <p>A 'Major' time appraisal is applied to a large ticket, something that the user estimates that will take longer than a week to develop. Examples could be redesigning a application or several pages.</p>
            </div>
        </div>
    </StyledArticle>
  )
}

const StyledArticle = styled.article`
  position: relative;
  margin-top: 50px;
  .time-title-container {
    margin-bottom: 1em;
    h3 {
        color: ${palette.titleColor};
        font-size: ${palette.titleSize};
    }
    p {
        font-size: ${palette.paraSize};
    }
  }
  .time-container {
    display: flex;
    margin-bottom: 1em;
    .dot-container {
        display: flex;
        height: 100%;
        margin: 6px 10px 0 0;
        .time-appraisal {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
    }
    .time-text-container {
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