"use client";
import { useCheckedItemsStore } from "@/lib/store";
import { ListPlus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import AddTransactionsButton from "./add-transactions-button";

export const TransactionsDateList = () => {
  const { isDeleteMode, setDeleteMode, checkedItems, setCheckedItems } =
    useCheckedItemsStore();

  const transactions = [
    {
      date: "03/22 (토)",
      totalAmount: 120000,
      details: [
        {
          id: 3,
          time: "10:30",
          color: "#ff7b3a",
          icon: "🍽️",
          category1: "식사",
          category2: "점심",
          description: "김밥천국",
          amount: 8000,
          tags: ["외식"],
          memo: "친구와 점심",
        },
        {
          id: 2,
          time: "15:00",
          color: "#1cda90",
          icon: "🚗",
          category1: "교통/차량",
          category2: "대중교통",
          description: "교통비",
          amount: 1200,
          tags: ["교통"],
          memo: "",
        },
      ],
    },
    {
      id: 2,
      date: "03/21 (금)",
      totalAmount: 45000,
      details: [
        {
          id: 1,
          time: "09:00",
          color: "#ff7b3a",
          icon: "🍽️",
          category1: "식사",
          category2: "아침",
          description: "편의점",
          amount: 5000,
          tags: ["간편식"],
          memo: "아침 간단히",
        },
      ],
    },
  ];
  // 모든 날짜를 기본적으로 열려 있도록 설정
  const [expandedDates, setExpandedDates] = useState<string[]>(
    transactions.map((transaction) => transaction.date)
  );

  const toggleDetails = (date: string) => {
    setExpandedDates(
      (prev) =>
        prev.includes(date)
          ? prev.filter((d) => d !== date) // 이미 열려 있으면 닫기
          : [...prev, date] // 닫혀 있으면 추가
    );
  };

  // 체크박스 상태 변경 핸들러
  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (id: number) => {
    const updatedCheckedItems = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updatedCheckedItems); // zustand 스토어 업데이트
  };

  // 날짜별 체크박스 상태 변경 핸들러
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
      <CardContent className=" p-0">
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
          {transactions.map((transaction) => (
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
                  {new Intl.NumberFormat().format(transaction.totalAmount)} 원
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
                        {isDeleteMode ? (
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
                                <p className="ml-10">{detail.category1}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 w-[10%]">
                              {detail.category2}
                            </p>

                            <div className="text-sm text-gray-600 w-[20%]">
                              {detail.description}
                            </div>
                            <span className="text-sm text-gray-800 w-[20%]">
                              {new Intl.NumberFormat().format(detail.amount)} 원
                            </span>
                            <div className="text-sm text-gray-500 w-[15%]">
                              #{detail.tags.join(", ")}
                            </div>
                            {detail.memo && (
                              <div className="text-sm text-gray-400 w-[12%]">
                                {detail.memo}
                              </div>
                            )}
                          </div>
                        ) : (
                          <AddTransactionsButton>
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
                                  <p className="ml-10">{detail.category1}</p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 w-[10%]">
                                {detail.category2}
                              </p>

                              <div className="text-sm text-gray-600 w-[20%]">
                                {detail.description}
                              </div>
                              <span className="text-sm text-gray-800 w-[20%]">
                                {new Intl.NumberFormat().format(detail.amount)}{" "}
                                원
                              </span>
                              <div className="text-sm text-gray-500 w-[15%]">
                                #{detail.tags.join(", ")}
                              </div>
                              {detail.memo && (
                                <div className="text-sm text-gray-400 w-[12%]">
                                  {detail.memo}
                                </div>
                              )}
                            </div>
                          </AddTransactionsButton>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
