// styled
import styled from "styled-components";
import * as palette from "../../../../../styled/ThemeVariables.js";

export const Selector = ({ 
    priority,
    tag,
    status, 
    sprint,
    label, 
    assigned,
    setTag, 
    setPriority, 
    setStatus, 
    setSprint, 
    setAssigned,
    sprintOptions,
    project
}) => {

    let sprints = [];
    const handleSprints = (sprintOptions) => {
        sprintOptions.map((sprint) => {
            return sprints.push(sprint.title)
        })
    }

    const handleLabels = (label) => {
        if (label === 'Tag'){
            return 'Tag';
        } else if(label === 'Priority'){
            return 'Priority';
        } else if(label === 'Status'){
            return 'Status';
        } else if(label === 'Sprint'){
            return "Sprint";
        } else if(label === 'Assigned User'){
            return "Assigned User";
        }
    }

    const handleDefaultValue = (label) => {
        if (label === 'Tag'){
            return tag;
        } else if(label === 'Priority'){
            return priority;
        } else if(label === 'Status'){
            return status;
        } else if(label === 'Sprint'){
            return sprint;
        } else if(label === 'Assigned User'){
            return assigned;
        }
    }

    const ticketTags = [ 'Bug', 'Feature', 'Enhancement', 'Task', 'Redesign'];
    const ticketPriority = [ 'High' ];
    const ticketStatus = [ 'Open', 'Underway', 'Reviewing', 'Completed' ];
    let ticketAssigned = [];

    const handleOptions = (label) => {
        if (label === 'Tag'){
            return ticketTags;
        } else if(label === 'Priority'){
            return ticketPriority;
        } else if(label === 'Status'){
            return ticketStatus;
        } else if(label === 'Sprint'){
            if(!sprintOptions || sprintOptions.length === 0){
                return [];
            } else {
                handleSprints(sprintOptions);
                return sprints;
            }
        } else if(label === 'Assigned User'){
            if(!project.members){
                ticketAssigned.push(project.owner);
                return ticketAssigned;
            } else {
                ticketAssigned.unshift(project.owner);
                return ticketAssigned;
            }
        }
    }

    const handleStateFunction = (label, value) => {
        if (label === 'Tag'){
           setTag(value);
        } else if(label === 'Priority'){
            setPriority(value);
        } else if(label === 'Status'){
            setStatus(value);
        } else if(label === 'Sprint'){
            setSprint(value);
        } else if(label === 'Assigned User'){
            setAssigned(value);
        }
    }

    let Label = handleLabels(label);
    let Options = handleOptions(label);

  return (
    <StyledSelector>{Label}
        <select value={handleDefaultValue(Label)} onChange={(e) => { handleStateFunction(Label, e.target.value);}}>
        {
            Label === 'Sprint' || 'Assigned User' ? <option value=''>None</option> : <></>
        }
        {
            Options.map((options, key) => {
                return (
                    <option value={options} key={key}>{options}</option>
                )
            })
        }
        </select>
    </StyledSelector>
  );
}

const StyledSelector = styled.label`
    display: flex;
    flex-direction: column;
    color: white;
    margin: 10px 0;
    font-weight: 400;
    font-size: ${palette.labelSize};
    width: 100%;
    max-width: 500px;
    select {
        padding: 6px 0;
        cursor: pointer;
        width: 100%;
        font-size: 1em;
        background: ${palette.helperGrey};
        font-weight: 400;
    }
`;