import AccountContent from "@/components/account/account-content";
import CreateAccountButton from "@/components/account/create-account-button";
import PaymentMethodContent from "@/components/payment-method/payment-method-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  findAccountsByUserId,
  findPaymentMethodsByUserId,
} from "@/lib/actions";
import { getQueryClient } from "@/lib/query/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function AccountPage() {
  const queryClient = await getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["accounts"],
      queryFn: findAccountsByUserId,
    }),
    queryClient.prefetchQuery({
      queryKey: ["paymentMethods"],
      queryFn: findPaymentMethodsByUserId,
    }),
  ]);

  const state = dehydrate(queryClient);

  return (
    <div className="px-2 w-full max-w-7xl mx-auto lg:px-0">
      <Tabs defaultValue="paymentMethod">
        <TabsList>
          <TabsTrigger value="paymentMethod">카드</TabsTrigger>
          <TabsTrigger value="account">계좌</TabsTrigger>
        </TabsList>
        <HydrationBoundary state={state}>
          <TabsContent value="paymentMethod" className="relative">
            <CreateAccountButton type={"paymentMethod"} />
            <PaymentMethodContent />
          </TabsContent>
        </HydrationBoundary>
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
