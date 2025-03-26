import { create } from "zustand";

interface CheckedItemsState {
  checkedItems: { [key: number]: boolean }; // 체크된 항목 상태
  checkedCount: number; // 체크된 항목 개수
  setCheckedItems: (items: { [key: number]: boolean }) => void; // 상태 업데이트 함수
  updateCheckedCount: () => void; // 체크된 항목 개수 업데이트 함수
  setDeleteMode: (isDelete: boolean) => void; // 삭제 모드 상태 업데이트 함수
  isDeleteMode: boolean; // 삭제 모드 상태
}

export const useCheckedItemsStore = create<CheckedItemsState>((set, get) => ({
  checkedItems: {},
  checkedCount: 0,
  isDeleteMode: false,
  setCheckedItems: (items) => {
    set({ checkedItems: items });
    get().updateCheckedCount(); // 체크된 항목 개수 업데이트
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
  showIncome: false,
  toggleExpense: () => set((state) => ({ showExpense: !state.showExpense })),
  toggleIncome: () => set((state) => ({ showIncome: !state.showIncome })),
}));
