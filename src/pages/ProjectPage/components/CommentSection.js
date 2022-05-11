import { useEffect, useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// components
import Comment from '../components/Comment';

// router
import { useParams } from 'react-router-dom';

// loader asset
import Loader from '../../../loaders/Loader';

export default function ProjectsPage({user, role}) {

    const { projectId, bugId } = useParams();

    const [ comments, setComments ] = useState([]);
    const [ addComment, setAddComment] = useState('');
    const [ addAuthor, setAuthor] = useState(user);
    const [ addDate, setAddDate] = useState('');
    const [ isLoading, setLoading ] = useState(false);

    function handleDate(){
        const current = new Date();
        const date = `${current.getHours()}:${current.getMinutes()} - ${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
        setAddDate(date);
    }

    useEffect(() =>{
        function getProject(){
            axios.get(`${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
            .then(function (response){
                setComments(response.data.comments)
            })
            .catch(function (error) {
                throw error;
            });
        }
        getProject(projectId);
        handleDate();
        setAuthor(user);
    }, [ projectId, bugId, user, isLoading ]);

    function sendComment() {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_SEND_COMMENT_URL}/${projectId}/comments`, {
            projectId: projectId,
            comment: addComment,
            date: addDate,
            author: addAuthor,
        })
        .then(function(response) {
            if(response.data !== "Comment Created"){
                setLoading(false);
                alert("Server Error - Comment not created!");
            } else {
                setLoading(false);
            }
        })
    }

    function unauthorized(){
        alert("You do not have permissions to do that!")
    }

    return (
        <StyledCommentSection>
            <h1>Comments</h1>
            { 
                comments === undefined ? (
                    <div className="undefined">
                        <h1>You've havent entered any comments</h1>
                    </div>
                ) : (
                    <div className="comment-container">
                        {
                            comments.slice().reverse().map((comment, key) => {
                                return (
                                    <Comment
                                        date={comment.date}
                                        author={comment.author}
                                        comments={comment.comment}
                                        commentId={comment._id}
                                        user={user}
                                        projectId={projectId}
                                        key={key}
                                        role={role}
                                        setLoading={setLoading}
                                    />
                                )
                            })
                        }
                    </div>
                )
            }
            {
                isLoading === true ? (
                    <Loader />
                ) : (
                    <div className="comment-maker">
                        <textarea 
                            name="comment" 
                            id="comment" 
                            required
                            onChange={(event) => {
                                setAddComment(event.target.value);
                            }}  
                        />
                        {
                            role === process.env.REACT_APP_GUEST_SECRET ? (
                                <button onClick={()=> { unauthorized();}}>Send</button>
                            ) : (
                                <button onClick={()=> { handleDate(); sendComment();}}>Send</button>
                            )
                        }
                    </div>
                )
            }
        </StyledCommentSection>
    )
}

const StyledCommentSection = styled.div`
    width: 100%;
    margin: 20px auto;
    min-height: 20vh;
    position: relative;
    border: 2px white solid;
    .undefined {
        width: 98%;
    }
    h1 {
        width: 95%;
        margin: auto;
        color: #ffffff;
    }
    .comment-maker {
        width: 60%;
        margin: 10px auto;
        display: flex;
        flex-direction: column;
        @media (max-width: 750px){
            width: 90%;
        }
        textarea {
            border-radius: 4px;
            background: #d6d6d6;
            padding: 10px;
            min-height: 10vh;
        }
        button {
            margin: 20px auto 0 auto ;
            width: 150px;
            cursor: pointer;
            color: #0f4d92;
            background: white;
            border: none;
            border-radius: 4px;
            font-size: 1.2em;
            font-weight: 700;
            @media (max-width: 750px){
                font-size: 1.5em;
            }
            &:hover {
                transform: scale(1.05);
                transition: 0.2s;
                background: #d1d1d1;
                color: black;
            }
        }
    }
    .comment-container {
        max-height: 40vh;
        overflow-y: scroll;
    }
`;