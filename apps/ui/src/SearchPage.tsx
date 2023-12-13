import { useSearchParams } from "@solidjs/router";
import { For } from "solid-js";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  console.log({ ...searchParams });

  return (
    <div class="flex gap-5 flex-col p-5">
      <For each={Array(10)}>
        {() => (
          <div class="card card-side bg-base-100 shadow-xl">
            <figure class="flex-[0.5]">
              <img
                src="https://images.squarespace-cdn.com/content/v1/5637e7e2e4b0a5cbcf21d677/1554268978648-5KN32GXX1F5VDR5IE99H/image-asset.jpeg?format=2500w"
                alt="Movie"
              />
            </figure>
            <div class="card-body flex-[0.5]">
              <h2 class="card-title">Food name here</h2>
              <p>Nutrients go here...</p>
              <div
                class="radial-progress text-xs"
                style={{
                  "--value": (5 / 5) * 100,
                  "--size": "2rem",
                }}
                role="progressbar"
              >
                3.5
              </div>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
