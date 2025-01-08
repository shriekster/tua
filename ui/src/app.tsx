import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import CustomTitle from "./components/CustomTitle";
import "./app.css";
import "./custom.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <CustomTitle />
          <Suspense>
            <ColorModeScript initialColorMode="dark" />
            <ColorModeProvider>{props.children}</ColorModeProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
