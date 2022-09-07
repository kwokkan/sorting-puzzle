import CogSvg from "bundle-text:./assets/icons/cog.svg";
import CrossSvg from "bundle-text:./assets/icons/cross.svg";
import MinusSvg from "bundle-text:./assets/icons/minus.svg";
import PlusSvg from "bundle-text:./assets/icons/plus.svg";
import SpinnerSvg from "bundle-text:./assets/icons/spinner11.svg";
import { JSXInternal } from "preact/src/jsx";

export const CloseIcon = (props: JSXInternal.SVGAttributes): JSXInternal.Element => {
    return (
        <div className="icon" dangerouslySetInnerHTML={{ __html: CrossSvg }}>
        </div>
    );
};

export const MinusIcon = (props: JSXInternal.SVGAttributes): JSXInternal.Element => {
    return (
        <div className="icon" dangerouslySetInnerHTML={{ __html: MinusSvg }}>
        </div>
    );
};

export const PlusIcon = (props: JSXInternal.SVGAttributes): JSXInternal.Element => {
    return (
        <div className="icon" dangerouslySetInnerHTML={{ __html: PlusSvg }}>
        </div>
    );
};

export const ResetIcon = (props: JSXInternal.SVGAttributes): JSXInternal.Element => {
    return (
        <div className="icon" dangerouslySetInnerHTML={{ __html: SpinnerSvg }}>
        </div>
    );
};

export const SettingsIcon = (props: JSXInternal.SVGAttributes): JSXInternal.Element => {
    return (
        <div className="icon" dangerouslySetInnerHTML={{ __html: CogSvg }}>
        </div>
    );
};
