import { useState } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";
import { ISettings } from "./types";

interface IProps {
    onConfirm: (settings: ISettings) => void;
}

export const AppSetup = ({ onConfirm }: IProps) => {
    const [settings, setSettings] = useState<ISettings>({
        itemsPerContainer: 4,
        containerCount: 4,
        emptyContainerCount: 2,
    });

    const handleOnChange: JSXInternal.GenericEventHandler<HTMLInputElement> = (event: JSXInternal.TargetedEvent<HTMLInputElement>) => {
        const propName = event.currentTarget.id;

        const newSettings = {
            ...settings,
            [propName]: event.currentTarget.valueAsNumber,
        };

        setSettings(newSettings);
    };

    const handleOnPlay = () => {
        onConfirm(settings);
    };

    return (
        <div className="setup">
            <div>
                <label for="itemsPerContainer">Items per container</label>
                <input type="number" min={2} id="itemsPerContainer" value={settings.itemsPerContainer} onChange={handleOnChange} />
            </div>

            <div>
                <label for="containerCount">Container count</label>
                <input type="number" min={2} id="containerCount" value={settings.containerCount} onChange={handleOnChange} />
            </div>

            <div>
                <label for="emptyContainerCount">Empty containers</label>
                <input type="number" min={2} id="emptyContainerCount" value={settings.emptyContainerCount} onChange={handleOnChange} />
            </div>

            <button type="button" onClick={handleOnPlay}>Play</button>
        </div>
    );
};
