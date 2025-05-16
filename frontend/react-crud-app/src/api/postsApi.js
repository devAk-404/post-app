import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const getPosts = (page = 1, limit = 5) => {
  const start = (page - 1) * limit;
  return axios.get(`${BASE_URL}/posts?_start=${start}&_limit=${limit}`);
};

export const getPostById = (id) => axios.get(`${BASE_URL}/posts/${id}`);
export const addPost = (post) => axios.post(`${BASE_URL}/posts`, post);
export const updatePost = (id, post) => axios.put(`${BASE_URL}/posts/${id}`, post);
export const deletePost = (id) => axios.delete(`${BASE_URL}/posts/${id}`);
