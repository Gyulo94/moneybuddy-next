import ContentsContainer from "@/components/shared/contents-container";
import AddTransactionsButton from "@/components/transactions/add-transactions-button";
import { IncomeExpenseFilter } from "@/components/transactions/chart/income-expense-filter";
import { TransactionsDateList } from "@/components/transactions/transactions-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
        <Card className="hidden 2xl:block w-[30%] 2xl:ml-5">
          <CardContent className="w-full">
            <p>지출 내역</p>
            <p>수입 내역</p>
          </CardContent>
        </Card>
      </div>
      <TransactionsDateList data={getTransactions} />
    </ContentsContainer>
  );
}
