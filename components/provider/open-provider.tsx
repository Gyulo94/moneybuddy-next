import CreateAccountDialog from "@/components/account/form/create-account-dialog";
import EditAccountDialog from "../account/form/edit-account-dialog";
import CreateBudgetDialog from "../budget/form/create-budget-dialog";
import CreatePaymentMethodDialog from "../payment-method/form/create-payment-method-dialog";
import EditPaymentMethodDialog from "../payment-method/form/edit-payment-method-dialog";
import CreateTransactionDialog from "../transactions/form/create-transaction-dialog";
import EditTransactionDialog from "../transactions/form/edit-transaction-dialog";

export default function OpenProvider() {
  return (
    <>
      <CreateAccountDialog />
      <EditAccountDialog />
      <CreatePaymentMethodDialog />
      <EditPaymentMethodDialog />
      <CreateTransactionDialog />
      <EditTransactionDialog />
      <CreateBudgetDialog />
    </>
  );
}
