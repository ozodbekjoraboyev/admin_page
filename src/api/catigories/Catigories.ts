import api from "../api";

const CatigoriesAPI = {
  categoriesAll: () => {
    return api.get("/api/categories?limit=10&page=1&order=ASC");
  },
  categoriesDelete: (id: number) => {
    return api.delete(`/api/categories/${id}`);
  },
};

export default CatigoriesAPI;
