
// styled
import styled from 'styled-components';

export default function ChatPage() {
    return (
        <StyledChatPage>
            <h1>Welcome you've reached the chat page.</h1>
            <h2>You may notice it is empty.</h2>
            <h2>Chat Page is currently under construction :)</h2>
        </StyledChatPage>
    )
}

const StyledChatPage = styled.div`
background: #fff;
min-height: 80vh;
border-radius: 20px;
margin: auto;
width: 90%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;