import axios from "axios";
axios.defaults.withCredentials = true;
import { toast } from "react-toastify";
const baseUrl = '/api';
export const uploadImage = async (image: File): Promise<void | string> => {
    try {
        const formData = new FormData();
        formData.append('file', image);
        const response = await axios.post(`${baseUrl}/upload-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.status === 200) {
            return response.data.image;
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.error) {
            toast.error(error.response.data.error);
        } else if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error(`An unknown error occurred while uploading image ${error instanceof Error ? error.message : error}`);
        }
    }
}