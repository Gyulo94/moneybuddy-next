export type { Account, AccountType } from "./account";
export type { Bank } from "./bank";
export type { Issuer } from "./issuer";
export type { MethodType, PaymentMethod } from "./payment-method";

export type OpenState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export type EditOpenState = {
  id: string | undefined;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};
