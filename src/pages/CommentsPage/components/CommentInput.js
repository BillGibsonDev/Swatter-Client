import { useState } from "react";
import axios from "axios";
import * as Yup from 'yup';

// styled
import styled from "styled-components";

//redux
import { connect } from "react-redux";
import { showAlert } from "../../../redux/actions/alert";

const CommentInput = ({ user, setLoading, projectId, CommentContainerRef, setComments, showAlert }) => {

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
        axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/comments/create`,
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
            setComments(response.data);
            setComment('');
            setLoading(false);
            document.getElementById("comment").value = "";
            let container = CommentContainerRef.current;
            if(container){
              setTimeout(() => {
                container.scrollTo(0, document.body.scrollHeight);
              }, 1000);
            }
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
      <button onClick={(event) => { sendComment(event); }}>Send</button>
    </StyledCommentInput>
  );
}

const StyledCommentInput = styled.div`
  margin: auto 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  textarea {
    background: #d6d6d6;
    padding: 6px;
    height: auto;
    width: 100%;
    max-width: 500px;
    font-size: .8em;
  }
  button {
    margin-top: 10px;
    width: 100%;
    max-width: 500px;
    min-height: 30px;
    cursor: pointer;
    color: #0f4d92;
    background: white;
    border: none;
    font-size: .8em;
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