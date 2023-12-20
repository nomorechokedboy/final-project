import { createInfiniteQuery } from "@tanstack/solid-query";
import { FoodApi } from "../http";
import { useSearchParams } from "@solidjs/router";

export function createFindFoods() {
  const [searchParams] = useSearchParams();

  return createInfiniteQuery(() => ({
    queryKey: ["foods", searchParams.q],
    initialPageParam: 1,
    queryFn({ pageParam }) {
      return FoodApi.foodsGet(pageParam, undefined, undefined, searchParams.q);
    },
    getNextPageParam(lastPage) {
      if (lastPage.data.data?.length == 10) {
        return lastPage.data.page! + 1;
      }

      return undefined;
    },
  }));
}
