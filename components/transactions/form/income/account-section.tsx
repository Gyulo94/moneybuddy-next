import { FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFindAccountsByUserId } from "@/lib/query";
import { Account } from "@/lib/types";
import { IncomeFormSchema } from "@/lib/validations";
import { CreditCardIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import z from "zod/v3";

interface Props {
  form: UseFormReturn<z.infer<typeof IncomeFormSchema>>;
}

export default function AccountSection({ form }: Props) {
  const { data: accountList, isLoading } = useFindAccountsByUserId();

  return (
    <div className="relative w-full mb-3">
      <span className="absolute top-4.5 text-gray-500">
        <CreditCardIcon className="size-6" />
      </span>
      <div className="ml-10">
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
                  <SelectValue placeholder="입금할 계좌를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {isLoading ? (
                      <SelectItem value={"__loading"} disabled>
                        불러오는 중
                      </SelectItem>
                    ) : Array.isArray(accountList) && accountList.length > 0 ? (
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
      </div>
    </div>
  );
}
