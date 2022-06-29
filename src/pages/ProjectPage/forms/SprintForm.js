import { useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
//import * as pallette from '../../styled/ThemeVariables';

// images
import X from '../../../assets/icons/whiteX.png';

export const SprintForm = ({
    projectId, 
    sprintForm,
    toggleSprintForm,
    rerender,
    setRerender,
    role, 
    confirmRole
}) => {

    const [title, setTitle ] = useState('');
    const [ goal, setGoal ] = useState('');
    const [ endDate, setEndDate ] = useState('');
    const [ color, setColor ] = useState('')

    function unauthorized() {
        alert("You do not have permissions to do that!")
    }

    const handleSprintForm = () => {
        axios.post(`${process.env.REACT_APP_CREATE_SPRINT_URL}/${projectId}`, {
            projectId: projectId,
            goal: goal,
            title: title,
            endDate: endDate,
            color: color,
        })
        .then(function(response) {
            if(response.data !== "Sprint Created"){
                alert("Server Error - Sprint not created");
            } else {
                alert('Sprint Created!');
                setRerender(!rerender);
            }
        })
        .catch(function(response){
            console.log(response);
        })
    }

    return (
        <StyledSprintForm ref={sprintForm} style={{display: "none"}}>
            <h2>New Sprint</h2>
            <button id="exit-btn" onClick={() => {toggleSprintForm()}}><img id="exit-btn-icon" src={X} alt="Exit" /><span className="tooltiptext">Close</span></button>
            <label>Title 
                <input 
                    type="text"
                    id="title"
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }} 
                />
            </label>
             <label>Goal 
                <textarea
                    type="text"
                    id="goal"
                    onChange={(event) => {
                        setGoal(event.target.value);
                    }} 
                />
            </label>
             <label>End Date 
                <input 
                    type="date"
                    id="end-date"
                    onChange={(event) => {
                        setEndDate(event.target.value);
                    }} 
                />
            </label>
            <label>Color Code
                <input
                defaultValue={"#000000"}
                    type="text"
                    id="color-code"
                    onChange={(event) => {
                        setColor(event.target.value);
                    }} 
                />
            </label>
            {
                role === process.env.REACT_APP_USER_SECRET || role === process.env.REACT_APP_ADMIN_SECRET 
                ? <button onClick={()=>{confirmRole(); handleSprintForm();}}>Save</button>
                : <button onClick={unauthorized}>Save</button>
            }
        </StyledSprintForm>
    )
}

const StyledSprintForm = styled.div`
    height: 100%;
    width: 100%;
    max-width: 500px;
    max-height: 300px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100px;
    left: 10px;
    z-index: 1003;
    background: grey;
    border-radius: 8px;
    h2 {
        margin: 10px auto;
    }
     #exit-btn-icon {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
    .tooltiptext {
        visibility: hidden;
        width: 100%;
        min-width: 160px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1000;
        top: 0;
        right: 105%;
    }
    #exit-btn:hover .tooltiptext, #exit-btn:active .tooltiptext {
        visibility: visible;
        transition-delay: 1s;
    }
    label {
        display: flex;
        margin: auto;
        select, input, textarea {
            margin-left: 6px;
            padding: 2px 4px;
        
        }
    }
    button {
        cursor: pointer;
    }

`;