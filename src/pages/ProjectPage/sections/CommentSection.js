import { useEffect, useState, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as pallette from "../../../styled/ThemeVariables.js";

// components
import Comment from "../components/Comment";
import { Alert } from "../../../components/Alert.js";
import CommentInput from "../components/CommentInput.js";

// router
import { useParams } from "react-router-dom";

//redux
import { connect } from "react-redux";

// functions
import { toggleRef } from "../../../functions/toggleRef.js";

const CommentSection = ({ commentSectionRef, user }) => {

  const { projectId, bugId } = useParams();

  const AlertRef = useRef();

  const [ message, setMessage ] = useState('')
  const [ comments, setComments ] = useState([]);
  const [ isLoading, setLoading ] = useState(false);

  useEffect(() => {
    const getProject = () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getProject(projectId);
  }, [projectId, bugId, user, isLoading]);

  return (
    <StyledCommentSection ref={commentSectionRef} style={{ display: "none" }}>
      <Alert
        message={message}
        AlertRef={AlertRef}
      />
      <div className='comment-section-wrapper'>
        <div className='title-container'>
          <h1>Comments</h1>
          <button id='exit-btn' onClick={() => { toggleRef(commentSectionRef); }}>&times;</button>
        </div>
        {
          comments.length === 0 || !comments 
          ? <h1 style={{ color: "white", textAlign: "center", fontSize: "1.5em" }}>No comments yet..</h1>
          : <div className='comment-container' id='comment-container'>
            {
              comments.map((comment, index) => {
                return (
                  <Comment
                    comment={comment}
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
          AlertRef={AlertRef}
          setLoading={setLoading}
          setMessage={setMessage}
          projectId={projectId}
        />
      </div>
    </StyledCommentSection>
  );
}

const StyledCommentSection = styled.div`
  display: none;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  min-height: 50vh;
  border: 2px white solid;
  position: absolute;
  background: #0000007d;
  z-index: 100;
  border-radius: 12px;
  left: -50px;
  justify-content: center;
  align-items: center;
  padding: 16px;
  @media (max-width: 1440px) {
    width: 100%;
    left: -15px;
  }
  @media (max-width: 834px) {
    top: 0;
    left: -80px;
    margin: 0;
    width: 100vw;
    height: 100%;
    border-radius: 0;
  }
  @media (max-width: 428px) {
    left: -60px;
    padding: 10px;
  }
  .comment-section-wrapper {
    display: flex;
    width: 60%;
    min-height: 70vh;
    border-radius: 12px;
    flex-direction: column;
    background: ${pallette.accentColor};
    @media (max-width: 834px) {
      width: 80%;
      height: 50%;
      justify-content: flex-start;
    }
    @media (max-width: 428px) {
      width: 100%;
      height: 100%;
    }
    .title-container {
      display: flex;
      width: 95%;
      justify-content: space-between;
      align-items: center;
      margin: 10px auto 20px auto;
      h1 {
        color: #ffffff;
      }
      #exit-btn {
        background: none;
        border: none;
        font-size: 30px;
        color: white;
        position: relative;
        cursor: pointer;
      }
    }
    .comment-container {
      min-height: 65vh;
      max-height: 65vh;
      overflow-y: auto;
      @media (max-width: 428px) {
        max-height: 80%;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CommentSection);