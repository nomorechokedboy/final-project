import { For, Show } from "solid-js";
import { createFindFoods } from "./queries";

export default function FoodList() {
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
              <div class="card card-side bg-base-100 shadow-xl">
                <figure class="flex-[0.5]">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/003/170/825/original/isolated-food-plate-fork-and-spoon-design-free-vector.jpg"
                    alt="Food image"
                  />
                </figure>
                <div class="card-body flex-[0.5]">
                  <h2 class="card-title">{food.name}</h2>
                  <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn m-1 btn-sm">
                      Show nutrients
                    </div>
                    <ul
                      tabindex="0"
                      class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      Nutrients: Calories: {food.calories?.toFixed(1)}, total
                      fat:
                      {food.totalFat?.toFixed(1)}, saturated:{" "}
                      {food.saturated?.toFixed(1)}, cholesterol:{" "}
                      {food.cholesterol?.toFixed(1)}, sodium:{" "}
                      {food.sodium?.toFixed(1)}, total carbohydrate:{" "}
                      {food.totalCarbohydrate?.toFixed(1)}, fiber:
                      {food.fiber?.toFixed(1)}, sugar: {food.sugar?.toFixed(1)},
                      protein:
                      {food.protein?.toFixed(1)}, vitamin D:{" "}
                      {food.vitaminD?.toFixed(1)}, calcium:
                      {food.calcium?.toFixed(1)}, iron: {food.iron?.toFixed(1)},
                      potassium:
                      {food.potassium?.toFixed(1)}
                    </ul>
                  </div>
                  <div
                    class="radial-progress text-xs"
                    style={{
                      "--value": (food.rate ?? 0 / 5) * 100,
                      "--size": "2rem",
                    }}
                    role="progressbar"
                  >
                    {food.rate?.toFixed(1)}
                  </div>
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
