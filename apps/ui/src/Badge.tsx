import { JSX } from "solid-js";

export type BadgeProps = {
  children?: JSX.Element;
};

export default function Badge(props: BadgeProps) {
  return (
    <span class="badge badge-neutral dark:badge-accent font-bold">
      {props.children}
    </span>
  );
}
