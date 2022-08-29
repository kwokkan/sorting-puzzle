import { useState } from "preact/hooks";
import { NumericPicker } from "./NumericPicker";
import { ISettings } from "./types";

interface IProps {
    settings: ISettings;
    onConfirm: (settings: ISettings) => void;
}

export const AppSetup = ({ settings, onConfirm }: IProps) => {
    const [localSettings, setLocalSettings] = useState<ISettings>(settings);

    const handleOnNumericChange = (propName: keyof ISettings, value: number) => {
        const newSettings = {
            ...localSettings,
            [propName]: value,
        };

        setLocalSettings(newSettings);
    };

    const handleOnPlay = () => {
        onConfirm(localSettings);
    };

    return (
        <div className="setup">
            <NumericPicker
                id="itemsPerContainer"
                label="Items per container"
                min={2}
                max={99}
                value={localSettings.itemsPerContainer}
                onChange={value => handleOnNumericChange("itemsPerContainer", value)}
            />

            <NumericPicker
                id="containerCount"
                label="Container count"
                min={2}
                max={99}
                value={localSettings.containerCount}
                onChange={value => handleOnNumericChange("containerCount", value)}
            />

            <NumericPicker
                id="emptyContainerCount"
                label="Empty containers"
                min={2}
                max={99}
                value={localSettings.emptyContainerCount}
                onChange={value => handleOnNumericChange("emptyContainerCount", value)}
            />

            <button type="button" onClick={handleOnPlay}>Play</button>
        </div>
    );
};
