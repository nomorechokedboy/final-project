import { For, Show } from "solid-js";
import { createHistoryQuery } from "./queries";

export default function IntakeList() {
  const historyQuery = createHistoryQuery();
  const isEmpty = () => historyQuery.data?.pages[0].data.data?.length === 0;
  console.log({ isEmpty: isEmpty() });

  return (
    <div class="flex gap-5 flex-col p-5">
      <Show when={!isEmpty()}>
        <For each={historyQuery.data?.pages}>
          {(page) => (
            <For each={page.data.data}>
              {(intake) => (
                <div class="card card-side bg-base-100 shadow-xl">
                  <figure class="flex-[0.5]">
                    <img
                      src="https://images.squarespace-cdn.com/content/v1/5637e7e2e4b0a5cbcf21d677/1554268978648-5KN32GXX1F5VDR5IE99H/image-asset.jpeg?format=2500w"
                      alt="Movie"
                    />
                  </figure>
                  <div class="card-body flex-[0.5]">
                    <h2 class="card-title">Today intake</h2>
                    <p>This will be charts in the future</p>
                  </div>
                </div>
              )}
            </For>
          )}
        </For>
      </Show>
      <Show when={isEmpty()}>
        <div class="max-w-4xl mx-auto px-10 py-4">
          <div class="flex flex-col justify-center py-12 items-center">
            <div class="flex justify-center items-center">
              <img
                class="w-64 h-64"
                src="https://res.cloudinary.com/daqsjyrgg/image/upload/v1690257804/jjqw2hfv0t6karxdeq1s.svg"
                alt="Image empty states"
              />
            </div>
            <h1 class="text-gray-700 font-medium text-2xl text-center mb-3">
              No Data
            </h1>
            <p class="text-gray-500 text-center mb-6"></p>
            <div class="flex flex-col justify-center">
              <button class="btn btn-primary btn-sm">
                Track your meals now
              </button>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
