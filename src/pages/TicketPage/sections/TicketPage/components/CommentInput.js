import { useState } from "react";
import axios from "axios";
import * as Yup from 'yup';

// styled
import styled from "styled-components";
import { StyledButton } from '../../../../../styled/StyledButton.js';
import * as palette from '../../../../../styled/ThemeVariables.js';

// icons
import ArrowUp from '../../../../../assets/icons/arrowUp.png';

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

  const handleInputChange = (e) => {
    setComment(e.target.value);
    e.target.style.height = 'auto'; // Reset height to auto
    e.target.style.height = e.target.scrollHeight + 'px'; // Set new height based on content
  };


  return (
    <StyledCommentInput>
      <textarea
        placeholder='Add a comment'
        name='comment'
        id='comment'
        rows={1}
        value={comment}
        onChange={(e) => { handleInputChange(e)}}
      />
      {
        window.screen.width > 640 ? <StyledButton onClick={(event) => { sendComment(event)}}>Send</StyledButton>
        :<StyledButton onClick={(event) => { sendComment(event)}}><img src={ArrowUp} alt="Send" /></StyledButton>
      }
    </StyledCommentInput>
  );
}

const StyledCommentInput = styled.article`
  margin: 4px 0;
  width: 100%;
  display: flex;
  textarea {
    background: #d6d6d6;
    padding: 2px;
    height: auto;
    overflow: hidden;
    width: 100%;
    font-size: .8em;
    border-radius: 0;
    border-top-left-radius: ${palette.borderRadius};
    border-bottom-left-radius: ${palette.borderRadius};
    transition: height 0.2s ease-in-out;
    &:focus {
      outline: none;
    }
  }
  button {
    margin: auto 0 0 0;
    height: auto;
    min-height: 35px;
    width: 20%;
    max-width: 100px;
    border-radius: 0;
    border-top-right-radius: ${palette.borderRadius};
    border-bottom-right-radius: ${palette.borderRadius};
    font-size: 1em;
    img {
      width: 25px;
      height: 25px;
      background-color: #fff;
      border-radius: 50%;
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