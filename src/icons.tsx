import CogSvg from "jsx:./assets/icons/cog.svg";
import CrossSvg from "jsx:./assets/icons/cross.svg";
import MinusSvg from "jsx:./assets/icons/minus.svg";
import PlusSvg from "jsx:./assets/icons/plus.svg";
import SpinnerSvg from "jsx:./assets/icons/spinner11.svg";
import { JSXInternal } from "preact/src/jsx";

export const CloseIcon = (props: JSXInternal.SVGAttributes): JSXInternal.Element => {
    return (
        <CrossSvg {...props} />
    );
};

export const MinusIcon = (props: JSXInternal.SVGAttributes): JSXInternal.Element => {
    return (
        <MinusSvg {...props} />
    );
};

export const PlusIcon = (props: JSXInternal.SVGAttributes): JSXInternal.Element => {
    return (
        <PlusSvg {...props} />
    );
};

export const ResetIcon = (props: JSXInternal.SVGAttributes): JSXInternal.Element => {
    return (
        <SpinnerSvg {...props} />
    );
};

export const SettingsIcon = (props: JSXInternal.SVGAttributes): JSXInternal.Element => {
    return (
        <CogSvg {...props} />
    );
};
