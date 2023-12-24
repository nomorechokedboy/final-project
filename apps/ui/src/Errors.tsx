import { For, Show } from "solid-js";

export type ErrorsProps = {
  errors: string[] | null;
};

export default function Errors(props: ErrorsProps) {
  return (
    <Show when={props.errors !== null}>
      <For each={props.errors}>
        {(err) => <p class="text-xs text-red-600">{err}</p>}
      </For>
    </Show>
  );
}
