// styled
import styled from 'styled-components';

export default function SettingsPage() {
    return (
        <StyledSettingsPage>
            <h1>Welcome you've reached the settings page.</h1>
            <h2>You may notice it is empty.</h2>
            <h2>Settings page is currently under construction :)</h2>
        </StyledSettingsPage>
    )
}

const StyledSettingsPage = styled.div`
background: #fff;
min-height: 80vh;
border-radius: 20px;
width: 90%;
margin: auto;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;