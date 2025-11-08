import { FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useFindAccountsByUserId,
  useFindPaymentMethodsByUserId,
} from "@/lib/query";
import { Account, PaymentMethod } from "@/lib/types";
import { ExpenseFormSchema } from "@/lib/validations";
import { CreditCardIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import z from "zod/v3";

interface Props {
  form: UseFormReturn<z.infer<typeof ExpenseFormSchema>>;
}

export default function PaymentOptionSection({ form }: Props) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "CARD" | "ACCOUNT" | ""
  >("");

  const { data: cardList, isLoading: cardIsLoading } =
    useFindPaymentMethodsByUserId();
  const { data: accountList, isLoading: accountIsLoading } =
    useFindAccountsByUserId();

  useEffect(() => {
    if (selectedPaymentMethod === "CARD") {
      if (cardIsLoading) return;
      form.setValue("accountId", "");
    } else if (selectedPaymentMethod === "ACCOUNT") {
      form.setValue("paymentMethodId", "");
    } else {
      form.setValue("accountId", "");
      form.setValue("paymentMethodId", "");
    }
  }, [selectedPaymentMethod, form, cardIsLoading]);

  return (
    <div className="relative w-full mb-3">
      <span className="absolute top-1 text-gray-500">
        <CreditCardIcon className="size-6" />
      </span>
      <div className="ml-10">
        <FormField
          control={form.control}
          name={"method"}
          render={({ field }) => (
            <Select
              value={selectedPaymentMethod}
              onValueChange={(value: "" | "CARD" | "ACCOUNT") => {
                setSelectedPaymentMethod(value);
                field.onChange(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="결제 수단을 선택하세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="CARD">카드</SelectItem>
                  <SelectItem value="ACCOUNT">계좌이체</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {selectedPaymentMethod === "CARD" && (
          <div className="mt-3">
            <FormField
              control={form.control}
              name={"paymentMethodId"}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(v) => {
                    field.onChange(v);
                    const found = (cardList || []).find(
                      (c: PaymentMethod) => c.id === v
                    );
                    if (found && found.account && found.account.id) {
                      form.setValue("accountId", found.account.id);
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="결제할 카드를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {cardIsLoading ? (
                        <SelectItem value={"__loading"} disabled>
                          불러오는 중
                        </SelectItem>
                      ) : Array.isArray(cardList) && cardList.length > 0 ? (
                        (cardList ?? []).map(
                          (card: PaymentMethod, index: number) => (
                            <SelectItem key={card.id ?? index} value={card.id}>
                              {card.name} ({card.methodType} {card.cardNumber})
                            </SelectItem>
                          )
                        )
                      ) : (
                        <SelectItem value={"__none"} disabled>
                          등록된 카드가 없습니다
                        </SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}
        {selectedPaymentMethod === "ACCOUNT" && (
          <div className="mt-3">
            <FormField
              control={form.control}
              name={"accountId"}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(v) => field.onChange(v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="결제할 계좌를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {accountIsLoading ? (
                        <SelectItem value={"__loading"} disabled>
                          불러오는 중
                        </SelectItem>
                      ) : Array.isArray(accountList) &&
                        accountList.length > 0 ? (
                        (accountList ?? []).map(
                          (account: Account, index: number) => (
                            <SelectItem
                              key={account.id ?? index}
                              value={account.id}
                            >
                              {account.name} ({account.accountNumber})
                            </SelectItem>
                          )
                        )
                      ) : (
                        <SelectItem value={"__none"} disabled>
                          등록된 계좌가 없습니다
                        </SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
