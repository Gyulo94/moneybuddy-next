export type { Account, AccountType } from "./account";

export type OpenState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
