import { createForm } from "@felte/solid";
import Badge from "./Badge";
import { createCalcHSRMutation } from "./queries";
import { z } from "zod";
import { validator } from "@felte/validator-zod";
import { For, Show, createEffect, createSignal } from "solid-js";
import Errors from "./Errors";
import AdditionalHSRForm from "./AdditionalHSRForm";

const numberCondition = z
  .number({
    required_error: "This nutrition is required",
    invalid_type_error: "Nutrition must be number",
  })
  .nonnegative()
  .safe()
  .default(0);
const schema = z.object({
  category: z.enum(["1", "1D", "2", "2D", "3", "3D"] as const),
  concentratedFnvl: numberCondition,
  energy: numberCondition,
  fibre: numberCondition,
  fnvl: numberCondition,
  name: z.string().min(1, "Name is required"),
  protein: numberCondition,
  saturatedFat: numberCondition,
  sodium: numberCondition,
  totalSugars: numberCondition,
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
  let dialog: HTMLDialogElement | undefined;
  const [isAddFood, setIsAddFood] = createSignal(false);
  const { form, errors, data } = createForm<FormType>({
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

  createEffect(() => {
    if (calcHSRMutation.isSuccess) {
      setIsAddFood(true);
    } else {
      setIsAddFood(false);
    }
  });

  return (
    <div class="flex gap-5 flex-col p-5 h-full">
      <dialog id="my_modal_3" class="modal" ref={dialog}>
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <Show when={isAddFood()}>
            <AdditionalHSRForm
              calories={data().energy}
              category={data().category}
              concentrated={data().concentratedFnvl}
              fiber={data().fibre}
              saturated={data().saturatedFat}
              name={data().name}
              fnvl={data().fnvl}
              protein={data().protein}
              sodium={data().sodium}
              sugar={data().totalSugars}
              rate={calcHSRMutation.data?.data.data!}
            />
          </Show>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </div>
      </dialog>
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
          <Errors errors={errors().name} />
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
          <Errors errors={errors().category} />
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
          <Errors errors={errors().energy} />
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
          <Errors errors={errors().concentratedFnvl} />
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
          <Errors errors={errors().fibre} />
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
          <Errors errors={errors().fnvl} />
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
          <Errors errors={errors().protein} />
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
          <Errors errors={errors().saturatedFat} />
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
          <Errors errors={errors().sodium} />
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
          <Errors errors={errors().totalSugars} />
        </div>
      </form>
      <div>
        <span>
          Rate:{" "}
          <Badge>{calcHSRMutation.data?.data.data?.toFixed(1) ?? 0}</Badge>
        </span>
      </div>
      <div class="flex items-center gap-5">
        <button form="form1" class="btn btn-primary mt-auto">
          <span
            classList={{ "loading loading-spinner": calcHSRMutation.isPending }}
          />
          {calcHSRMutation.isPending ? "Loading" : "Calculate"}
        </button>
        <Show when={isAddFood()}>
          <button
            onClick={() => {
              dialog?.showModal();
            }}
          >
            Save
          </button>
        </Show>
      </div>
    </div>
  );
}
