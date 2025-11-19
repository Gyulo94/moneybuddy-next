"use client";

import { useConfirm } from "@/lib/hooks";
import { useDeleteTransactions } from "@/lib/query";
import { useCheckedItemsStore } from "@/lib/stores";
import { Button } from "../../ui/button";

export default function DeleteBottomPanel() {
  const { checkedCount, checkedItems, isDeleteMode, setDeleteMode } =
    useCheckedItemsStore();
  const { mutate: deleteTransactions } = useDeleteTransactions();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 선택된 거래내역을 삭제하시겠습니까?",
    `삭제된 거래내역은 복구할 수 없습니다.`
  );
  const ids = Object.keys(checkedItems).filter(
    (key) => checkedItems[key] === true
  );

  async function handleDelete(ids: string[]) {
    const ok = await confirm();
    if (ok) {
      deleteTransactions(ids, {
        onSuccess: () => {
          setDeleteMode(false);
        },
      });
    }
  }
  return (
    isDeleteMode && (
      <>
        <ConfirmDialog />
        <div className="fixed bottom-0 right-0 w-full bg-[#8d45ff] text-white py-3.5 z-100">
          <div className="container mx-auto flex items-center justify-between">
            <p>삭제할 내역을 선택해 주세요. ({checkedCount}개 선택됨)</p>
            <div className="flex px-2">
              <Button
                onClick={() => setDeleteMode(false)}
                className="w-10 md:w-20 mr-2 bg-transparent hover:bg-primary cursor-pointer"
              >
                취소
              </Button>
              <Button
                className="w-10 md:w-20 bg-white text-black hover:bg-[#efefef] cursor-pointer"
                onClick={() => handleDelete(ids)}
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  );
}
