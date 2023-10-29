import "./App.css";
import Analytics from "./Analytics";
import CameraIcon from "~icons/ion/camera-sharp";
import ChartIcon from "~icons/gg/chart";
import HomeIcon from "~icons/ic/baseline-home";
import IntakeList from "./IntakeList";
import LogoutIcon from "~icons/solar/logout-linear";
import { A, Route, Routes } from "@solidjs/router";
import { createSignal } from "solid-js";
import { getPhoto } from "./camera";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    userAgent.includes("android") || userAgent.includes("iphone");
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

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
    <div class="flex flex-col h-screen">
      <header class="flex items-center flex-shrink-0 p-5">
        <LogoutIcon />
        <div class="flex-1 text-center">This app name</div>
        <LogoutIcon />
      </header>
      <main class="flex-1 overflow-auto no-scrollbar">
        <Routes>
          <Route path="/" component={IntakeList} />
          <Route path="/analytics" component={Analytics} />
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
    </div>
  );
}

export default App;
