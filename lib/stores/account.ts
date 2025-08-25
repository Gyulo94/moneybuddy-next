import { create } from "zustand";
import { OpenState } from "../types";

export const useCreateAccountDialogStore = create<OpenState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
