import { For } from "solid-js";

export default function IntakeList() {
  return (
    <div class="flex gap-5 flex-col p-5">
      <For each={Array(100)}>
        {() => (
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
    </div>
  );
}
