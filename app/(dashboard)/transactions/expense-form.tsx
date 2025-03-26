"use client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "@/components/ui/submit-button";
import { InsertExpense } from "@/lib/actions/transaction.actions";
import { CATEGORIES } from "@/lib/constants";
import { Category, Tag } from "@/lib/type";
import { format } from "date-fns";
import {
  Calendar,
  CircleDollarSign,
  Clock,
  CreditCard,
  File,
  Store,
  Tag as Tags,
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DatePicker } from "../../../components/transactions/date-picker";

interface ExpenseFormProps {
  tags: Tag[];
}

export default function ExpenseForm(tags: ExpenseFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // 1차 카테고리 상태
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  ); // 2차 카테고리 상태
  const [amount, setAmount] = useState<string>(""); // 금액 상태
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 선택된 태그 상태
  const [dateValue, setDateValue] = useState<Date | null>(null); // 날짜 상태

  // 선택된 1차 카테고리에 따른 서브카테고리 가져오기
  const subCategories =
    CATEGORIES.EXPENSES.find((cat) => cat.id === selectedCategory)
      ?.subCategories || [];
  const selectedCategoryData = CATEGORIES.EXPENSES.find(
    (cat) => cat.id === selectedCategory
  );

  // 숫자만 입력 가능하고 세 자리마다 콤마 추가
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    const formatted = new Intl.NumberFormat().format(Number(input)); // 세 자리마다 콤마 추가
    setAmount(formatted);
  };

  // 데이터를 저장하거나 전송할 때 숫자로 변환
  const getNumericAmount = () => {
    return Number(amount.replace(/,/g, "")); // 콤마 제거 후 숫자로 변환
  };
  const numericAmount = getNumericAmount(); // 숫자 값으로 변환

  const onClickTags = (tag: string) => {
    setSelectedTags(
      (prev) =>
        prev.includes(tag)
          ? prev.filter((t) => t !== tag) // 이미 선택된 태그는 제거
          : [...prev, tag] // 선택되지 않은 태그는 추가
    );
  };

  const [state, action] = useActionState(InsertExpense, undefined);
  useEffect(() => {
    const errorFields = [
      "categoryId",
      "subCategoryId",
      "amount",
      "tags",
      "date",
      "time",
      "description",
      "method",
    ];

    errorFields.forEach((field) => {
      const errorMessage = (
        state?.error as Record<string, string[]> | undefined
      )?.[field]?.[0];
      if (errorMessage) {
        toast.error(errorMessage); // 에러 메시지 출력
      }
    });
  }, [state?.error]);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message); // 성공 메시지 출력
    }
  }, [state?.status]); // state.status가 변경될 때 실행

  return (
    <form action={action}>
      <div className="w-full flex flex-col justify-center items-end">
        <Input type="hidden" name="amount" value={numericAmount} />
        {selectedTags.map((tag, index) => (
          <input key={index} type="hidden" name="tags[]" value={tag} />
        ))}

        <Input
          type="hidden"
          name="date"
          value={dateValue ? dateValue.toISOString() : ""}
        />
        <Input type="hidden" name="category" value={selectedCategory} />
        <Input
          type="hidden"
          name="subCategory"
          value={selectedSubCategory || ""}
        />
        {/* 1차 카테고리 Select */}
        <div className="relative w-full mb-3">
          <div
            className="absolute top-1 w-6 h-6 flex items-center justify-center rounded-full"
            style={{
              backgroundColor: selectedCategoryData?.color!, // 선택된 카테고리의 색상
            }}
          >
            <span className="text-sm">
              {selectedCategoryData?.icon!} {/* 선택된 카테고리의 아이콘 */}
            </span>
          </div>
          <div className="ml-10">
            <Select
              value={selectedCategory || ""}
              name="categoryId"
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-full mb-3">
                <SelectValue placeholder="1차 카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CATEGORIES.EXPENSES.map((category: Category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id || ""}
                      className="cursor-pointer"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              value={selectedSubCategory || ""}
              name="subCategoryId"
              onValueChange={(value) => setSelectedSubCategory(value)}
              disabled={!selectedCategory} // 1차 카테고리가 선택되지 않으면 비활성화
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="2차 카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subCategories.map((subCategory) => (
                    <SelectItem key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative w-full mb-3">
          <span className="absolute top-1 text-gray-500">
            <Store className="w-6 h-6" />
          </span>
          <span className="absolute top-13 text-gray-500">
            <CircleDollarSign className="w-6 h-6" />
          </span>
          <div className="ml-10">
            <Input
              className="mb-3"
              name="description"
              type="text"
              placeholder="지출 내역을 입력하세요"
            />
            <Input
              type="text"
              placeholder="지출 금액을 입력하세요"
              value={amount} // 상태 값 바인딩
              onChange={handleAmountChange}
            />
          </div>
        </div>

        <div className="relative w-full mb-3">
          <span className="absolute top-1 text-gray-500">
            <CreditCard className="w-6 h-6" />
          </span>
          <div className="ml-10">
            <Select name="method">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="지출 수단" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="현금" className="cursor-pointer">
                    현금
                  </SelectItem>
                  <SelectItem value="카드" className="cursor-pointer">
                    카드
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative flex items-center w-full mb-3">
          <span className="absolute top-1 text-gray-500">
            <Calendar className="w-6 h-6" />
          </span>
          <div className="ml-10">
            <DatePicker setDateValue={setDateValue} />
          </div>
          <span className="ml-2">
            <Clock className="w-6 h-6 text-gray-500" />
          </span>
          <div className="ml-2 w-full">
            <Input
              type="text"
              name="time"
              placeholder={`ex) ${format(new Date(), "HH:mm")}`}
            />
          </div>
        </div>

        <div className="relative flex items-center  w-full mb-3">
          <span className="absolute top-0 text-gray-500">
            <Tags className="w-6 h-6" />
          </span>
          <div className="ml-10">
            {tags.tags.map((tag) => (
              <Badge
                key={tag.id}
                className={`mr-2 py-1 cursor-pointer ${
                  selectedTags.includes(tag.id)
                    ? "bg-primary text-white"
                    : "bg-gray-500"
                }`}
                onClick={() => onClickTags(tag.id)}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="relative w-full mb-3">
          <span className="absolute top-1 text-gray-500">
            <File className="w-6 h-6" />
          </span>
          <div className="ml-10">
            <Input
              className="mb-3"
              name="memo"
              type="text"
              placeholder="메모"
            />
          </div>
        </div>
      </div>
      <SubmitButton>확인</SubmitButton>
    </form>
  );
}
