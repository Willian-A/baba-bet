import { create } from "zustand";

import { ToastProps } from "../_components/Toast";
import { persist } from "zustand/middleware";

interface Toast {
  toast: ToastProps;
  setToastProps: (value: ToastProps) => void;
  setIsOpen: (value: boolean) => void;
}

export const useToastStore = create<Toast>()(
  persist(
    (set) => ({
      toast: {
        description: "",
        isOpen: false,
        title: undefined,
        variant: "success",
      },
      setToastProps: (data) =>
        set((state) => ({ toast: { ...state.toast, ...data } })),
      setIsOpen: (data) =>
        set((state) => ({ toast: { ...state.toast, isOpen: data } })),
    }),
    { name: "globalSnackbar" }
  )
);
