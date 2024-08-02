import { getAPI } from "./asiosApi";

export const UserApi = getAPI();

interface PostRequest {
    title: string,
    content: string;
}

export const createPost = async (data: PostRequest) => {
    const response = await UserApi.post('/api', data);
    return response.data;
};

export const getPost = async (page: number) => {
    const response = await UserApi.get('/api', {
        headers: {
            page: page
        }
    });
    return response.data;
};

export const updatePost = async (data: PostRequest, id: number) => {
    const response = await UserApi.put('/api', data, {
        headers: {
            id: id
        }
    });
    return response.data;
};
export const deletePost = async (id: number) => {
    const response = await UserApi.delete('/api', {
        headers: {
            id: id
        }
    });
    return response.data;
};
