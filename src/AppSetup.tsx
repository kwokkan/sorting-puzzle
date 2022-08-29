import { useState } from "preact/hooks";
import { NumericPicker } from "./NumericPicker";
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

    const handleOnNumericChange = (propName: keyof ISettings, value: number) => {
        const newSettings = {
            ...settings,
            [propName]: value,
        };

        setSettings(newSettings);
    };

    const handleOnPlay = () => {
        onConfirm(settings);
    };

    return (
        <div className="setup">
            <NumericPicker
                id="itemsPerContainer"
                label="Items per container"
                min={2}
                max={99}
                value={settings.itemsPerContainer}
                onChange={value => handleOnNumericChange("itemsPerContainer", value)}
            />

            <NumericPicker
                id="containerCount"
                label="Container count"
                min={2}
                max={99}
                value={settings.containerCount}
                onChange={value => handleOnNumericChange("containerCount", value)}
            />

            <NumericPicker
                id="emptyContainerCount"
                label="Empty containers"
                min={2}
                max={99}
                value={settings.emptyContainerCount}
                onChange={value => handleOnNumericChange("emptyContainerCount", value)}
            />

            <button type="button" onClick={handleOnPlay}>Play</button>
        </div>
    );
};
