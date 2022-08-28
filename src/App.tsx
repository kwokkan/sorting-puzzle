import { useState } from "preact/hooks";
import { Game } from "./Game";
import { IContainer, IItem } from "./types";

const convertToHex = (value: number): string => {
    return Math.floor(value).toString(16).padStart(2, '0');
};

const getRandomColor = (): string => {
    const r = convertToHex(Math.random() * 255);
    const g = convertToHex(Math.random() * 255);
    const b = convertToHex(Math.random() * 255);

    return `#${r}${g}${b}`;
};

const getInitialContainers = (itemsPerContainer: number, numberOfContainers: number, emptyContainers: number): IContainer[] => {
    const containers: IContainer[] = [];
    const items: IItem[] = [];

    for (let i = 0; i < numberOfContainers; i++) {
        items.push(...Array(itemsPerContainer).fill({
            group: i,
            backgroundColor: getRandomColor(),
        }));

        containers.push({
            id: i,
            items: [],
            maxItems: itemsPerContainer,
        });
    }

    for (const container of containers) {
        for (let i = 0; i < itemsPerContainer; i++) {
            const currentItems = container.items;

            const randomItemIndex = Math.floor(Math.random() * items.length);
            const randomItem = items[randomItemIndex];

            if (i == currentItems.length - 1 && container.items.every(x => x.group == randomItem.group)) {
                i--;
                continue;
            }

            currentItems.push(randomItem);
            items.splice(randomItemIndex, 1);
        }
    }

    for (let i = containers.length, l = containers.length + emptyContainers; i < l; i++) {
        containers.push({
            id: i,
            items: [],
            maxItems: itemsPerContainer,
        });
    }

    return containers;
};

export const App = () => {
    const [containers, setContainers] = useState<IContainer[]>(getInitialContainers(4, 4, 2));

    return (
        <div>
            <h1>Puzzle Sorting</h1>

            <Game containers={containers}></Game>
        </div>
    );
};
