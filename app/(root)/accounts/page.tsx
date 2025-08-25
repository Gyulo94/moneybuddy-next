import AccountContent from "@/components/account/account-content";
import CreateAccountButton from "@/components/account/create-account-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { findAccountsByUserId } from "@/lib/actions";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function AccountPage() {
  const queryClient = await getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["accounts"],
      queryFn: findAccountsByUserId,
    }),
  ]);

  const state = dehydrate(queryClient);

  return (
    <div className="px-2 w-full max-w-7xl mx-auto lg:px-0">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="paymentMethod">카드</TabsTrigger>
          <TabsTrigger value="account">계좌</TabsTrigger>
        </TabsList>
        <TabsContent value="paymentMethod">
          <CreateAccountButton type={"paymentMethod"} />
        </TabsContent>
        <HydrationBoundary state={state}>
          <TabsContent value="account" className="relative">
            <CreateAccountButton type={"account"} />
            <AccountContent />
          </TabsContent>
        </HydrationBoundary>
      </Tabs>
    </div>
  );
}
