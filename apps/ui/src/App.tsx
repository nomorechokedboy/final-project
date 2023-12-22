import "./App.css";
import HSRCalc from "./Analytics";
import CameraIcon from "~icons/ion/camera-sharp";
import CalcIcon from "~icons/solar/calculator-minimalistic-bold";
import HomeIcon from "~icons/ic/baseline-home";
import IntakeList from "./IntakeList";
import LogoutIcon from "~icons/solar/logout-linear";
import {
  A,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from "@solidjs/router";
import { createEffect, createSignal, onMount } from "solid-js";
import { getPhoto } from "./camera";
import { invoke } from "@tauri-apps/api";
import SearchPage from "./SearchPage";
import Toasts from "./Toasts";
import { createDetectMutation } from "./queries";
import FoodList from "./FoodList";
import axios from "./http";

function App() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    userAgent.includes("android") || userAgent.includes("iphone");
  const [greetMsg, setGreetMsg] = createSignal("");
  const [searchTerm, setSearchTerm] = createSignal("");
  const [name, setName] = createSignal("");
  const navigate = useNavigate();
  const detectMutation = createDetectMutation();
  const [_, setSearchParams] = useSearchParams();
  let dialog: HTMLDialogElement | undefined;

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  async function handleCamera() {
    console.log("Test log");

    try {
      const { data, format } = await getPhoto();
      const binaryData = atob(data);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (var i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: `image/${format}` });

      // const uint8Array = new TextEncoder().encode(data);
      // const blob = new Blob([uint8Array], { type: "application/jpg" });
      // const image = new File([blob], crypto.randomUUID());
      const formData = new FormData();
      formData.append("image", blob);
      const res = await axios.post("/hsr/detect", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
    } catch (e) {
      console.error("Camera err: ", JSON.stringify(e));
    }
  }

  onMount(() => {
    const uid = localStorage.getItem("uid");
    if (uid === null || uid === undefined || uid === "") {
      localStorage.setItem("uid", crypto.randomUUID());
    }
  });

  createEffect(() => {
    setSearchParams({ q: "Cheese" });
    dialog?.showModal();
  });

  return (
    <div class="flex flex-col h-screen relative">
      <header class="flex items-center flex-shrink-0 p-5 gap-2">
        <LogoutIcon />
        <div class="flex-1 text-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search?q=${searchTerm()}`);
            }}
          >
            <input
              type="text"
              placeholder="Type here"
              class="input input-sm input-bordered input-primary w-full max-w-xs"
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
            />
          </form>
        </div>
        <LogoutIcon />
      </header>
      <main class="flex-1 overflow-auto no-scrollbar">
        <Routes>
          <Route path="/" component={IntakeList} />
          <Route path="/analytics" component={HSRCalc} />
          <Route path="/search" component={SearchPage} />
        </Routes>
        <dialog id="my_modal_3" class="modal" ref={dialog}>
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div class="flex flex-col gap-3 py-5">
              <FoodList />
            </div>
          </div>
        </dialog>
      </main>
      <footer class="flex-shrink-0 flex items-center justify-between p-5">
        <A href="/">
          <div class="flex items-center flex-col gap-1">
            <HomeIcon />
          </div>
        </A>
        <div class="flex items-center flex-col gap-1">
          <button onClick={handleCamera}>
            <CameraIcon />
          </button>
        </div>
        <A href="/analytics">
          <div class="flex items-center flex-col gap-1">
            <CalcIcon />
          </div>
        </A>
      </footer>
      <div class="absolute top-20 right-5">
        <Toasts />
      </div>
    </div>
  );
}

export default App;
