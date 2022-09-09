import { render } from "preact";
import { App } from "./App";

var element = document.getElementById("app");
render(<App />, element!);

if (navigator.serviceWorker) {
    navigator.serviceWorker.register(
        new URL("../public/sw.js", import.meta.url),
        { type: "module" }
    )
        .then(swr => {
            console.log("Registered service worker.", swr);
        })
        .catch(exception => {
            console.error("Error registering service worker.", exception);
        });
}
