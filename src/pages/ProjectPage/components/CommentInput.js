import axios from "axios";

// styled
import styled from "styled-components";

// functions
import { handleAlert } from "../../../functions/handleAlert";

//redux
import { connect } from "react-redux";

const CommentInput = ({ user, setLoading, AlertRef, setMessage, projectId }) => {

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
        if (response.data !== "Comment Created") {
          setLoading(false);
          setMessage("Server Error - Comment not created!");
          handleAlert(AlertRef);
        } else {
          setLoading(false);
          document.getElementById("comment").value = "";
          let container = document.getElementById("comment-container");
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
            user.role === process.env.REACT_APP_ADMIN_SECRET || process.env.REACT_APP_USER_SECRET 
            ? <button onClick={() => { sendComment(); }}>Send</button>
            : <button>Send</button>
        }
    </StyledCommentInput>
  );
}

const StyledCommentInput = styled.div`
    margin: 10px;
    display: flex;
    justify-content: center;
    textarea {
        border-radius: 4px 0 0 4px;
        background: #d6d6d6;
        padding: 6px;
        min-height: 20px;
        height: auto;
        max-width: 500px;
        width: 100%;
        max-height: 50px;
        font-size: 12px;
    }
    button {
        margin: 0;
        width: 100px;
        cursor: pointer;
        color: #0f4d92;
        background: white;
        border: none;
        border-radius: 0 4px 4px 0;
        font-size: 14px;
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