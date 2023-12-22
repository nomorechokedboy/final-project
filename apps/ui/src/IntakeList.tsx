import { For, Show } from "solid-js";
import { createHistoryQuery } from "./queries";
import { FromNow } from "./utils";
import dayjs from "dayjs";
import Nutrients from "./Nutrients";
import Badge from "./Badge";

export default function IntakeList() {
  const historyQuery = createHistoryQuery();
  const isEmpty = () => historyQuery.data?.pages[0].data.data?.length === 0;

  return (
    <div class="flex gap-5 flex-col p-5">
      <Show when={!isEmpty()}>
        <For each={historyQuery.data?.pages}>
          {(page) => (
            <For each={page.data.data}>
              {(intake) => (
                <div class="card card-side bg-base-100 shadow-xl">
                  <figure class="flex-[0.5]">
                    <img src={intake.image} alt="Intake image" />
                  </figure>
                  <div class="card-body flex-[0.5] flex flex-col">
                    <h2 class="card-title">{intake.name}</h2>
                    <Nutrients
                      calcium={intake.calcium}
                      calories={intake.calories}
                      cholesterol={intake.cholesterol}
                      fiber={intake.fiber}
                      iron={intake.iron}
                      potassium={intake.potassium}
                      protein={intake.protein}
                      saturated={intake.saturated}
                      sodium={intake.sodium}
                      sugar={intake.sugar}
                      totalCarbohydrate={intake.totalCarbohydrate}
                      totalFat={intake.totalFat}
                      vitaminD={intake.vitaminD}
                    />
                    <Badge>{intake.rate?.toFixed(1)}</Badge>
                    <div class="stat-desc mt-auto">
                      {FromNow(intake.createdAt ?? dayjs().toString())}
                    </div>
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
          </div>
        </div>
      </Show>
    </div>
  );
}
