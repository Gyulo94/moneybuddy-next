"use client";

import { useFindPaymentMethodsByUserId } from "@/lib/query";
import { PaymentMethod } from "@/lib/types";
import PaymentMethodCard from "./payment-method-card";

export default function PaymentMethodContent() {
  const { data } = useFindPaymentMethodsByUserId();
  const paymentMethods = data ?? [];
  // console.log("paymentMethods ", paymentMethods);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
      {paymentMethods.length > 0 ? (
        paymentMethods.map((paymentMethod: PaymentMethod) => (
          <PaymentMethodCard
            key={paymentMethod.id}
            id={paymentMethod.id}
            title={paymentMethod.name}
            issuer={paymentMethod.issuer!}
            cardNumber={paymentMethod.cardNumber}
            type={paymentMethod.methodType}
            isCash={paymentMethod.methodType === "현금"}
          />
        ))
      ) : (
        <div className="size-full text-center my-20 col-span-3">
          <p className="text-muted-foreground">등록된 결제수단이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
