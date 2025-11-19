"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDateFilters } from "@/lib/hooks";
import { getCurrentDate } from "@/lib/hooks/use-filter";
import { useFindTransactionsByMonth } from "@/lib/query";
import { TransactionByDate, TransactionDetail } from "@/lib/types";
import { useMemo, useState } from "react";

export default function DashboardMethodsPayment() {
  const [activeTab, setActiveTab] = useState<"expense" | "income">("expense");
  const [{ year, month }] = useDateFilters();
  const currentDate = getCurrentDate({ year, month });
  const {
    data: TransactionsByDate,
    isLoading,
    isError,
  } = useFindTransactionsByMonth(currentDate);
  const summaryData = useMemo(() => {
    if (!TransactionsByDate) {
      return {
        paymentMethodExpenses: {
          totalExpense: 0,
          cashExpense: 0,
          cardExpense: 0,
        },
        overallSummary: { totalAmount: 0, totalIncome: 0, totalExpense: 0 },
      };
    }

    let totalIncome = 0;
    let totalExpense = 0;
    let cashExpense = 0;
    let cardExpense = 0;

    TransactionsByDate.forEach((TransactionByDate: TransactionByDate) => {
      TransactionByDate.details.forEach((detail: TransactionDetail) => {
        const amount = detail.amount;

        if (detail.type === "INCOME") {
          totalIncome += amount;
        } else if (detail.type === "EXPENSE") {
          totalExpense += amount;

          if (detail.method === "ACCOUNT") {
            cashExpense += amount;
          } else if (detail.method === "CARD") {
            cardExpense += amount;
          }
        }
      });
    });

    const totalAmount = totalIncome - totalExpense;

    return {
      paymentMethodExpenses: {
        totalExpense: totalExpense,
        cashExpense: cashExpense,
        cardExpense: cardExpense,
      },
      overallSummary: {
        totalAmount: totalAmount,
        totalIncome: totalIncome,
        totalExpense: totalExpense,
      },
    };
  }, [TransactionsByDate]);

  if (isLoading)
    return (
      <Card className="flex flex-col flex-grow h-[510px] py-6">
        <CardContent>로딩 중...</CardContent>
      </Card>
    );
  if (isError)
    return (
      <Card className="flex flex-col flex-grow h-[510px] py-6">
        <CardContent>데이터 로드 중 에러가 발생했습니다.</CardContent>
      </Card>
    );
  if (!TransactionsByDate || TransactionsByDate.length === 0)
    return (
      <Card className="flex flex-col flex-grow h-[510px] py-6">
        <CardContent>해당 월의 데이터가 없습니다.</CardContent>
      </Card>
    );

  return (
    <Card className="flex flex-col flex-grow h-[510px] py-6">
      <CardHeader className="text-md float-left font-medium pb-0">
        <CardTitle>결제 방식별 지출</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center w-full">
          <div
            onClick={() => setActiveTab("expense")}
            className={`w-[50%] text-center border-b leading-9 cursor-pointer ${
              activeTab === "expense" && "border-black dark:border-white"
            }`}
          >
            지출
          </div>
          <div
            onClick={() => setActiveTab("income")}
            className={`w-[50%] text-center border-b leading-9 cursor-pointer ${
              activeTab === "income" && "border-black dark:border-white"
            }`}
          >
            수입
          </div>
        </div>

        {/* 지출(expense) 데이터 */}
        {activeTab === "expense" && (
          <>
            <div className="relative">
              <div className="pt-5 pb-4 mt-2.5 text-right">
                <p className="text-xs mb-2 text-gray-500">전체</p>
                <p className="mb-2">
                  <strong className="text-2xl font-light">
                    {summaryData.paymentMethodExpenses.totalExpense.toLocaleString()}{" "}
                    원
                  </strong>
                </p>
                <div className="absolute content-none w-[80%] border-b right-0 bottom-0" />
              </div>
            </div>
            <div>
              <div className="pt-5 pb-4 mt-2.5 text-right">
                <p className="text-xs mb-2 text-gray-500">현금 + 계좌</p>
                <p className="mb-5">
                  <strong className="text-xl font-light">
                    {" "}
                    {summaryData.paymentMethodExpenses.cashExpense.toLocaleString()}{" "}
                    원
                  </strong>
                </p>
                <p className="text-xs mb-2 text-gray-500">카드</p>
                <p className="mb-2">
                  <strong className="text-xl font-light">
                    {summaryData.paymentMethodExpenses.cardExpense.toLocaleString()}{" "}
                    원
                  </strong>
                </p>
              </div>
            </div>
          </>
        )}

        {/* 수입(income) 데이터 */}
        {activeTab === "income" && (
          <>
            <div className="relative">
              <div className="pt-5 pb-4 mt-2.5 text-right">
                <p className="text-xs mb-2 text-gray-500">전체</p>
                <p className="mb-2">
                  <strong className="text-2xl font-light">
                    {summaryData.overallSummary.totalAmount.toLocaleString()} 원
                  </strong>
                </p>
                <div className="absolute content-none w-[80%] border-b right-0 bottom-0" />
              </div>
            </div>
            <div>
              <div className="pt-5 pb-4 mt-2.5 text-right">
                <p className="text-xs mb-2 text-gray-500">수입</p>
                <p className="mb-5">
                  <strong className="text-xl font-light">
                    {summaryData.overallSummary.totalIncome.toLocaleString()} 원
                  </strong>
                </p>
                <p className="text-xs mb-2 text-gray-500">지출</p>
                <p className="mb-2">
                  <strong className="text-xl font-light">
                    {summaryData.overallSummary.totalExpense.toLocaleString()}{" "}
                    원
                  </strong>
                </p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
