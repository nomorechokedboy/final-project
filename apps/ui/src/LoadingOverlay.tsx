import { createEffect } from "solid-js";

export type LoadingOverlayProps = {
  open: boolean;
};

export default function LoadingOverlay(props: LoadingOverlayProps) {
  let dialog: HTMLDialogElement | undefined;

  createEffect(() => {
    if (props.open) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  });

  return (
    <dialog id="my_modal_1" class="modal" ref={dialog}>
      <span class="loading loading-dots loading-lg text-warning dark:text-white"></span>
    </dialog>
  );
}
