import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const updateBlog = async (updatedObject) => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject);
  return response.data;
};

const setToken = (newToken) => {
  const token = `bearer ${newToken}`;
  axios.defaults.headers.common['Authorization'] = token;
};

const removeBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, create, updateBlog, removeBlog, setToken };
