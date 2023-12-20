/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import "./styles.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

const queryClient = new QueryClient();

render(
  () => (
    <Router>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Router>
  ),
  document.getElementById("root") as HTMLElement,
);
