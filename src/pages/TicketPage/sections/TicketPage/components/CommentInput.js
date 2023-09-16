import { useState } from "react";
import axios from "axios";
import * as Yup from 'yup';

// styled
import styled from "styled-components";

//redux
import { connect } from "react-redux";
import { showAlert } from "../../../../../redux/actions/alert";

const CommentInput = ({ user, setComments, setLoading, projectId, ticketId, CommentContainerRef, showAlert }) => {

  const [ comment, setComment ] = useState('');

  const validationSchema = Yup.object().shape({
    comment: Yup.string()
      .required('A comment is required')
      .min(6, 'Comments must be at least 6 characters')
      .max(240, 'Comments can not exceed 240 characters'),
  });

  const sendComment = (event) => {
    event.preventDefault();
    validationSchema.validate({ comment })
    .then(() => {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/tickets/${ticketId}/comments`,
        {
          headers: {
            Authorization: user.token
          }
        },
        {
          comment: comment,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setComment('');
          setComments(response.data);
          document.getElementById("comment").value = "";
          let container = CommentContainerRef.current;
          setTimeout(() => {
            container.scrollTo(0, document.body.scrollHeight);
          }, 1000);
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
      <button onClick={(event) => { sendComment(event)}}>Send</button>
    </StyledCommentInput>
  );
}

const StyledCommentInput = styled.article`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  textarea {
    background: #d6d6d6;
    padding: 6px;
    min-height: 70px;
    height: auto;
    max-width: 550px;
    width: 100%;
    font-size: .8em;
  }
  button {
    margin: 6px auto;
    width: 100%;
    max-width: 350px;
    height: 30px;
    cursor: pointer;
    color: #0f4d92;
    background: white;
    border: none;
    border-radius: 4px;
    font-size: 1em;
    font-weight: 700;
    transition: 0.2s;
    &:hover {
      background: #000000;
      color: white;
    }
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