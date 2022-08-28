import { IContainer } from "./types";

interface IProps {
    container: IContainer;
    onSelect: (id: number) => void;
}

export const Container = ({ container, onSelect }: IProps) => {
    return (
        <div
            className={`container ${container.isSelected ? "selected" : ""}`}
            style={{ gridTemplateRows: `repeat(${container.maxItems}, 1fr)` }}
            onClick={() => onSelect(container.id)}
        >
            {container.items.map((item, index) => (
                <div key={index} style={{ backgroundColor: item.backgroundColor, gridRowEnd: -(container.maxItems - index) }}>
                    {item.group}
                </div>
            ))}
        </div>
    );
};
