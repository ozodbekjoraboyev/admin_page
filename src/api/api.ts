import axios from "axios";

const api = axios.create({
  baseURL: "https://nt.softly.uz",
});

api.interceptors.response.use(null, (e) => {
  if (e.status === 401) {
    import("../stor/useMyStore").then((res) => {
      const useAurStore = res.default;
      const state = useAurStore.getState();
      state.logout()
    
    });
  }
});
export default api;
