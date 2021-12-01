
// styled
import styled from 'styled-components';

export default function ChatPage() {
    return (
        <StyledChatPage>
            <h1>im a Chat page, bruv</h1>
        </StyledChatPage>
    )
}

const StyledChatPage = styled.div`
background: #fff;
min-height: 80vh;
border-radius: 20px;
margin: auto;
width: 90%;
`;