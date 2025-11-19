import { create } from "zustand";
import { Category, EditOpenState, SubCategory } from "../types";

interface CheckedItemsState {
  checkedItems: { [key: string]: boolean };
  checkedCount: number;
  setCheckedItems: (items: { [key: string]: boolean }) => void;
  updateCheckedCount: () => void;
  setDeleteMode: (isDelete: boolean) => void;
  isDeleteMode: boolean;
}

export const useCheckedItemsStore = create<CheckedItemsState>((set, get) => ({
  checkedItems: {},
  checkedCount: 0,
  isDeleteMode: false,
  setCheckedItems: (items) => {
    set({ checkedItems: items });
    get().updateCheckedCount();
  },
  updateCheckedCount: () => {
    const count = Object.values(get().checkedItems).filter(Boolean).length;
    set({ checkedCount: count });
  },
  setDeleteMode: (isDelete) => set({ isDeleteMode: isDelete }),
}));

interface FilterState {
  showExpense: boolean;
  showIncome: boolean;
  toggleExpense: () => void;
  toggleIncome: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  showExpense: true,
  showIncome: true,
  toggleExpense: () => set((state) => ({ showExpense: !state.showExpense })),
  toggleIncome: () => set((state) => ({ showIncome: !state.showIncome })),
}));

interface ExpenseCategoryState {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  selectedSubCategory: SubCategory | null;
  setSelectedSubCategory: (subCategory: SubCategory | null) => void;
}

export const useExpenseCategoryStore = create<ExpenseCategoryState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  selectedSubCategory: null,
  setSelectedSubCategory: (selectedSubCategory) => set({ selectedSubCategory }),
}));

interface IncomeCategoryState {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
}
export const useIncomeCategoryStore = create<IncomeCategoryState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
}));

interface TransactionDialogState {
  date?: string | null;
  isOpen: boolean;
  onOpen: (date: string | null) => void;
  onClose: () => void;
}

export const useOpenTransactionDialogStore = create<TransactionDialogState>(
  (set) => ({
    date: null,
    isOpen: false,
    onOpen: (date) => set({ date, isOpen: true }),
    onClose: () => set({ date: undefined, isOpen: false }),
  })
);

interface EditTransactionDialogState extends EditOpenState {
  id: string | undefined;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useEditTransactionDialogStore = create<EditTransactionDialogState>(
  (set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id) => set({ id, isOpen: true }),
    onClose: () => set({ id: undefined, isOpen: false }),
  })
);
