import { IContainer } from "./types";

interface IProps {
    container: IContainer;
}

export const Container = ({ container }: IProps) => {
    return (
        <div className="container" style={{ gridTemplateRows:"repeat(4, 1fr)" }}>
            {container.items.map((item, index) => (
                <div key={index} style={{ backgroundColor: item.backgroundColor }}>
                    {item.group}
                </div>
            ))}
        </div>
    );
};
