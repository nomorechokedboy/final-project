import Toast from "./Toast";
import { For } from "solid-js";
import toastsStore from "./toast";

export default function Toasts() {
  const { toasts } = toastsStore;
  return (
    <div class="flex flex-col gap-3">
      <For each={toasts()}>{Toast}</For>
    </div>
  );
}
