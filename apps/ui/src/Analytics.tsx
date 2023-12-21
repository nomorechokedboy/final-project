import { createCalcHSRMutation } from "./queries";

export default function HSRCalc() {
  const calcHSRMutation = createCalcHSRMutation();

  return (
    <div class="flex gap-5 flex-col p-5">
      <form
        id="form1"
        class="grid grid-cols-2 gap-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const body: Record<string, FormDataEntryValue> = {};
          const numberFields = [
            "energy",
            "concentratedFnvl",
            "fibre",
            "fnvl",
            "protein",
            "saturatedFat",
            "sodium",
            "totalSugars",
          ];
          formData.forEach((val, key) => {
            console.log({
              test: numberFields.includes(key) !== undefined,
              key,
            });

            if (numberFields.includes(key)) {
              body[key] = parseFloat(val.toString()) as any;
            } else {
              body[key] = val;
            }
          });
          console.log({ body });

          try {
            await calcHSRMutation.mutateAsync(body);
          } catch (err) {
            console.error("CalcHSR err: ", err);
          }
        }}
      >
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
        </div>
        <div>
          <div class="label">
            <span class="label-text">Category</span>
          </div>
          <select
            class="select select-bordered select-sm w-full max-w-xs"
            name="category"
          >
            <option selected>1D</option>
            <option>2</option>
            <option>2D</option>
            <option>3</option>
            <option>3D</option>
          </select>
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
        </div>
      </form>
      <div>
        <span>
          Rate:{" "}
          <kbd class="kbd">
            {calcHSRMutation.data?.data.data?.toFixed(1) ?? 0}
          </kbd>
        </span>
      </div>
      <button form="form1" class="btn btn-primary mt-auto">
        Calculate
      </button>
    </div>
  );
}
