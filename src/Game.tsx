import { Container } from "./Container";
import { IContainer } from "./types";

interface IProps {
    containers: IContainer[];
}

export const Game = ({ containers }: IProps) => {

    return (
        <div className="game">
            {containers.map(container => (
                <Container
                    key={container.id}
                    container={container}
                />
            ))}
        </div>
    );
};
