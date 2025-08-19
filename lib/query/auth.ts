import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "../actions";

export function useLogin() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message !== "NEXT_REDIRECT") {
          toast.error("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
      }
    },
  });
  return mutation;
}
