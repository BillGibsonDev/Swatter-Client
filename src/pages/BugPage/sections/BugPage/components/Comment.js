import { marked } from "marked";

// styled
import styled from "styled-components";
import * as palette from "../../../../../styled/ThemeVariables";

// functions
import { handleDeleteAlert } from "../../../../../functions/handleDeleteAlert";
import { handleAuthor } from "../../../../../functions/handleAuthor";

// images
import * as icon from '../../../../../assets/IconImports.js'

// redux
import { connect } from "react-redux";

const Comment = ({ comment, DeleteAlertRef, user, setCommentId }) => {

  const handleDate = (comment) => {
		let currentDate = new Date();
		let compareDate = currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",");
		const [ commentDate, commentTime ] = comment.date.split(",");
		if(compareDate[0] === commentDate){
			return commentTime;
		} else {
			return commentDate;
		}
	}
  
  const handleCommentAuthor = (author) => {
    if(author === user.username){
      return { margin: "10px 0 10px auto"};
    } else {
      return { margin: "10px auto 10px 0"};
    }
  }

  return (
    <StyledComment style={handleCommentAuthor(comment.author)}>
      <div className='comment-wrapper'>
        <div className='comment-title-container'>
          <h3 id={comment.author}>{comment.author}<span>{handleDate(comment)}</span></h3>
          {
            handleAuthor(comment.author, user) 
            ? <div className='dropdown'>
                <button className='dropbtn'>
                  <img src={icon.Menu} alt='Menu' />
                </button>
                <div className='dropdown-content'>
                  {
                    handleAuthor(comment.author, user)
                    ? <button onClick={() => { setCommentId(comment._id); handleDeleteAlert(DeleteAlertRef); }}>Delete</button>
                    : <button>Delete</button>
                  }
                </div>
              </div>
            : <></>
          }
        </div>
        <div className="comment-text-container" dangerouslySetInnerHTML={{  __html: marked(comment.comment)}}></div>
      </div>
    </StyledComment>
  );
}

const StyledComment = styled.div`
  display: flex;
  max-width: 90%;
  max-width: 500px;
  width: auto;
  height: auto;
  margin: 10px auto;
  background: #dfdfdf;
  border-radius: 4px;
  box-shadow: 3px 3px 3px #5252528d;
  position: relative;
  justify-content: space-around;
  .comment-wrapper {
    width: 95%;
    margin: 10px auto;
    .comment-title-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 20px;
      align-items: center;
      margin-bottom: 10px;
      h3 {
        font-size: .8em;
        display: flex;
        align-items: center;
        span {
          margin-left: 10px;
          font-size: .6em;
          color: #575757;
        }
      }
      .dropdown {
        position: relative;
        display: inline-block;
        .dropbtn {
          color: white;
          font-size: 16px;
          border: none;
          background: none;
          cursor: pointer;
          padding: 0;
          height: 25px;
          width: 25px;
          img {
            height: 25px;
            width: 25px;
          }
        }
        .dropdown-content {
          display: none;
          position: absolute;
          right: 90%;
          top: 0;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
          background: ${palette.helperGrey};
          button {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            border: none;
            background: none;
            cursor: pointer;
            &:hover {
              background: white;
            }
          }
        }
      }
      .dropdown:hover .dropdown-content,
      .dropdown:active .dropdown-content,
      .dropdown:focus .dropdown-content {
        display: block;
      }
      .dropdown:hover .dropbtn,
      .dropdown:active .dropdown-content,
      .dropdown:focus .dropdown-content {
        background-color: ${palette.helperGrey};
      }
    }
    .comment-text-container {
      p {
        margin-bottom: 12px;
      }
    }
    #Gibby {
      color: #008ee0;
    }
    #Moose {
      color: #0dbe7a;
    }
    p {
      font-size: .8em;
      font-weight: 400;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Comment);