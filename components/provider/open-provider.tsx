import CreateAccountDialog from "@/components/account/form/create-account-dialog";
import EditAccountDialog from "../account/form/edit-account-dialog";
import CreatePaymentMethodDialog from "../payment-method/form/create-payment-method-dialog";
import EditPaymentMethodDialog from "../payment-method/form/edit-payment-method-dialog";

export default function OpenProvider() {
  return (
    <>
      <CreateAccountDialog />
      <EditAccountDialog />
      <CreatePaymentMethodDialog />
      <EditPaymentMethodDialog />
    </>
  );
}
