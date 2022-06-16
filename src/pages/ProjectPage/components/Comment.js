import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables';

export default function Comment({
    comments,
    author,
    date,
    user,
    commentId,
    projectId,
    role,
    setLoading
}) {


    function deleteComment(){
        setLoading(true);
        const result = window.confirm("Are you sure you want to delete?");
        if(result === true){
            axios.post(`${process.env.REACT_APP_DELETE_COMMENT_URL}/${projectId}/${commentId}`)
            .then(function(response) {
                if(response.data !== "Comment Deleted"){
                    setLoading(false);
                    alert("Server Error - Comment not deleted");
                } else {
                    setLoading(false);
                    alert('Comment Deleted!');
                    window.location.reload();
                }
            })
        }
    }

    function unauthorized(){
        alert("You do not have permissions to do that!")
    }

    return (
        <StyledComment>
            <div className="comment-wrapper">
                <div className="title-container">
                    <h3 id={author}>{author}<span>{date}</span></h3>
                    {
                        author === user || role === process.env.REACT_APP_ADMIN_SECRET 
                        ? <button onClick={deleteComment}>&times;</button>
                        : <button onClick={unauthorized}>&times;</button>
                    }
                </div>
                <p>{comments}</p>
            </div>
        </StyledComment>
    )
}

const StyledComment = styled.div`
    display: flex;
    width: 95%;
    margin: 2% auto;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 3px 3px 3px #5252528d;
    position: relative;
    justify-content: space-around;
    .comment-wrapper {
        width: 95%;
        margin: 10px auto;
        .title-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
            margin-bottom: 10px;
            h3 {
                font-size: 14px;
                display: flex;
                align-items: center;
                span {
                    margin-left: 10px;
                    font-size: 11px;
                    color: #575757;
                }
            }
            button {
                font-size: 30px;
                height: 30px;
                width: 30px;
                cursor: pointer;
                background: none;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
            }
        }
        #Gibby{
            color: #008ee0;
        }
        #Moose{
            color: #0dbe7a;
        }
        p {
            font-size: ${pallette.paraSize};
            @media (max-width: 700px){
                font-size: 14px;
            }
        }
    }
`;