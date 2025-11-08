import { Button } from "@/components/ui/button";
import { useCheckedItemsStore } from "@/lib/stores";
import { Trash2 } from "lucide-react";

export default function DeleteButton() {
  const { isDeleteMode, setDeleteMode } = useCheckedItemsStore();
  return (
    <Button
      className="cursor-pointer"
      variant={"ghost"}
      size={"icon"}
      onClick={() => setDeleteMode(!isDeleteMode)}
    >
      {isDeleteMode ? (
        <span className="bg-primary text-white rounded-full p-2">
          <Trash2 />
        </span>
      ) : (
        <Trash2 />
      )}
    </Button>
  );
}
