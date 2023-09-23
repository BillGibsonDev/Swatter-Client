// styled
import styled from 'styled-components';
import * as palette from '../../../../../styled/ThemeVariables.js';

export const ImageSection = ({ images }) => {

    const handleImages = (image, index) => {
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
                        <div key={index}>
                            <a href={image.image} target='_blank' rel='noreferrer'>
                                { handleImages(image, index) }
                            </a>
                        </div>  
                    )
                })
            }
        </StyledImageSection >
    )
}

const StyledImageSection = styled.article`
    display: none;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    margin-top: 20px;
    max-width: 1000px;
    h2 {
        color: ${palette.helperGrey};
        font-size: 1em;
        font-weight: 400;
    }
    a {
        width: 100%;
        max-width: 200px;
        height: 100%;
        img {
            cursor: pointer;
            width: 100%;
            height: 100%;
        }
    }
`;