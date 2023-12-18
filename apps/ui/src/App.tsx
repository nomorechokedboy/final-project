import "./App.css";
import Analytics from "./Analytics";
import CameraIcon from "~icons/ion/camera-sharp";
import ChartIcon from "~icons/gg/chart";
import HomeIcon from "~icons/ic/baseline-home";
import IntakeList from "./IntakeList";
import LogoutIcon from "~icons/solar/logout-linear";
import { A, Route, Routes, useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { getPhoto } from "./camera";
import { invoke } from "@tauri-apps/api/tauri";
import SearchPage from "./SearchPage";
import toastsStore from "./toast";
import Toasts from "./Toasts";

function App() {
  const { toasts, toastify } = toastsStore;
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    userAgent.includes("android") || userAgent.includes("iphone");
  const [greetMsg, setGreetMsg] = createSignal("");
  const [searchTerm, setSearchTerm] = createSignal("");
  const [name, setName] = createSignal("");
  const navigate = useNavigate();

  toastify({ type: "success", description: "lmao", id: "1" });

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  async function handleCamera() {
    console.log("Test log");

    try {
      const { data, ...test } = await getPhoto();
      console.log(JSON.stringify(test));
    } catch (e) {
      console.error("Camera err: ", JSON.stringify(e));
    }
  }

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
          <Route path="/analytics" component={Analytics} />
          <Route path="/search" component={SearchPage} />
        </Routes>
      </main>
      <footer class="flex-shrink-0 flex items-center justify-between p-5">
        <A href="/">
          <div class="flex items-center flex-col gap-1">
            <HomeIcon />
          </div>
        </A>
        <div class="flex items-center flex-col gap-1">
          <CameraIcon />
        </div>
        <A href="/analytics">
          <div class="flex items-center flex-col gap-1">
            <ChartIcon />
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
