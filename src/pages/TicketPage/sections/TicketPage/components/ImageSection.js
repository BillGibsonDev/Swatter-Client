// styled
import styled from 'styled-components';
import * as palette from '../../../../../styled/ThemeVariables.js';

export const ImageSection = ({ images }) => {

    const handleImages = (image) => {
        if(!image.image){
            return <h2>No Images</h2>;
        } else {
            return <img src={image.image} alt='' />
        }
    }

    if(images.length === 0){
        <StyledImageSection>
            <h2>No images yet..</h2>
        </StyledImageSection>
    }

    return (
        <StyledImageSection className='ticket-page-tabs' id="images">
            { 
                images.map((image, index) => {
                    return (
                        <a href={image.image} target='_blank' rel='noreferrer' key={index}>
                            { handleImages(image) }
                        </a> 
                    )
                })
            }
        </StyledImageSection>
    )
}

const StyledImageSection = styled.article`
    display: none;
    flex-wrap: wrap;
    margin: 0;
    padding: 2px;
    border: ${palette.greyBorder};
    border-radius: ${palette.borderRadius};
    a {
        width: 100%;
        max-width: 250px;
        height: 100%;
        cursor: pointer;
        padding: 2px;
        margin: 4px;
        border: ${palette.greyBorder};
        border-radius: ${palette.borderRadius};
        img {
            width: 100%;
            height: 100%;
        }
    }
`;