export type { Account, AccountType } from "./account";

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
