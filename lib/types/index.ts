export type { Account, AccountType } from "./account";
export type { Bank } from "./bank";
export type { Category, SubCategory } from "./category";
export type { Issuer } from "./issuer";
export type { MethodType, PaymentMethod } from "./payment-method";
export type { Tag } from "./tag";
export type {
  Transaction,
  TransactionByDate,
  TransactionDetail,
} from "./transaction";

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

export type FieldError = {
  type: string;
  message?: string;
  ref?: HTMLInputElement;
  types?: MultipleFieldErrors;
  root?: FieldError;
};

export type MultipleFieldErrors = {
  [key: string]: FieldError["message"] | FieldError;
};

export type FormErrors<TFieldValues> = {
  [K in keyof TFieldValues]?: FieldError;
};
