import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BANKS, DEFAULT_BANK_LOGO } from "@/lib/constants";
import { AccountFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod/v3";

interface Props {
  id?: string;
  onSubmit: (values: z.infer<typeof AccountFormSchema>) => void;
  defaultValues: z.infer<typeof AccountFormSchema>;
  onClose: () => void;
}

export function AccountForm({ id, onSubmit, defaultValues, onClose }: Props) {
  const form = useForm<z.infer<typeof AccountFormSchema>>({
    resolver: zodResolver(AccountFormSchema),
    defaultValues,
  });
  const selectedBankId = form.watch("bankId");
  const selectedBankLogo =
    BANKS.find((bank) => bank.id === selectedBankId)?.logo || "";
  const [logo, setLogo] = useState<string>("");

  useEffect(() => {
    if (selectedBankId) {
      console.log(selectedBankId);

      setLogo(selectedBankLogo);
    }
  }, [selectedBankId, selectedBankLogo]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 max-w-sm"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {form.getValues("accountType") === "계좌" && (
          <div className="relative mx-auto size-[180px] aspect-square">
            <Image
              src={logo || DEFAULT_BANK_LOGO}
              alt="Bank Logo"
              fill
              className="size-full object-cover object-center"
            />
          </div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input
                  placeholder={`원하는 계좌 이름을 입력하세요.`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("accountType") === "계좌" && (
          <>
            <FormField
              control={form.control}
              name="bankId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>은행명</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="계좌 유형을 선택하세요." />
                      </SelectTrigger>
                      <SelectContent>
                        {BANKS.map((bank) => (
                          <SelectItem key={bank.id} value={bank.id}>
                            {bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>계좌번호 뒷 4자리</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="계좌번호 뒷 4자리를 입력하세요."
                      maxLength={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="initialBalance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>초기 잔액</FormLabel>
              <FormControl>
                <Input
                  placeholder="초기 잔액을 입력하세요."
                  value={field.value.toLocaleString()}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, "");
                    field.onChange(isNaN(Number(value)) ? 0 : Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row justify-end items-center gap-4 mt-10">
          <Button
            type="button"
            variant={"outline"}
            className="w-20"
            onClick={onClose}
          >
            취소
          </Button>
          <Button type="submit" className="w-20">
            {id ? "수정" : "추가"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
