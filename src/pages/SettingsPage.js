// styled
import styled from 'styled-components';

export default function SettingsPage() {
    return (
        <StyledSettingsPage>
            <h1>im a Settings page, bruv</h1>
        </StyledSettingsPage>
    )
}

const StyledSettingsPage = styled.div`
background: #fff;
min-height: 80vh;
border-radius: 20px;
width: 90%;
margin: auto;
`;