import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import CustomTitle from "./components/CustomTitle";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <CustomTitle />
          {/* <a href="/">Index</a>
          <a href="/about">About</a> */}
          <Suspense>
            <ColorModeScript />
            <ColorModeProvider initialColorMode="light">
              {props.children}
            </ColorModeProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
