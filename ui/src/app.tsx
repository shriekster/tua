import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import { ToastRegion, ToastList } from "@/components/ui/toast";
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
            <ColorModeProvider>
              {props.children}
              <ToastRegion>
                <ToastList />
              </ToastRegion>
            </ColorModeProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
