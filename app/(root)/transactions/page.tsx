import TransactionHeaderSection from "@/components/transactions/detail/transaction-header-section";
import TransactionsDateList from "@/components/transactions/detail/transactions-list";
import TransactionButton from "@/components/transactions/transaction-button";
import { findTransactionsByMonth } from "@/lib/actions";
import { getCurrentDate } from "@/lib/hooks";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  searchParams: Promise<{ year?: string; month?: string }>;
}

export default async function TransactionsPage({ searchParams }: Props) {
  const params = await searchParams;
  const year = params.year ? Number(params.year) : null;
  const month = params.month ? Number(params.month) : null;

  const currentDate = getCurrentDate({ year, month });
  const queryClient = await getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["transactions", currentDate],
      queryFn: () => findTransactionsByMonth(currentDate),
    }),
  ]);
  const state = dehydrate(queryClient);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto">
      <HydrationBoundary state={state}>
        <TransactionButton />
        <TransactionHeaderSection />
        <TransactionsDateList />
      </HydrationBoundary>
    </div>
  );
}
