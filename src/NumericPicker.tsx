import { JSXInternal } from "preact/src/jsx";

interface IProps {
    id: string;
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
}

export const NumericPicker = ({ id, label, min, max, value, onChange }: IProps) => {
    const handleDecrement: JSXInternal.MouseEventHandler<HTMLButtonElement> = (element) => {
        onChange(--value);
    };

    const handleIncrement: JSXInternal.MouseEventHandler<HTMLButtonElement> = (element) => {
        onChange(++value);
    };

    return (
        <div className="numeric-picker">
            <label for="id">{label}</label>
            <button type="button" disabled={value === min} onClick={handleDecrement}>-</button>
            <input id={id} type="numeric" readOnly={true} value={value} />
            <button type="button" disabled={value === max} onClick={handleIncrement}>+</button>
        </div>
    );
};
