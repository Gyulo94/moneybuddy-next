import { create } from "zustand";
import { EditOpenState, OpenState } from "../types";

export const useCreateAccountDialogStore = create<OpenState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useEditAccountDialogStore = create<EditOpenState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}));
