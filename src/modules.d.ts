
declare module "jsx:*.svg" {
    import { FunctionalComponent } from "preact";
    import { JSXInternal } from "preact/src/jsx";

    const SVGComponent: FunctionalComponent<JSXInternal.SVGAttributes>;
    export default SVGComponent;
}
