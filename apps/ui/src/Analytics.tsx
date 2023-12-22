import { createForm } from "@felte/solid";
import Badge from "./Badge";
import { createCalcHSRMutation } from "./queries";
import { z } from "zod";
import { validator } from "@felte/validator-zod";
import { For, Show } from "solid-js";

const numberCondition = z
  .number({
    required_error: "This nutrition is required",
    invalid_type_error: "Nutrition must be number",
  })
  .nonnegative()
  .safe()
  .default(0);
const schema = z.object({
  energy: numberCondition,
  concentratedFnvl: numberCondition,
  fibre: numberCondition,
  fnvl: numberCondition,
  protein: numberCondition,
  saturatedFat: numberCondition,
  sodium: numberCondition,
  totalSugars: numberCondition,
  name: z.string().min(1, "Name is required"),
  category: z.enum(["1", "1D", "2", "2D", "3", "3D"] as const),
});

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      form: any;
    }
  }
}

type FormType = z.infer<typeof schema>;

export default function HSRCalc() {
  const { form, errors } = createForm<FormType>({
    async onSubmit(values) {
      console.log({ values });

      try {
        await calcHSRMutation.mutateAsync(values);
      } catch (err) {
        console.error("CalcHSR err: ", err);
      }
    },
    extend: validator({ schema }),
  });
  const calcHSRMutation = createCalcHSRMutation();

  return (
    <div class="flex gap-5 flex-col p-5 h-full">
      <form use:form id="form1" class="grid grid-cols-2 gap-5">
        <div>
          <div class="label">
            <span class="label-text">Name</span>
          </div>
          <input
            step="any"
            type="text"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Name..."
            name="name"
          />
          <Show when={errors().name !== null}>
            <For each={errors().name}>
              {(err) => <p class="text-xs text-red-600">{err}</p>}
            </For>
          </Show>
        </div>
        <div>
          <div class="label">
            <span class="label-text">Category</span>
          </div>
          <select
            class="select select-bordered select-sm w-full max-w-xs"
            name="category"
          >
            <option selected>1</option>
            <option>1D</option>
            <option>2</option>
            <option>2D</option>
            <option>3</option>
            <option>3D</option>
          </select>
          <Show when={errors().category !== null}>
            <For each={errors().category}>
              {(err) => <p class="mt-2 text-xs text-red-600">{err}</p>}
            </For>
          </Show>
        </div>
        <div>
          <div class="label">
            <span class="label-text">Calories</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Calories..."
            name="energy"
          />
          <Show when={errors().energy !== null}>
            <For each={errors().energy}>
              {(err) => <p class="mt-2 text-xs text-red-600">{err}</p>}
            </For>
          </Show>
        </div>
        <div>
          <div class="label">
            <span class="label-text">Concentrated</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Concentrated..."
            name="concentratedFnvl"
          />
          <Show when={errors().concentratedFnvl !== null}>
            <For each={errors().concentratedFnvl}>
              {(err) => <p class="mt-2 text-xs text-red-600">{err}</p>}
            </For>
          </Show>
        </div>
        <div>
          <div class="label">
            <span class="label-text">Fiber</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Fiber..."
            name="fibre"
          />
          <Show when={errors().fibre !== null}>
            <For each={errors().fibre}>
              {(err) => <p class="mt-2 text-xs text-red-600">{err}</p>}
            </For>
          </Show>
        </div>
        <div>
          <div class="label">
            <span class="label-text">FNVL</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="FNVL..."
            name="fnvl"
          />
          <Show when={errors().fnvl !== null}>
            <For each={errors().fnvl}>
              {(err) => <p class="mt-2 text-xs text-red-600">{err}</p>}
            </For>
          </Show>
        </div>
        <div>
          <div class="label">
            <span class="label-text">Protein</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Protein..."
            name="protein"
          />
          <Show when={errors().protein !== null}>
            <For each={errors().protein}>
              {(err) => <p class="mt-2 text-xs text-red-600">{err}</p>}
            </For>
          </Show>
        </div>
        <div>
          <div class="label">
            <span class="label-text">Saturated</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Saturated..."
            name="saturatedFat"
          />
          <Show when={errors().saturatedFat !== null}>
            <For each={errors().saturatedFat}>
              {(err) => <p class="mt-2 text-xs text-red-600">{err}</p>}
            </For>
          </Show>
        </div>
        <div>
          <div class="label">
            <span class="label-text">Sodium</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Sodium..."
            name="sodium"
          />
          <Show when={errors().sodium !== null}>
            <For each={errors().sodium}>
              {(err) => <p class="mt-2 text-xs text-red-600">{err}</p>}
            </For>
          </Show>
        </div>
        <div>
          <div class="label">
            <span class="label-text">Sugar</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Sugar..."
            name="totalSugars"
          />
          <Show when={errors().totalSugars !== null}>
            <For each={errors().totalSugars}>
              {(err) => <p class="mt-2 text-xs text-red-600">{err}</p>}
            </For>
          </Show>
        </div>
      </form>
      <div>
        <span>
          Rate:{" "}
          <Badge>{calcHSRMutation.data?.data.data?.toFixed(1) ?? 0}</Badge>
        </span>
      </div>
      <button form="form1" class="btn btn-primary mt-auto">
        <span
          classList={{ "loading loading-spinner": calcHSRMutation.isPending }}
        />
        {calcHSRMutation.isPending ? "Loading" : "Calculate"}
      </button>
    </div>
  );
}
