import { useState } from "react";
import axios from "axios";
import * as Yup from 'yup';

// styled
import styled from "styled-components";
import { StyledButton } from '../../../../../styled/StyledButton.js';

//redux
import { connect } from "react-redux";
import { showAlert } from "../../../../../redux/actions/alert";

const CommentInput = ({ user, setComments, setLoading, projectId, ticketId, CommentContainerRef, showAlert }) => {

  const [ comment, setComment ] = useState('');

  const validationSchema = Yup.object().shape({
    comment: Yup.string()
      .required('A comment is required')
      .min(2, 'Comments must be at least 2 characters')
      .max(240, 'Comments can not exceed 240 characters'),
  });

  const sendComment = (event) => {
    event.preventDefault();
    validationSchema.validate({ comment })
    .then(() => {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/tickets/${ticketId}/comments/create`,
        {
          comment: comment,
        },        
        {
          headers: {
            Authorization: user.token
          }
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setComment('');
          setComments(response.data);
          document.getElementById("comment").value = "";
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
    })
    .catch((validationError) => {
			showAlert(validationError, 'error');
		});
  };

  return (
    <StyledCommentInput>
      <textarea
        placeholder='Add a comment'
        name='comment'
        id='comment'
        onChange={(e) => { setComment(e.target.value)}}
      />
      <StyledButton onClick={(event) => { sendComment(event)}}>Send</StyledButton>
    </StyledCommentInput>
  );
}

const StyledCommentInput = styled.article`
  margin: 4px 0 0 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  textarea {
    background: #d6d6d6;
    padding: 6px;
    min-height: 40px;
    height: auto;
    overflow-y: visible;
    width: 100%;
    font-size: .8em;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  showAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);