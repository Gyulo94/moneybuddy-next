import ContentsContainer from "@/components/shared/contents-container";
import AddTransactionsButton from "@/components/transactions/add-transactions-button";
import { IncomeExpenseFilter } from "@/components/transactions/chart/income-expense-filter";
import MaximunExpenseDay from "@/components/transactions/maximum-expense-day";
import { TransactionsDateList } from "@/components/transactions/transactions-list";
import { Button } from "@/components/ui/button";
import { TagFindByUserId } from "@/lib/actions/tag.actions";
import { TransactionFindByType } from "@/lib/actions/transaction.actions";
import { Tag } from "@/lib/type";

export default async function TransactionsPage() {
  const tags: Tag[] = await TagFindByUserId();
  const getTransactions = await TransactionFindByType();
  console.log("getTransactions", getTransactions);

  return (
    <ContentsContainer
      title="수입 / 지출 내역"
      menu={["날짜별", "분류별", "카드별"]}
    >
      <div className="absolute right-3 -top-13">
        <AddTransactionsButton tags={tags}>
          <Button className="relative rounded-full w-10 h-10 text-3xl font-extralight text-center cursor-pointer">
            <p className="absolute left-[11px] bottom-1">+</p>
          </Button>
        </AddTransactionsButton>
      </div>
      <div className="w-full flex items-center justify-between mb-5">
        <IncomeExpenseFilter data={getTransactions} />
        <MaximunExpenseDay data={getTransactions} />
      </div>
      <TransactionsDateList data={getTransactions} />
    </ContentsContainer>
  );
}
