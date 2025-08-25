"use client";

import { useFindAccountsByUserId } from "@/lib/query";
import { Account } from "@/lib/types";
import AccountCard from "./account-card";

export default function AccountContent() {
  const { data } = useFindAccountsByUserId();
  const accounts = data ?? [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
      {accounts.length > 0 ? (
        accounts.map((account: Account) => (
          <AccountCard
            key={account.id}
            title={account.name}
            currentBalance={account.currentBalance}
            bankName={account.bankName}
            number={account.accountNumber}
            url={account.logo}
            type={account.accountType}
            isAccount={true}
          />
        ))
      ) : (
        <div className="size-full text-center my-20 col-span-3">
          <p className="text-muted-foreground">등록된 계좌가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
