import { marked } from "marked";

// styled
import styled from "styled-components";
import * as palette from "../../../../../styled/ThemeVariables";

// functions
import { handleDeleteAlert } from "../../../../../functions/handleDeleteAlert";
import { handleDate } from "../../../../../functions/handleDates";

// redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Comment = ({ comment, DeleteAlertRef, user, setCommentId }) => {
  
  return (
    <StyledComment>
      <div className='comment-wrapper'>
        <div className='comment-title-container'>
          <h3 id={comment.user}>{comment.user}<span>{handleDate(comment.date)}</span><span>{comment.edited ? 'Edited' : null}</span></h3>
        </div>
        <div className="comment-text-container" dangerouslySetInnerHTML={{  __html: marked(comment.comment)}}></div>
        <div className="link-container">
          <button disabled={user.username !== comment.user}>Edit</button>
          <button disabled={user.username !== comment.user}>Delete</button>
        </div>
      </div>
    </StyledComment>
  );
}

const StyledComment = styled.div`
  display: flex;
  width: auto;
  height: auto;
  margin: 10px auto;
  position: relative;
  justify-content: space-around;
  border: ${palette.greyBorder};
  border-radius: 4px;
  .comment-wrapper {
    width: 95%;
    margin: 10px auto;
    .comment-title-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 20px;
      align-items: center;
      h3 {
        font-size: .8em;
        display: flex;
        align-items: center;
        color: white;
        span {
          margin-left: 10px;
          font-size: .7em;
          color: ${palette.helperGrey};
        }
      }
      button {
        color: #ff0000;
        padding: 2px;
        border: none;
        background: none;
        cursor: pointer;
        &:hover {
          background: white;
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .comment-text-container {
      p {
        font-size: .8em;
        font-weight: 400;
        margin-bottom: 12px;
      }
    }
    .link-container {
      width: 100px;
      display: flex;
      justify-content: space-between;
      button {
        font-size: .7em;
        border: none;
        background: none;
        cursor: pointer;
        color: ${palette.helperGrey};
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Comment);