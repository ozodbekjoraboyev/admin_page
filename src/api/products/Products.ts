import api from "../api";

const ProductsAll = {
  productsget: (limit = 10, page = 1) => {
    return api.get(`/api/products?limit=${limit}&page=${page}&order=ASC`);
  },
  productsCatigories: () => {
    return api.get(`/api/categories`);
  },
  productDelete: (id: number) => {
    return api.delete(`/api/products/${id}`);
  },
 
};

export default ProductsAll;