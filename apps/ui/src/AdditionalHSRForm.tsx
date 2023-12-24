import { createForm } from "@felte/solid";
import { z } from "zod";
import Errors from "./Errors";
import { extend } from "dayjs";
import { validator } from "@felte/validator-zod";
import { createFoodMutation } from "./queries";
import { createEffect } from "solid-js";
import toasts from "./toast";
import toast from "./toast";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      form: any;
    }
  }
}

const numberCondition = z
  .number({
    required_error: "This nutrition is required",
    invalid_type_error: "Nutrition must be number",
  })
  .nonnegative()
  .safe()
  .default(0);

const categoryEnum = ["1", "1D", "2", "2D", "3", "3D"] as const;

const schema = z.object({
  calcium: numberCondition,
  calories: numberCondition,
  category: z.enum(categoryEnum),
  cholesterol: numberCondition,
  concentrated: numberCondition,
  fiber: numberCondition,
  fnvl: numberCondition,
  iron: numberCondition,
  posstasium: numberCondition,
  protein: numberCondition,
  rate: z
    .number({
      required_error: "This nutrition is required",
      invalid_type_error: "Nutrition must be number",
    })
    .min(0)
    .max(5)
    .nonnegative()
    .safe()
    .default(0),
  name: z.string().min(1, "Name is required"),
  saturated: numberCondition,
  sodium: numberCondition,
  sugar: numberCondition,
  totalCarbohydrate: numberCondition,
  totalFat: numberCondition,
  vitaminD: numberCondition,
});

type FormType = z.infer<typeof schema>;

export type AdditionalHSRFormProps = {
  calories: number;
  category: FormType["category"];
  concentrated: number;
  fiber: number;
  fnvl: number;
  name: string;
  protein: number;
  rate: number;
  saturated: number;
  sodium: number;
  sugar: number;
};

export default function AdditionalHSRForm(props: AdditionalHSRFormProps) {
  const { toastify } = toast;
  const foodMutation = createFoodMutation();
  console.log({ rate: props.rate });

  const { form, errors } = createForm<FormType>({
    initialValues: {
      calories: props.calories,
      category: props.category,
      concentrated: props.concentrated,
      fiber: props.fiber,
      fnvl: props.fnvl,
      name: props.name,
      protein: props.protein,
      rate: props.rate,
      saturated: props.saturated,
      sodium: props.sodium,
      sugar: props.sugar,
    },
    extend: validator({ schema }),
    async onSubmit(values) {
      try {
        await foodMutation.mutateAsync(values);
        toastify({
          id: crypto.randomUUID(),
          type: "success",
          description: "Create food rate success!",
        });
      } catch (err) {
        console.error("AdditionalHSRForm err: ", err);
      }
    },
  });
  // create

  return (
    <>
      <form use:form id="form2" class="grid grid-cols-2 gap-5">
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
            <span class="label-text">Rate</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Rate..."
            name="rate"
          />
          <Errors errors={errors().rate} />
        </div>
        <div>
          <div class="label">
            <span class="label-text">Calcium</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Calcium..."
            name="calcium"
          />
          <Errors errors={errors().calcium} />
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
            name="calories"
          />
          <Errors errors={errors().calories} />
        </div>
        <div>
          <div class="label">
            <span class="label-text">Cholesterol</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Cholesterol..."
            name="cholesterol"
          />
          <Errors errors={errors().cholesterol} />
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
            name="concentrated"
          />
          <Errors errors={errors().concentrated} />
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
            name="fiber"
          />
          <Errors errors={errors().fiber} />
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
            <span class="label-text">Iron</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Iron..."
            name="iron"
          />
          <Errors errors={errors().iron} />
        </div>
        <div>
          <div class="label">
            <span class="label-text">Posstasium</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Posstasium..."
            name="posstasium"
          />
          <Errors errors={errors().posstasium} />
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
            name="saturated"
          />
          <Errors errors={errors().saturated} />
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
            name="sugar"
          />
          <Errors errors={errors().sugar} />
        </div>
        <div>
          <div class="label">
            <span class="label-text">Total fat</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Total fat..."
            name="totalFat"
          />
          <Errors errors={errors().totalFat} />
        </div>
        <div>
          <div class="label">
            <span class="label-text">Total carbonhydrate</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Total carbonhydrate..."
            name="totalCarbohydrate"
          />
          <Errors errors={errors().totalCarbohydrate} />
        </div>
        <div>
          <div class="label">
            <span class="label-text">Vitamin D</span>
          </div>
          <input
            step="any"
            type="number"
            aria-describedby="helper-text-explanation"
            class="input input-bordered input-sm w-full max-w-xs"
            placeholder="Vitamin D..."
            name="vitaminD"
          />
          <Errors errors={errors().vitaminD} />
        </div>
      </form>
      <button form="form2" class="btn btn-primary">
        Calculate
      </button>
    </>
  );
}
