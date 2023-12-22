import { For, Show } from "solid-js";
import { createFindFoods } from "./queries";
import Badge from "./Badge";
import Nutrients from "./Nutrients";

export type FoodListProps = {
  onClick?: (foodId: number) => void;
};

export default function FoodList(props: FoodListProps) {
  const findFoodsQuery = createFindFoods();

  function handleFetchNextPage() {
    findFoodsQuery.fetchNextPage();
  }

  return (
    <>
      <For each={findFoodsQuery.data?.pages}>
        {(foodData) => (
          <For each={foodData.data.data}>
            {(food) => (
              <div
                class="card card-side bg-base-100 shadow-xl"
                onClick={() => {
                  props.onClick?.(food.id!);
                }}
              >
                <figure class="flex-[0.5]">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/003/170/825/original/isolated-food-plate-fork-and-spoon-design-free-vector.jpg"
                    alt="Food image"
                  />
                </figure>
                <div class="card-body flex-[0.5]">
                  <h2 class="card-title">{food.name}</h2>
                  <Nutrients
                    calcium={food.calcium}
                    calories={food.calories}
                    cholesterol={food.cholesterol}
                    fiber={food.fiber}
                    iron={food.iron}
                    potassium={food.potassium}
                    protein={food.protein}
                    saturated={food.saturated}
                    sodium={food.sodium}
                    sugar={food.sugar}
                    totalCarbohydrate={food.totalCarbohydrate}
                    totalFat={food.totalFat}
                    vitaminD={food.vitaminD}
                  />
                  <Badge>{food.rate?.toFixed(1)}</Badge>
                </div>
              </div>
            )}
          </For>
        )}
      </For>
      <Show when={findFoodsQuery.hasNextPage}>
        <button class="btn btn-neutral btn-sm" onClick={handleFetchNextPage}>
          Load more
        </button>
      </Show>
    </>
  );
}
