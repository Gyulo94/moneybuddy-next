import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEFAULT_BANK_LOGO } from "@/lib/constants";
import { useConfirm } from "@/lib/hooks/use-confirm";
import { useDeleteAccount } from "@/lib/query";
import { useEditPaymentMethodDialogStore } from "@/lib/stores";
import { Issuer } from "@/lib/types";
import { EllipsisIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  id: string;
  title: string;
  issuer: Issuer;
  cardNumber: string;
  type: string;
  isCash: boolean;
}

export default function PaymentMethodCard({
  id,
  title,
  issuer,
  cardNumber,
  type,
  isCash,
}: Props) {
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 결제수단을 삭제하시겠습니까?",
    `삭제된 결제수단은 복구할 수 없습니다.`
  );
  const { onOpen: onEditPaymentMethodOpen } = useEditPaymentMethodDialogStore();
  const { mutate: deleteAccount } = useDeleteAccount();

  function onEditPaymentMethod() {
    onEditPaymentMethodOpen(id);
  }

  async function onDeleteAccount() {
    const ok = await confirm();
    if (ok) {
      deleteAccount(id);
    }
  }

  return (
    <>
      <ConfirmDialog />
      <Card className="py-3 gap-3 lg:gap-0 shadow-md">
        <CardHeader className="flex items-center justify-between px-2">
          <CardTitle>
            {title}
            {issuer && (
              <span className="ml-2 text-muted-foreground font-normal text-xs">
                {issuer.name}({cardNumber})
              </span>
            )}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                size={"sm"}
                className="cursor-pointer text-muted-foreground p-0"
              >
                <EllipsisIcon className="size-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="absolute top-0 -right-12"
              align="start"
            >
              <DropdownMenuItem
                onClick={isCash ? undefined : onEditPaymentMethod}
              >
                수정
              </DropdownMenuItem>
              <DropdownMenuItem onClick={isCash ? undefined : onDeleteAccount}>
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex items-center px-0 gap-0 lg:justify-center h-[180px] text-sm">
          <div className="relative w-[50%] aspect-auto flex justify-center px-0 lg:px-2">
            <Image
              src={issuer.logo || DEFAULT_BANK_LOGO}
              alt={issuer.name || "발급사 로고"}
              width={100}
              height={100}
              className="object-center object-cover"
            />
          </div>
          <div className="w-[50%] h-full flex flex-col justify-center gap-2 border-l pl-6 pr-0 lg:px-6">
            <p>
              타입: <span className="text-muted-foreground">{type}</span>
            </p>
            {/* <p>
              잔액:{" "}
              <span className="text-muted-foreground">
                {currentBalance.toLocaleString()} 원
              </span>
            </p> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
