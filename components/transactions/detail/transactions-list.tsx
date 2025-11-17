"use client";

import {
  getCurrentDate,
  useDateFilters,
  useFilteredTransactions,
  useTransactionNavigation,
  useTransitionItemCheckbox,
} from "@/lib/hooks";
import { useFindTransactionsByMonth } from "@/lib/query";
import { TransactionDetail } from "@/lib/types";
import { CardContent } from "../../ui/card";
import CustomToolbar from "../toolbar/custom-toolbar";
import DeleteBottomPanel from "../toolbar/delete-bottom-panel";
import TransactionDetailHeader from "./transaction-detail-header";
import TransactionDetailItem from "./transaction-detail-item";

export default function TransactionsDateList() {
  const [{ year, month }] = useDateFilters();
  const currentDate = getCurrentDate({ year, month });

  const { data: rawTransactionsData } = useFindTransactionsByMonth(currentDate);
  console.log(rawTransactionsData);

  const { value, handleNavigate } = useTransactionNavigation(
    new Date(currentDate)
  );
  const { transactions, expandedDates, toggleDetails } =
    useFilteredTransactions(rawTransactionsData);
  const { handleDateCheckboxChange } = useTransitionItemCheckbox();

  return (
    <div className="w-full p-0">
      <CardContent className="p-0">
        <CustomToolbar date={value} onNavigate={handleNavigate} />

        <div className="w-full rounded-md border shadow-md">
          {transactions.map((transaction) => {
            const totalAmount = transaction.details.reduce(
              (sum: number, detail: TransactionDetail) => {
                const raw = Number(detail.amount) || 0;
                const amt =
                  detail.type === "EXPENSE" ? -Math.abs(raw) : Math.abs(raw);
                return sum + amt;
              },
              0
            );

            return (
              <div key={transaction.date} className="border-t leading-11">
                {/* 날짜와 총 금액 */}
                <TransactionDetailHeader
                  transaction={transaction}
                  totalAmount={totalAmount}
                  handleDateCheckboxChange={handleDateCheckboxChange}
                  toggleDetails={toggleDetails}
                />
                {/* 세부 내역 */}
                {expandedDates.includes(transaction.date) && (
                  <ul>
                    {transaction.details.map((detail: TransactionDetail) => (
                      <TransactionDetailItem key={detail.id} detail={detail} />
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
      <DeleteBottomPanel />
    </div>
  );
}
