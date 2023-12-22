import Badge from "./Badge";

export type NutrientsProps = {
  calories?: number;
  totalFat?: number;
  saturated?: number;
  cholesterol?: number;
  sodium?: number;
  totalCarbohydrate?: number;
  fiber?: number;
  sugar?: number;
  protein?: number;
  vitaminD?: number;
  calcium?: number;
  iron?: number;
  potassium?: number;
};

export default function Nutrients(props: NutrientsProps) {
  return (
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn m-1 btn-sm">
        Show nutrients
      </div>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <span class="leading-6">
          Nutrients: Calories: <Badge>{props.calories?.toFixed(1)}</Badge>,
          total fat: <Badge>{props.totalFat?.toFixed(1)}</Badge>, saturated:{" "}
          <Badge>{props.saturated?.toFixed(1)}</Badge>, cholesterol:{" "}
          <Badge>{props.cholesterol?.toFixed(1)}</Badge>, sodium:{" "}
          <Badge>{props.sodium?.toFixed(1)}</Badge>, total carbohydrate:{" "}
          <Badge>{props.totalCarbohydrate?.toFixed(1)}</Badge>, fiber:{" "}
          <Badge>{props.fiber?.toFixed(1)}</Badge>, sugar:{" "}
          <Badge>{props.sugar?.toFixed(1)}</Badge>, protein:{" "}
          <Badge>{props.protein?.toFixed(1)}</Badge>, vitamin D:{" "}
          <Badge>{props.vitaminD?.toFixed(1)}</Badge>, calcium:{" "}
          <Badge>{props.calcium?.toFixed(1)}</Badge>, iron:{" "}
          <Badge>{props.iron?.toFixed(1)}</Badge>, potassium:{" "}
          <Badge>{props.potassium?.toFixed(1)}</Badge>
        </span>
      </ul>
    </div>
  );
}
