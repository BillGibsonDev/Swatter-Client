// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables.js";

export const Selector = ({ 
    priority,
    tag,
    status, 
    sprint,
    label, 
    setTag, 
    setPriority, 
    setStatus, 
    setSprint, 
    sprintOptions }) => {

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
        }
    }

    const handleOptions = (label) => {
        if (label === 'Tag'){
            return bugTags;
        } else if(label === 'Priority'){
            return bugPriority;
        } else if(label === 'Status'){
            return bugStats;
        } else if(label === 'Sprint'){
            if(!sprintOptions || sprintOptions.length === 0){
                return [];
            } else {
                handleSprints(sprintOptions);
                return sprints;
            }
        }
    }

    const bugTags = [ 'Bug', 'Feature', 'Enhancement', 'Task', 'Redesign']
    const bugPriority = [ 'Standard', 'Medium', 'High' ]
    const bugStats = [ 'Open', 'Underway', 'Reviewing', 'Completed' ]

    let Label = handleLabels(label);
    const Options = handleOptions(label);

    const handleStateFunction = (label, value) => {
        if (label === 'Tag'){
           setTag(value);
        } else if(label === 'Priority'){
            setPriority(value);
        } else if(label === 'Status'){
            setStatus(value);
        } else if(label === 'Sprint'){
            setSprint(value);
        }
    }

  return (
    <StyledSelector>{Label}:
        <select value={handleDefaultValue(Label)} onChange={(e) => { handleStateFunction(Label, e.target.value);}}>
        {
            Options.map((options, key) => {
                return (
                    <option value={options} key={key}>{options}</option>
                )
            })
        }
        {
            Label === 'Sprint' ? <option value=''>None</option> : <></>
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
    @media (max-width: 450px) {
        margin: 10px 0;
    }
    select {
        padding: 6px 0;
        cursor: pointer;
        width: 100%;
        font-size: 1em;
        background: ${palette.helperGrey};
        font-weight: 400;
        background: white;
    }
`;