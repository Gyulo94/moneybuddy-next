import { useCheckedItemsStore, useFilterStore } from "@/lib/stores";
import { TransactionDetail } from "@/lib/types";
import { Checkbox } from "../../ui/checkbox";

interface Props {
  detail: TransactionDetail;
}

export default function TransactionDetailItem({ detail }: Props) {
  const { showExpense, showIncome } = useFilterStore();
  const { isDeleteMode, checkedItems, setCheckedItems } =
    useCheckedItemsStore();

  const handleCheckboxChange = (id: string) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [id]: !(checkedItems as Record<string, boolean>)[id],
    };
    setCheckedItems(updatedCheckedItems);
  };
  return (
    <li
      key={detail.id}
      className={`flex py-3 cursor-pointer ${
        detail.type === "EXPENSE"
          ? "hover:bg-red-600/10"
          : "hover:bg-blue-600/10"
      }`}
    >
      <div className="px-6 flex justify-start items-center w-full">
        {isDeleteMode && (
          <Checkbox
            className="mr-3 cursor-pointer"
            checked={!!(checkedItems as Record<string, boolean>)[detail.id]}
            onCheckedChange={() => handleCheckboxChange(detail.id)}
          />
        )}
        <div className="flex justify-start items-center w-full">
          <span className="text-sm text-gray-500 dark:text-gray-300 w-[5%]">
            {detail.time}
          </span>
          <div className="ml-10 flex md:justify-start justify-center items-center w-[10%]">
            <div className="text-sm text-gray-700 dark:text-gray-300 relative">
              <div
                className="absolute -bottom-3 -left-6 md:-left-11 md:-bottom-0.5 size-6 flex items-center justify-center rounded-full"
                style={{
                  backgroundColor: detail.category.color || "",
                }}
              >
                <span className="text-sm">{detail.category.icon || ""}</span>
              </div>
              <p className="hidden md:block">{detail.category.name}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 text-left md:w-[15%] hidden md:block">
            {detail.subCategory?.name ?? ""}
          </p>
          <div className="text-sm text-gray-600 dark:text-gray-300 w-[40%] md:w-[20%]">
            {detail.description}
          </div>
          <div
            className={`text-sm text-gray-700 dark:text-gray-300 text-right w-[35%] flex justify-center md:w-[20%]`}
          >
            {new Intl.NumberFormat().format(
              showExpense && showIncome && detail.type === "EXPENSE"
                ? -detail.amount
                : detail.amount
            )}{" "}
            원
          </div>
          <div className="text-sm md:w-[15%] text-muted-foreground hidden md:block">
            {detail.tags.map((tag) => (
              <span key={tag.id}>#{tag.name} </span>
            ))}
          </div>
          {detail.memo && (
            <div className="text-sm text-gray-400 dark:text-muted-foreground hidden md:block md:w-[12%]">
              {detail.memo}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
