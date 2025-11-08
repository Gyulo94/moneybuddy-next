import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";
import { Input } from "../../ui/input";
import DateController from "./date-controller";
import DeleteButton from "./delete-button";

interface Props {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

export default function CustomToolbar({ date, onNavigate }: Props) {
  return (
    <div>
      <DateController date={date} onNavigate={onNavigate} />
      <div className="w-full flex justify-between items-center mb-5">
        <Input className="w-full max-w-[200px] h-7" />
        <div className="flex">
          <Button className="cursor-pointer" variant={"ghost"} size={"icon"}>
            <ListPlus />
          </Button>
          <DeleteButton />
        </div>
      </div>
    </div>
  );
}
