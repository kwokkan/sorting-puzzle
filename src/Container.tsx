import { IContainer } from "./types";

interface IProps {
    container: IContainer;
    onSelect: (id: number) => void;
}

export const Container = ({ container, onSelect }: IProps) => {
    const itemDifference = container.maxItems - container.items.length;

    return (
        <div
            className={`container ${container.isSelected ? "selected" : ""}`}
            onClick={() => onSelect(container.id)}
        >
            {container.items.map((item, index) => (
                <div key={index} className={`item item-g-${item.group} item-n-${(container.maxItems - itemDifference - index)}`}>
                    {item.group}
                </div>
            ))}
        </div>
    );
};
