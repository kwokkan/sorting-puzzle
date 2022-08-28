import { Container } from "./Container";
import { IContainer } from "./types";

interface IProps {
    containers: IContainer[];
    onSelect: (id: number) => void;
}

export const Game = ({ containers, onSelect }: IProps) => {

    return (
        <div className="game">
            {containers.map(container => (
                <Container
                    key={container.id}
                    container={container}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};
