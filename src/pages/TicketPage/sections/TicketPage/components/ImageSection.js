// styled
import styled from 'styled-components';
import * as palette from '../../../../../styled/ThemeVariables.js';

export const ImageSection = ({ images, handleModal }) => {

    const handleImages = (image, index) => {
        if(!image.image){
            return <h2>No Images</h2>;
        } else {
            return <img src={image.image} onClick={() => { handleModal(index)} } alt={image.caption}/>
        }
    }

    const handleCaptions = (image) => {
        if(image){
            if(image.caption.length > 50) {
                return <p>{image.caption.slice(0, 50)}...</p>
            } else if(!image.image && !image.caption ){
                return <></>
            } else if (image.caption.length === 0){
                return <p>No Caption</p>
            } else {
                return <p>{image.caption}</p>
            } 
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
                            <div className="image-container">
                                { handleImages(image, index) }
                                { handleCaptions(image) }
                            </div>
                            <div className="modal" id={index}>
                                <button className="close-button" onClick={() => { handleModal(index)} }>&times;</button>
                                <img className="modal-image" src={image.image} alt={image.caption} />
                                <p id="caption">{image.caption}</p>
                            </div>
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
    .image-container {
        width: 100%;
        max-width: 250px;
        height: 100%;
        img {
            cursor: pointer;
            width: 100%;
            height: 80%;
        }
        p {
            padding-top: 6px;
            font-size: 1em;
            text-align: center;
            color: white;
            max-width: 100%;
        }
    }
    .modal {
        display: none; 
        position: fixed; 
        z-index: 1; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        background-color: rgba(0, 0, 0, 0.8); 
        .modal-image {
            margin: 10px auto;
            display: block;
            width: 80%;
            max-width: 700px;
        }
        p {
            display: block;
            width: 80%;
            max-width: 700px;
            text-align: center;
            color: ${palette.helperGrey};
            padding: 10px 0;
            margin: 20px auto;
        }
        .close-button {
            position: absolute;
            top: 15px;
            right: 35px;
            color: #f1f1f1;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            background: none;
            border: none;
        }
    }
    
`;