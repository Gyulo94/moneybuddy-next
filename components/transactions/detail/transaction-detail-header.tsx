import { useCheckedItemsStore } from "@/lib/stores";
import { Transaction, TransactionDetail } from "@/lib/types";
import { Checkbox } from "../../ui/checkbox";

interface Props {
  totalAmount: number;
  handleDateCheckboxChange: (details: TransactionDetail[]) => void;
  toggleDetails: (date: string) => void;
  transaction: Transaction;
}

export default function TransactionDetailHeader({
  totalAmount,
  handleDateCheckboxChange,
  toggleDetails,
  transaction,
}: Props) {
  const { isDeleteMode, checkedItems } = useCheckedItemsStore();
  return (
    <div
      className="flex justify-between items-center cursor-pointer px-6 bg-accent"
      onClick={() => toggleDetails(transaction.date)}
    >
      {isDeleteMode ? (
        <div className="flex justify-center items-center">
          <Checkbox
            className="mr-3 size-6"
            checked={transaction.details.every(
              (detail: TransactionDetail) =>
                !!(checkedItems as Record<string, boolean>)[detail.id]
            )}
            onCheckedChange={() =>
              handleDateCheckboxChange(transaction.details)
            }
            onClick={(e) => e.stopPropagation()}
          />
          <span className="text-lg dark:text-gray-300">{transaction.date}</span>
        </div>
      ) : (
        <span className="text-lg dark:text-gray-300">{transaction.date}</span>
      )}
      <span className="text-md text-gray-600 dark:text-gray-300 font-semibold">
        {new Intl.NumberFormat().format(totalAmount)} 원
      </span>
    </div>
  );
}
