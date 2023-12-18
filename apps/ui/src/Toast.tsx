import { onCleanup, onMount } from "solid-js";
import { ToastMessage } from "./toast";
import toastsStore from "./toast";
import TimesIcon from "~icons/typcn/times";

export default function Toast(props: ToastMessage) {
  const { closeToast } = toastsStore;
  let timeout: number;

  function handleClose() {
    closeToast(props.id);
  }

  function handleAutoClose() {
    timeout = setTimeout(handleClose, 5000);
  }

  function cancelDelay() {
    if (timeout) {
      clearTimeout(timeout);
    }
  }

  onMount(handleAutoClose);
  onCleanup(cancelDelay);

  return (
    <div
      class="alert"
      classList={{
        "alert-error": props.type === "error",
        "alert-success": props.type === "success",
      }}
    >
      <div class="flex items-center gap-3">
        <span>{props.description}</span>
        <button class="btn btn-ghost btn-square btn-sm" onClick={handleClose}>
          <TimesIcon />
        </button>
      </div>
    </div>
  );
}
