import api from "../api";

const BannersApi = {
  getAll: () => {
    return api.get(`/api/banners?limit=10&page=1&order=ASC`);
  },
  deleteOne: (id: number) => {
    return api.delete(`/api/banners/${id}`);
  },
  patchOne: (id: number, isActive: boolean) => {
    return api.patch(`/api/banners/${id}`, { isActive: !isActive });
  },
  create: (values: { title: string; isActive: boolean; imageUrl: string }) => {
    return api.post(`/api/banners`, values);
  },
  
};
export default BannersApi;
