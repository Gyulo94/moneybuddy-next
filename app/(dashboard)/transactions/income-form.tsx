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
import { CATEGORIES, TAGS, TIMES } from "@/lib/constants";
import {
  Calendar,
  CircleDollarSign,
  Clock,
  CreditCard,
  File,
  Store,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { DatePicker } from "../../../components/transactions/date-picker";

export default function IncomeForm() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // 1차 카테고리 상태

  const [amount, setAmount] = useState<string>(""); // 금액 상태
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 선택된 태그 상태

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
  console.log("저장할 금액:", numericAmount); // 숫자 값 출력

  const onClickTags = (tag: string) => {
    setSelectedTags(
      (prev) =>
        prev.includes(tag)
          ? prev.filter((t) => t !== tag) // 이미 선택된 태그는 제거
          : [...prev, tag] // 선택되지 않은 태그는 추가
    );
  };

  console.log("선택된 태그:", selectedTags); // 선택된 태그 출력

  return (
    <form>
      <div className="w-full flex flex-col justify-center items-end">
        {/* 1차 카테고리 Select */}
        <div className="relative w-full mb-3">
          <div
            className="absolute top-1 w-6 h-6 flex items-center justify-center rounded-full"
            style={{
              backgroundColor: selectedCategoryData?.color || "", // 선택된 카테고리의 색상
            }}
          >
            <span className="text-sm">
              {selectedCategoryData?.icon || ""}{" "}
              {/* 선택된 카테고리의 아이콘 */}
            </span>
          </div>
          <div className="ml-10">
            <Select
              value={selectedCategory || ""}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-full mb-3">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CATEGORIES.EXPENSES.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id ?? ""}
                      className="cursor-pointer"
                    >
                      {category.name}
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
              type="text"
              placeholder="수입 내역을 입력하세요"
            />
            <Input
              type="text"
              placeholder="수입 금액을 입력하세요"
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
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="현금" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="cash" className="cursor-pointer">
                    현금
                  </SelectItem>
                  <SelectItem value="card" className="cursor-pointer">
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
            <DatePicker />
          </div>
          <span className="ml-2">
            <Clock className="w-6 h-6 text-gray-500" />
          </span>
          <div className="ml-2 w-full">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="시간 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TIMES.map((time) => (
                    <SelectItem
                      key={time}
                      value={time}
                      className="cursor-pointer"
                    >
                      {time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative flex items-center  w-full mb-3">
          <span className="absolute top-0 text-gray-500">
            <Tag className="w-6 h-6" />
          </span>
          <div className="ml-10">
            {TAGS.map((tag) => (
              <Badge
                key={tag}
                className={`mr-2 py-1 cursor-pointer ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-white"
                    : "bg-gray-500"
                }`}
                onClick={() => onClickTags(tag)} // 클릭 이벤트 처리
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="relative w-full mb-3">
          <span className="absolute top-1 text-gray-500">
            <File className="w-6 h-6" />
          </span>
          <div className="ml-10">
            <Input className="mb-3" type="text" placeholder="메모" />
          </div>
        </div>
      </div>
      <SubmitButton>확인</SubmitButton>
    </form>
  );
}
