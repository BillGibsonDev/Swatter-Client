import axios from "axios";

// styled
import styled from "styled-components";

// functions
import { handleAlert } from "../../../functions/handleAlert";

//redux
import { connect } from "react-redux";
import { handleUserAuth } from "../../../functions/handleUserAuth";

const CommentInput = ({ user, setLoading, AlertRef, setMessage, projectId, CommentContainerRef }) => {

  const sendComment = () => {
    setLoading(true);
    if (!document.getElementById("comment").value) {
      setLoading(false);
      setMessage("No Comment Entered!");
      handleAlert(AlertRef);
    } else {
      axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_SEND_COMMENT_URL}/${projectId}/comments`,
        {
          projectId: projectId,
          comment: document.getElementById("comment").value,
          author: user.username,
        }
      )
      .then((response) => {
        if (response.data !== "Comment created!") {
          setLoading(false);
          setMessage("Server Error - Comment not created!");
          handleAlert(AlertRef);
        } else {
          setLoading(false);
          document.getElementById("comment").value = "";
          let container = CommentContainerRef.current
          setTimeout(() => {
            container.scrollTo(0, document.body.scrollHeight);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setMessage("Server Error - Comment not created!");
        handleAlert(AlertRef);
      })
    }
  };

  return (
    <StyledCommentInput>
      <textarea
        placeholder='Add a comment'
        name='comment'
        id='comment'
      />
      {
        handleUserAuth(user)
        ? <button onClick={() => { sendComment(); }}>Send</button>
        : <button>Send</button>
      }
    </StyledCommentInput>
  );
}

const StyledCommentInput = styled.div`
  margin: 10px;
  width: 90%;
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

export default connect(mapStateToProps)(CommentInput);