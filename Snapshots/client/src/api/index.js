import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPosts = () => API.get('/');
export const createPost = (newPost) => API.post('/', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/${id}`);
export const likePost = (id) => API.patch(`/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const contact = (contactData) => API.post("/contact", contactData);