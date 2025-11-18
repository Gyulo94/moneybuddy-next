import { OpenState } from "@/lib/types";
import { create } from "zustand";

export const useCreateBudgetDialogStore = create<OpenState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
