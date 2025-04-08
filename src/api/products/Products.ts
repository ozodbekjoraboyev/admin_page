import api from "../api";

const ProductsAll = {
  productsget: () => {
    return api.get(`/api/products?limit=10&page=1&order=ASC`);
  },
  productsCatigories: () => {
    return api.get(`/api/categories`);
  },
  productDelete: (id: number) => {
    return api.delete(`/api/products/${id}`);
  },
 
};

export default ProductsAll;