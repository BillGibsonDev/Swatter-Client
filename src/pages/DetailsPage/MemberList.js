import axios from "axios";

import styled from "styled-components";
import { StyledButton } from "../../styled/StyledButton";
import * as palette from '../../styled/ThemeVariables.js'

// components
import { AddMember } from "./sections/AddMember";

export const MemberList = ({ user, members, projectId, addingMember, setAddingMember, setMembers }) => {

    const removeMember = (id) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/members/${id}/remove`, {
            memberId: id
        }, 
        {
            headers: {
                Authorization: user.token
            }
        })
        .then((response) => {
            console.log(response);
            setAddingMember(false);
            setMembers(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    };

  return (
    <StyledArticle>
        <h2>Member List</h2>
        <div className="member-list-wrapper">
            {
                !members || members.length < 1 ? <h3>No Members yet</h3>
                : members.map((member, index) => {
                    return (
                        <div className="member-container" key={index}>
                            <h4>{member.username}</h4>
                            <button onClick={() => removeMember(member.memberId)}>Trash can here</button>
                        </div>
                    )
                })
            }
        </div>
        {
            addingMember ? <AddMember user={user} setAddingMember={setAddingMember} projectId={projectId} setMembers={setMembers}/>
            : <StyledButton id="add-member-btn" onClick={() => { setAddingMember(!addingMember)}}>Add Member</StyledButton>
        }
    </StyledArticle>
  )
}

const StyledArticle = styled.article`
    width: 100%;
    max-width: 450px;
    margin: 10px 0 0 6px;
    h2 {
        color: ${palette.helperGrey};
        font-size: 1em;
    }
    .member-list-wrapper {
        border: ${palette.whiteBorder2px};
        width: 100%;
        max-width: 450px;
        height: 200px;
        overflow-y: scroll;
        h3 {
            width: 100%;
            color: white;
            text-align: center;
        }
        .member-container {
            display: flex;
            align-items: center;
            width: 95%;
            background: white;
            margin: 4px auto;
            height: 30px;
            h4 {
                color: black;
                padding: 6px;
                margin-right: auto;
            }
            button {
                margin-right: 6px;
            }
        }
    }
`;

