"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function DashboardMethodsPayment() {
  const [income, setIncome] = useState(false);
  const [expense, setExpense] = useState(true);
  return (
    <Card className="flex flex-col flex-grow h-[510px]">
      <CardHeader className="text-md float-left font-medium pb-0">
        <CardTitle>결제 방식별 지출</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center w-full">
          <div
            onClick={() => {
              setExpense(true);
              setIncome(false);
            }}
            className={`w-[50%] text-center border-b leading-9 cursor-pointer ${
              expense && "border-black dark:border-white"
            }`}
          >
            지출
          </div>
          <div
            onClick={() => {
              setIncome(true);
              setExpense(false);
            }}
            className={`w-[50%] text-center border-b leading-9 cursor-pointer ${
              income && "border-black dark:border-white"
            }`}
          >
            수입
          </div>
        </div>

        {/* 지출(expense) 데이터 */}
        {expense && (
          <>
            <div className="relative">
              <div className="pt-5 pb-4 mt-2.5 text-right">
                <p className="text-xs mb-2 text-gray-500">전체</p>
                <p className="mb-2">
                  <strong className="text-2xl font-light">596,155 원</strong>
                </p>
                <div className="absolute content-none w-[80%] border-b right-0 bottom-0" />
              </div>
            </div>
            <div>
              <div className="pt-5 pb-4 mt-2.5 text-right">
                <p className="text-xs mb-2 text-gray-500">현금</p>
                <p className="mb-5">
                  <strong className="text-xl font-light">596,155 원</strong>
                </p>
                <p className="text-xs mb-2 text-gray-500">카드</p>
                <p className="mb-2">
                  <strong className="text-xl font-light">0 원</strong>
                </p>
              </div>
            </div>
          </>
        )}

        {/* 수입(income) 데이터 */}
        {income && (
          <>
            <div className="relative">
              <div className="pt-5 pb-4 mt-2.5 text-right">
                <p className="text-xs mb-2 text-gray-500">전체</p>
                <p className="mb-2">
                  <strong className="text-2xl font-light">1,547,968 원</strong>
                </p>
                <div className="absolute content-none w-[80%] border-b right-0 bottom-0" />
              </div>
            </div>
            <div>
              <div className="pt-5 pb-4 mt-2.5 text-right">
                <p className="text-xs mb-2 text-gray-500">수입</p>
                <p className="mb-5">
                  <strong className="text-xl font-light">2,144,123 원</strong>
                </p>
                <p className="text-xs mb-2 text-gray-500">지출</p>
                <p className="mb-2">
                  <strong className="text-xl font-light">596,155 원</strong>
                </p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
