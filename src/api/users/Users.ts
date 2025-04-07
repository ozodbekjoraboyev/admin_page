import api from "../api";

const UsersAll = {
  usersAll: () => {
    return api.get("/api/users?limit=10&page=1&order=ASC");
  },
  deleteOne: (id: number) => {
    return api.delete(`/api/users/${id}`);
  },
  //   patchOne: (editUser: {
  //     id?: number | undefined;
  //     name: string;
  //     email: string;
  //     password: number;
  //     image: string;
  //     role: string;
  //   }) => {
  //   return  api.patch(`/api/users/${editUser?.id}`);
  //   },
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
