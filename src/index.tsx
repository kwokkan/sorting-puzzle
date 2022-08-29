import { render } from "preact";
import { App } from "./App";

var element = document.getElementById("app");
render(<App />, element!);

if (navigator.serviceWorker) {
    navigator.serviceWorker.register(
        new URL("sw.js", import.meta.url),
        { type: "module" }
    );
}
