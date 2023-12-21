import { createInfiniteQuery, createMutation } from "@tanstack/solid-query";
import { FoodApi, HSRApi } from "../http";
import { useSearchParams } from "@solidjs/router";
import { HsrHSRCalcBody } from "../http/gateway";

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

export function createHistoryQuery() {
  const uid = localStorage.getItem("uid");

  return createInfiniteQuery(() => ({
    queryKey: ["history"],
    initialPageParam: 1,
    queryFn({ pageParam }) {
      return HSRApi.hsrIntakesGet(uid!, pageParam, undefined, undefined);
    },
    getNextPageParam(lastPage, _, lastPageParam) {
      if (lastPage.data.data?.length == 10) {
        return lastPageParam + 1;
      }

      return undefined;
    },
  }));
}

export function createDetectMutation() {
  return createMutation(() => ({
    mutationFn(image: File) {
      return HSRApi.hsrDetectPost({ image });
    },
  }));
}

export function createCalcHSRMutation() {
  return createMutation(() => ({
    mutationFn(body: HsrHSRCalcBody) {
      return HSRApi.hsrCalcPost(body);
    },
  }));
}
