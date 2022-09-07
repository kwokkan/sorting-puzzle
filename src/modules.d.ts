
declare module "bundle-text:*" {
    const type: string;
    export default type;
}

declare module "jsx:*.svg" {
    import { FunctionalComponent } from "preact";
    import { JSXInternal } from "preact/src/jsx";

    const SVGComponent: FunctionalComponent<JSXInternal.SVGAttributes>;
    export default SVGComponent;
}
