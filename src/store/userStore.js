import { create } from "zustand";

export const useUserStore = create((set) => ({
  //state
  isAuthenticated: false,
  securityKey: "",
  adminbtn: false,
  isOpen: false,
  loading: false,

  //actions
  securityKeyUpdater: (data) => {
    if (Array.isArray(data) && data.length > 0) {
      set({ securityKey: data[data.length - 1].email });
    } else {
      set({ securityKey: "" });
    }
  },

  adminbtnUpdater: () => {
    set((state) => ({ adminbtn: state.adminbtn ? false : true }));
  },

  authenticate: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  setIsOpen: () => set((state) => ({ isOpen: state.isOpen ? false : true })),
  setIsLoading: () =>
    set((state) => ({ loading: state.loading ? false : true })),
}));
