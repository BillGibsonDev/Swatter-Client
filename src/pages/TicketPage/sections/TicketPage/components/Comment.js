import { marked } from "marked";

// styled
import styled from "styled-components";
import * as palette from "../../../../../styled/ThemeVariables";

// functions
import { handleDeleteAlert } from "../../../../../functions/handleDeleteAlert";
import { handleElapsedTime } from "../../../../../functions/handleDates";

// redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Comment = ({ comment, DeleteAlertRef, user, setCommentId }) => {
  
  return (
    <StyledComment>
      <div className='comment-wrapper'>
        <h3 id={comment.user}>{comment.user}<span>{handleElapsedTime(comment.date)}</span><span>{comment.edited ? 'Edited' : null}</span></h3>
        <div className="comment-text-container" dangerouslySetInnerHTML={{  __html: marked(comment.comment)}}></div>
        <div className="link-container">
          <button disabled={user.username !== comment.user} onClick={() => { setCommentId(comment._id); handleDeleteAlert(DeleteAlertRef);}}>Delete</button>
        </div>
      </div>
    </StyledComment>
  );
}

const StyledComment = styled.article`
  display: flex;
  width: auto;
  height: auto;
  justify-content: space-around;
  border: ${palette.accentBorder1px};
  border-radius: ${palette.borderRadius};
  background: ${palette.helperGrey};
  &:not(:first-child){
    margin: 4px auto;
  }
  .comment-wrapper {
    width: 95%;
    margin: 6px auto;
    h3 {
      font-size: .8em;
      display: flex;
      align-items: center;
      color: black;
      font-weight: 700;
      span {
        margin-left: 10px;
        font-size: .8em;
        color: ${palette.accentColor};
      }
    }
    .comment-text-container {
      p {
        font-size: .8em;
        font-weight: 400;
        margin-bottom: 12px;
        color: black;
        word-wrap: break-word;
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
        color: black;
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