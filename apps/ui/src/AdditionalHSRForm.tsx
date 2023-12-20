export default function AdditionalHSRForm() {
  return (
    <form
      id="form1"
      class="grid grid-cols-2 gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log({ formData });
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
          name="saturated"
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
          name="sugar"
        />
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
      </div>
    </form>
  );
}
