import { useState } from "react";
import axios from "axios";

// styles
import styled from "styled-components";
import { StyledButton } from "../../../styled/StyledButton";

// redux
import { useDispatch } from 'react-redux';
import { showAlert } from '../../../redux/actions/alert.js';

export const AddMember = ({ user, projectId, setAddingMember, setMembers }) => {

    const dispatch = useDispatch();

    const [ member, setMember ] = useState('');

    const addMember = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/members/add`, {
            username: member
        }, 
        {
            headers: {
                Authorization: user.token
            }
        })
        .then((response) => {
            setAddingMember(false);
            setMembers(response.data);
            dispatch(showAlert("", 'success' ));
        })
        .catch((error) => {
            console.log(error);
            dispatch(showAlert(error, 'error' ));
        })
    };

  return (
    <StyledArticle>
        <label>Username
            <input type="text" id="member" onChange={(e) => setMember(e.target.value)}/>
        </label>
        <StyledButton onClick={() => { addMember() }}>Add Member</StyledButton>
    </StyledArticle>
  )
}

const StyledArticle = styled.article`
    text-align: center;
    margin: 10px 0;
    label {
        font-size: 1em;
        color: white;
        margin: auto;
        input{
            padding: 2px;
            margin-left: 6px;
            max-width: 250px;
        }
    }
`;
