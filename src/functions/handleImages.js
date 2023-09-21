import axios from "axios"

const API_KEY = process.env.REACT_APP_IMAGE_API_KEY;
const URL = process.env.REACT_APP_IMAGE_API_URL;

export const handleImages = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axios.post(`${URL}`, formData, {
            params: {
                key: `${API_KEY}`,
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200) {
            const imageUrl = response.data.data.url;
            return imageUrl;
        } else {
            console.log(`API Error: ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Error uploading image: ${error.message}`);
        return null;
    }
  }