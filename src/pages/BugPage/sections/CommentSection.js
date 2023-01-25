import { useState, useEffect } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables.js";

// components
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput.js";

export const CommentSection = ({ bugId, projectId, setLoading, AlertRef, DeleteAlertRef }) => {

  const [ comments, setComments ] = useState([]);

  useEffect(() => {
    const getComments = (projectId, bugId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_BUG_URL}/${projectId}/${bugId}`)
      .then((response) => {
        setComments(response.data.bugs[0].comments);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getComments(projectId, bugId);
  }, [projectId, bugId, setLoading]);

  return (
    <StyledBugCommentSection className='bug-page-tabs active' id='comments'>
      <div className='comment-section-wrapper'>
        {
          comments.length === 0 
          ? <h2>No comments yet..</h2>
          : 
            <div className='comment-container' id='bug-comment-container'>
              {
                comments.map((comment, index) => {
                  return (
                    <Comment
                      comment={comment}
                      bugId={bugId}
                      projectId={projectId}
                      key={index}
                      setLoading={setLoading}
                    />
                  );
                })
              }
            </div>
        }
        <CommentInput
          bugId={bugId}
          projectId={projectId}
        />
      </div>
    </StyledBugCommentSection>
  );
}

const StyledBugCommentSection = styled.div`
  width: 40%;
  margin: 20px 0;
  height: 100%;
  min-height: 30vh;
  @media (max-width: 1440px) {
  }
  @media (max-width: 834px) {
    width: 70%;
  }
  @media (max-width: 428px) {
    width: 100%;
  }
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
    .comment-maker {
      margin: 20px 0;
      display: flex;
      justify-content: center;
      textarea {
        border-radius: 4px 0 0 4px;
        background: #d6d6d6;
        padding: 6px;
        min-height: 20px;
        height: auto;
        width: 100%;
        max-width: 500px;
        max-height: 50px;
        font-size: 12px;
        @media (max-width: 834px) {
          width: 300px;
        }
        @media (max-width: 428px) {
          width: 250px;
          height: 30px;
        }
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
        @media (max-width: 428px) {
          width: 80px;
        }
      }
    }
  }
`;