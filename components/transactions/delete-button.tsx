"use client";
import { useCheckedItemsStore } from "@/lib/store";
import { Button } from "../ui/button";

export const DeleteButton = () => {
  const { checkedCount, isDeleteMode, setDeleteMode } = useCheckedItemsStore();
  return (
    isDeleteMode && (
      <div className="fixed bottom-0 w-full bg-[#8d45ff] text-white py-3.5 border-t border-gray-200">
        <div className="container mx-auto flex items-center justify-between">
          <p>삭제할 내역을 선택해 주세요. ({checkedCount}개 선택됨)</p>
          <div>
            <Button
              onClick={() => setDeleteMode(false)}
              className="w-20 mr-2 bg-transparent hover:bg-primary rounded-none cursor-pointer"
            >
              취소
            </Button>
            <Button className="w-20 bg-white text-black hover:bg-[#efefef] rounded-none cursor-pointer">
              확인
            </Button>
          </div>
        </div>
      </div>
    )
  );
};
