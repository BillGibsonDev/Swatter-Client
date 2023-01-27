import axios from "axios";

// styled
import styled from "styled-components";

// functions
import { handleAlert } from "../../../../../functions/handleAlert";

//redux
import { connect } from "react-redux";
import { handleUserAuth } from "../../../../../functions/handleUserAuth";

const CommentInput = ({ user, setLoading, AlertRef, setMessage, projectId, bugId, CommentContainerRef }) => {

  const sendComment = () => {
    if (!document.getElementById("comment").value) {
      setLoading(false);
      setMessage("No Comment Entered!");
      handleAlert(AlertRef);
    } else {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_BUG_COMMENT_URL}/${projectId}/${bugId}/comments`,
        {
          projectId: projectId,
          bugId: bugId,
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
          let container = CommentContainerRef.current;
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
    max-width: 500px;
    width: 100%;
    font-size: 1em;
  }
  button {
    margin: 0;
    margin-top: 4px;
    width: 100%;
    max-width: 500px;
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

export default connect(mapStateToProps)(CommentInput);