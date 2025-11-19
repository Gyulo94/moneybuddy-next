import DateController from "./date-controller";
import DeleteButton from "./delete-button";

interface Props {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

export default function CustomToolbar({ date, onNavigate }: Props) {
  return (
    <div className="w-full flex justify-between items-center">
      <DateController date={date} onNavigate={onNavigate} />
      <DeleteButton />
    </div>
  );
}
