import { useState, useEffect, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../../../../../styled/ThemeVariables.js";

// components
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput.js";
import { DeleteAlert } from "../../../../../components/DeleteAlert.js";
import { Alert } from "../../../../../components/Alert.js";

// functions
import { handleAlert } from "../../../../../functions/handleAlert.js";

export const CommentSection = ({ user, bugId, projectId, setLoading }) => {

  const AlertRef = useRef();
  const DeleteAlertRef = useRef();
  const CommentContainerRef = useRef();

  const [ comments, setComments ] = useState([]);
  const [ message, setMessage ] = useState('');
  const [ commentId, setCommentId] = useState();

  useEffect(() => {
    const getComments = (projectId, bugId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_BUG_URL}/${projectId}/${bugId}`)
      .then((response) => {
        setComments(response.data.bugs[0].comments);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getComments(projectId, bugId);
  }, [ projectId, bugId ]);

  const deleteComment = (commentId) => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_DELETE_BUG_COMMENT_URL}/${projectId}/${bugId}/${commentId}`,
      {
        headers: {
          Authorization: user.token
        }
      }
    )
    .then((response) => {
      if (response.data !== "Comment Deleted!") {
        setMessage("Server Error - Comment not deleted");
        handleAlert(AlertRef);
        setLoading(false);
      } else {
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setMessage("Server Error - Comment not deleted");
      handleAlert(AlertRef);
      setLoading(false);
    });
  };

  return (
    <StyledBugCommentSection className='bug-page-tabs active' id='comments'>
      <Alert 
        AlertRef={AlertRef}
        message={message}
      />
      <DeleteAlert
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={deleteComment}
        message={message}
        commentId={commentId}
      />
      <div className='comment-section-wrapper'>
        {
          comments.length === 0 
          ? <h2>No comments yet..</h2>
          : 
            <div className='comment-container' ref={CommentContainerRef}>
              {
                comments.map((comment, index) => {
                  return (
                    <Comment
                      comment={comment}
                      bugId={bugId}
                      projectId={projectId}
                      key={index}
                      AlertRef={AlertRef}
                      setLoading={setLoading}
                      DeleteAlertRef={DeleteAlertRef}
                      setCommentId={setCommentId}
                    />
                  );
                })
              }
            </div>
        }
        <CommentInput
          bugId={bugId}
          projectId={projectId}
          setLoading={setLoading}
          AlertRef={AlertRef}
          setMessage={setMessage}
          CommentContainerRef={CommentContainerRef}
        />
      </div>
    </StyledBugCommentSection>
  );
}

const StyledBugCommentSection = styled.div`
  width: 90%;
  margin: 20px 0;
  height: 100%;
  min-height: 30vh;
  max-width: 550px;
  .comment-section-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 30vh;
    flex-direction: column;
    align-items: center;
    h2 {
      color: ${palette.helperGrey};
      font-size: 1em;
      font-weight: 400;
      margin-right: auto;
    }
    .comment-container {
      width: 100%;
      max-height: 400px;
      overflow-y: auto;
      @media (max-width: 428px) {
        max-height: 40vh;
      }
    }
  }
`;