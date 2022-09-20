import CloseSvg from "bundle-text:./assets/icons/Close.svg";
import MinusSvg from "bundle-text:./assets/icons/Minus.svg";
import PlusSvg from "bundle-text:./assets/icons/Plus.svg";
import ResetSvg from "bundle-text:./assets/icons/Reset.svg";
import SettingsSvg from "bundle-text:./assets/icons/Settings.svg";
import UndoSvg from "bundle-text:./assets/icons/Undo.svg";
import { JSXInternal } from "preact/src/jsx";

export const CloseIcon = (props: JSXInternal.SVGAttributes): JSXInternal.Element => {
    return (
        <div className="icon" dangerouslySetInnerHTML={{ __html: CloseSvg }}>
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
        <div className="icon" dangerouslySetInnerHTML={{ __html: ResetSvg }}>
        </div>
    );
};

export const SettingsIcon = (props: JSXInternal.SVGAttributes): JSXInternal.Element => {
    return (
        <div className="icon" dangerouslySetInnerHTML={{ __html: SettingsSvg }}>
        </div>
    );
};

export const UndoIcon = (props: JSXInternal.SVGAttributes): JSXInternal.Element => {
    return (
        <div className="icon" dangerouslySetInnerHTML={{ __html: UndoSvg }}>
        </div>
    );
};
