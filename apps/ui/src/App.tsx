import { Show, createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { getPhoto } from "@tauri-apps/plugin-camera";

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
      // const test = await getPhoto();
      const { data, ...test } = await invoke("plugin:camera|getPhoto");
      console.log(JSON.stringify(test));
    } catch (e) {
      console.error("Camera err: ", JSON.stringify(e));
    }
  }

  return (
    <div class="container">
      <h1>Welcome to Tauri mobile!</h1>

      <div class="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={logo} class="logo solid" alt="Solid logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and Solid logos to learn more.</p>

      <form
        class="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <input type="file" name="" id="" />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg()}</p>
      <Show when={isMobile}>
        <button onClick={handleCamera}>Test</button>
      </Show>
    </div>
  );
}

export default App;
