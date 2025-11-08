"use client";

import { useCheckedItemsStore } from "@/lib/stores";
import { Button } from "../../ui/button";

export default function DeleteBottomPanel() {
  const { checkedCount, isDeleteMode, setDeleteMode } = useCheckedItemsStore();
  return (
    isDeleteMode && (
      <div className="fixed bottom-0 right-0 w-full bg-[#8d45ff] text-white py-3.5">
        <div className="container mx-auto flex items-center justify-between">
          <p>삭제할 내역을 선택해 주세요. ({checkedCount}개 선택됨)</p>
          <div className="flex px-2">
            <Button
              onClick={() => setDeleteMode(false)}
              className="w-10 md:w-20 mr-2 bg-transparent hover:bg-primary cursor-pointer"
            >
              취소
            </Button>
            <Button className="w-10 md:w-20 bg-white text-black hover:bg-[#efefef] cursor-pointer">
              확인
            </Button>
          </div>
        </div>
      </div>
    )
  );
}
