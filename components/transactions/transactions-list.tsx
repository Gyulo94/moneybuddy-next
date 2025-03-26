"use client";

import { useCheckedItemsStore, useFilterStore } from "@/lib/store";
import { Transaction } from "@/lib/type";
import { ListPlus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

export const TransactionsDateList = ({ data }: { data: Transaction[] }) => {
  const { isDeleteMode, setDeleteMode, checkedItems, setCheckedItems } =
    useCheckedItemsStore();
  const { showExpense, showIncome } = useFilterStore();

  // 필터링된 데이터 생성
  const filteredData = data
    .map((transaction) => ({
      ...transaction,
      details: transaction.details.filter((detail) => {
        if (detail.type === "EXPENSE" && !showExpense) return false;
        if (detail.type === "INCOME" && !showIncome) return false;
        return true;
      }),
    }))
    .filter((transaction) => transaction.details.length > 0); // 필터링된 details가 있는 transaction만 포함

  // 모든 날짜를 기본적으로 열려 있도록 설정
  const [expandedDates, setExpandedDates] = useState<string[]>(
    data.map((transaction) => transaction.date)
  );

  useEffect(() => {
    // 초기 렌더링 시 한 번만 실행
    setExpandedDates(data.map((transaction) => transaction.date));
  }, [data]);

  const toggleDetails = (date: string) => {
    setExpandedDates(
      (prev) =>
        prev.includes(date)
          ? prev.filter((d) => d !== date) // 이미 열려 있으면 닫기
          : [...prev, date] // 닫혀 있으면 추가
    );
  };

  const handleCheckboxChange = (id: number) => {
    const updatedCheckedItems = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updatedCheckedItems); // zustand 스토어 업데이트
  };

  const handleDateCheckboxChange = (
    date: string,
    details: { id: number }[]
  ) => {
    const allChecked = details.every((detail) => checkedItems[detail.id]);
    const updatedCheckedItems = { ...checkedItems };

    details.forEach((detail) => {
      updatedCheckedItems[detail.id] = !allChecked; // 모두 선택 또는 모두 해제
    });

    setCheckedItems(updatedCheckedItems);
  };

  return (
    <Card className="w-full p-0">
      <CardContent className="p-0">
        <div className="flex items-center justify-end p-2">
          <Button className="cursor-pointer" variant={"ghost"} size={"icon"}>
            <ListPlus />
          </Button>
          <Button
            className="cursor-pointer"
            variant={"ghost"}
            size={"icon"}
            onClick={() => setDeleteMode(!isDeleteMode)} // zustand 스토어에서 삭제 모드 토글
          >
            {isDeleteMode ? (
              <span className="bg-primary text-white rounded-full p-2">
                <Trash2 />
              </span>
            ) : (
              <Trash2 />
            )}
          </Button>
          <Button className="cursor-pointer" variant={"ghost"} size={"icon"}>
            <Search />
          </Button>
        </div>

        <div className="w-full">
          {filteredData.map((transaction) => {
            // 날짜별 총 금액 계산
            const totalAmount = transaction.details.reduce((sum, detail) => {
              // 수입과 지출이 모두 표시될 경우, 지출은 음수로 변환
              const amount =
                showExpense && showIncome && detail.type === "EXPENSE"
                  ? -detail.amount
                  : detail.amount;
              return sum + amount;
            }, 0);

            return (
              <div
                key={transaction.date}
                className="border-t leading-11 bg-[#fafafc]"
              >
                {/* 날짜와 총 금액 */}
                <div
                  className="flex justify-between items-center cursor-pointer px-6"
                  onClick={() => toggleDetails(transaction.date)}
                >
                  {isDeleteMode ? (
                    <div className="flex justify-center items-center">
                      <Checkbox
                        className="mr-3 w-6 h-6"
                        checked={transaction.details.every(
                          (detail) => !!checkedItems[detail.id]
                        )} // 날짜의 모든 데이터가 선택되었는지 확인
                        onCheckedChange={() =>
                          handleDateCheckboxChange(
                            transaction.date,
                            transaction.details
                          )
                        } // 날짜 체크박스 상태 변경 핸들러
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-lg">{transaction.date}</span>
                    </div>
                  ) : (
                    <span className="text-lg">{transaction.date}</span>
                  )}
                  <span className="text-md text-gray-600">
                    {new Intl.NumberFormat().format(totalAmount)} 원
                  </span>
                </div>

                {/* 세부 내역 (조건부 렌더링) */}
                {expandedDates.includes(transaction.date) && (
                  <ul className="mt-4 space-y-2 px-6 bg-[#f5f5f7]">
                    {transaction.details.map((detail) => (
                      <li
                        key={detail.id}
                        className="flex py-3 cursor-pointer hover:bg-gray-100"
                      >
                        <div className="flex justify-start items-center w-full">
                          {/* 체크박스 */}
                          {isDeleteMode && (
                            <Checkbox
                              className="mr-3 cursor-pointer"
                              checked={!!checkedItems[detail.id]} // 체크 상태
                              onCheckedChange={() =>
                                handleCheckboxChange(detail.id)
                              } // 상태 변경 핸들러
                            />
                          )}
                          <div className="flex justify-start items-center w-full">
                            <span className="text-sm text-gray-500 mr-5 w-[5%]">
                              {detail.time}
                            </span>
                            <div className="flex justify-start items-center w-[15%]">
                              <div className="text-sm text-gray-700 relative">
                                <div
                                  className="absolute bottom-0 left-0 w-6 h-6 flex items-center justify-center rounded-full"
                                  style={{
                                    backgroundColor: detail.color || "", // 선택된 카테고리의 색상
                                  }}
                                >
                                  <span className="text-sm">
                                    {detail?.icon || ""}{" "}
                                    {/* 선택된 카테고리의 아이콘 */}
                                  </span>
                                </div>
                                <p className="ml-10">{detail.category}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 w-[10%]">
                              {detail.subCategory}
                            </p>
                            <div className="text-sm text-gray-600 w-[20%]">
                              {detail.description}
                            </div>
                            <span className="text-sm text-gray-800 w-[20%]">
                              {new Intl.NumberFormat().format(
                                showExpense &&
                                  showIncome &&
                                  detail.type === "EXPENSE"
                                  ? -detail.amount // 지출은 음수로 표시
                                  : detail.amount
                              )}{" "}
                              원
                            </span>
                            <div className="text-sm text-gray-500 w-[15%]">
                              #{detail.tags.join(", #")}
                            </div>
                            {detail.memo && (
                              <div className="text-sm text-gray-400 w-[12%]">
                                {detail.memo}
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
