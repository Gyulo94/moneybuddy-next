"use client";

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
import {
  BANKS,
  DEFAULT_BANK_LOGO,
  ISSUERS,
  METHOD_TYPES,
} from "@/lib/constants";
import { useFilteredIssuers } from "@/lib/hooks/use-filtered-issuers";
import { useFindAccountsByUserId } from "@/lib/query";
import { Account } from "@/lib/types";
import { PaymentMethodFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod/v3";

interface Props {
  id?: string;
  onSubmit: (values: z.infer<typeof PaymentMethodFormSchema>) => void;
  defaultValues: z.infer<typeof PaymentMethodFormSchema>;
  onClose: () => void;
}

export function PaymentMethodForm({
  id,
  onSubmit,
  defaultValues,
  onClose,
}: Props) {
  const form = useForm<z.infer<typeof PaymentMethodFormSchema>>({
    resolver: zodResolver(PaymentMethodFormSchema),
    defaultValues,
  });
  const [logo, setLogo] = useState<string>("");
  const { data: accountData } = useFindAccountsByUserId();
  const myAccounts: Account[] = accountData ?? [];

  const selectedAccountId = form.watch("accountId");
  const selectedIssuerId = form.watch("issuerId");

  const selectedBankId = selectedAccountId
    ? myAccounts.find((acc) => acc.id === selectedAccountId)?.bank?.id
    : "";

  const filteredIssuers = useFilteredIssuers(selectedBankId, ISSUERS, BANKS);

  const selectedAccountLogo =
    myAccounts.find((acc) => acc.id === selectedAccountId)?.bank?.logo || "";
  const selectedIssuerLogo =
    filteredIssuers.find((issuer) => issuer.id === selectedIssuerId)?.logo ||
    "";

  useEffect(() => {
    setLogo(selectedIssuerId ? selectedIssuerLogo : selectedAccountLogo);
    if (form.getValues("issuerId")) return;
    if (
      id &&
      defaultValues.issuerId &&
      selectedAccountId === defaultValues.accountId
    ) {
      form.setValue("issuerId", defaultValues.issuerId);
      return;
    }
    form.setValue("issuerId", filteredIssuers[0]?.id ?? "");
  }, [
    form,
    filteredIssuers,
    defaultValues.issuerId,
    defaultValues.accountId,
    id,
    selectedAccountId,
    selectedAccountLogo,
    selectedIssuerLogo,
    selectedIssuerId,
  ]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 max-w-sm"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {form.getValues("methodType") !== "현금" && (
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
                  placeholder={`원하는 결제수단 이름을 입력하세요.`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="methodType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>결제수단 유형</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="결제수단 유형을 선택하세요." />
                  </SelectTrigger>
                  <SelectContent>
                    {METHOD_TYPES.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
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
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>연결할 계좌</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="연결할 계좌를 선택하세요." />
                  </SelectTrigger>
                  <SelectContent>
                    {myAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
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
          name="issuerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>발급사</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="카드 발급사를 선택하세요." />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredIssuers.map((issuer) => (
                      <SelectItem key={issuer.id} value={issuer.id}>
                        {issuer.name}
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
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카드번호 뒷 4자리</FormLabel>
              <FormControl>
                <Input
                  placeholder="카드번호 뒷 4자리를 입력하세요."
                  maxLength={4}
                  {...field}
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
