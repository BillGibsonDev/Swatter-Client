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
    @media (max-width: 1050px){
        width: 98%;
    }
    h1,h2 {
        @media (max-width: 615px){
            font-size: 1.5em;
        }
        @media (max-width: 505px){
            font-size: 1em;
        }
    }
`;