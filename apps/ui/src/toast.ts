import { createRoot, createSignal } from "solid-js";

export type ToastMessage = {
  id: string;
  type: "error" | "success";
  description: string;
};

function createToasts() {
  const [toasts, setToasts] = createSignal<ToastMessage[]>([]);
  function toastify(req: ToastMessage) {
    setToasts((prev) => [...prev, req]);
  }
  function closeToast(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return { toasts, toastify, closeToast };
}

export default createRoot(createToasts);
