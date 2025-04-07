import { create } from "zustand";
import api from "../api/api";

type GlobalState = {
  accessToken: string;
  user: any;
  logout: () => void;
};

const useMyStor = create<GlobalState>((state) => {
  const ls_strin = localStorage.getItem("auth");

  if (!ls_strin) {
    return {
      accessToken: "",
      user: null,
      logout: () => {},
    };
  }
  const ls = JSON.parse(ls_strin);

  api.defaults.headers.Authorization = `Bearer ${ls.accessToken}`;

  return {
    accessToken: ls.accessToken,
    user: ls.user,
    logout: () => {
      localStorage.removeItem("auth");
      state({
        user: null,
        accessToken: "",
      });
    },
  };
});
export default useMyStor;
