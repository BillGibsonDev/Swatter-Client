import { useEffect, useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// components
import Comment from '../components/Comment';

// router
import { useParams } from 'react-router-dom';
import Loader from '../loaders/Loader';

export default function ProjectsPage({user, role}) {

    const { projectId, bugId } = useParams();

    const [ comments, setComments ] = useState([]);
    const [ addComment, setAddComment] = useState('');
    const [ addAuthor, setAuthor] = useState(user);
    const [ addDate, setAddDate] = useState('');
    const [ isLoading, setLoading ] = useState(false);

    function getProject(){
        axios.get(`${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
        .then(function (response){
            setComments(response.data.comments)
        })
        .catch(function (error) {
            throw error;
        });
    }

    function handleDate(){
        const current = new Date();
        const date = `${current.getHours()}:${current.getMinutes()} - ${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
        setAddDate(date);
    }
    
    useEffect(() =>{
        getProject(projectId);
        handleDate();
        setAuthor(user);
        // eslint-disable-next-line
    }, [ projectId, bugId, user ]);

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
                isLoading === true ? (
                    <Loader />
                ) : (
                    <div className="comment-maker">
                        <textarea 
                            name="comment" 
                            id="comment" 
                            cols="30" 
                            rows="2"
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
            { 
                comments === undefined ? (
                    <div className="undefined">
                        <h1>You've havent entered any comments</h1>
                    </div>
                ) : (
                    <>
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
                                    />
                                )
                            })
                        }
                    </>
                )
            }

        </StyledCommentSection>
    )
}

const StyledCommentSection = styled.div`
width: 98%;
margin: 2% auto;
max-height: 60vh;
border-radius: 12px;
background: #64a5f0;
position: relative;
overflow-y: scroll;
    .undefined {
        width: 98%;
    }
    h1 {
        width: 95%;
        margin: auto;
        color: black;
    }
    .comment-maker {
        width: 98%;
        margin: auto;
        display: flex;
        flex-direction: column;
        textarea {
            border-radius: 6px;
            background: #d6d6d6;
            padding: 2px;
        }
        button {
            margin: 1% auto;
            width: 150px;
            cursor: pointer;
            color: white;
            background: #0f4d92;
            border: none;
            border-radius: 6px;
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
`;