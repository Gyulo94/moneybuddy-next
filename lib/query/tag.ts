import { useQuery } from "@tanstack/react-query";
import { findTagsByUserId } from "../actions";

export function useFindTagsByUserId() {
  const query = useQuery({
    queryKey: ["tags"],
    queryFn: findTagsByUserId,
    retry: false,
  });
  return query;
}
