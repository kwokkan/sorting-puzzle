import { IContainer } from "./types";

interface IProps {
    container: IContainer;
}

export const Container = ({ container }: IProps) => {
    return (
        <div className="container" style={{ gridTemplateRows: `repeat(${container.maxItems}, 1fr)` }}>
            {container.items.map((item, index) => (
                <div key={index} style={{ backgroundColor: item.backgroundColor, gridRowEnd: -(container.maxItems - index) }}>
                    {item.group}
                </div>
            ))}
        </div>
    );
};
