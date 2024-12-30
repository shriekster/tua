import { Title } from "@solidjs/meta";
import Counter from "@/components/Counter";
import { onMount } from "solid-js";
import { clientOnly } from "@solidjs/start";

const ClientCalendar = clientOnly(() => import("@/components/Calendar"));

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
      <ClientCalendar />
    </main>
  );
}
