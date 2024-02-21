import { create } from "zustand";

interface Modal {
  modalID: string | null;
  setOpenModalID: (value: string | null) => void;
}

export const useModalStore = create<Modal>((set) => ({
  modalID: null,
  setOpenModalID: (value) => set(() => ({ modalID: value })),
}));
