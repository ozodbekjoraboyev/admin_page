import api from "../api";

const UsersAll = {
  usersAll: (limit = 10, page = 1) => {
    return api.get(`/api/users?limit=${limit}&page=${page}&order=ASC`);
  },
  deleteOne: (id: number) => {
    return api.delete(`/api/users/${id}`);
  },
  postUser: (value: {
    name: string;
    email: string;
    password: number;
    image: string;
    role: string;
  }) => {
    return api.post(`/api/users`, value);
  },
};


export default UsersAll;
