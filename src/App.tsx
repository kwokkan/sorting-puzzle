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
            isSelected: false,
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
            isSelected: false,
        });
    }

    return containers;
};

const performMove = (containers: IContainer[], previousContainerId: number | null, targetContainerId: number, itemsPerContainer: number): boolean => {

    if (previousContainerId === null) {
        return false;
    };

    const targetContainer = containers[targetContainerId];

    if (targetContainer.items.length === itemsPerContainer) {
        return false;
    }

    const previousContainer = containers[previousContainerId];

    if (previousContainer.items.length === 0) {
        return false;
    }

    if (targetContainer.items.length > 0 && targetContainer.items[0].group !== previousContainer.items[0].group) {
        return false;
    }

    do {
        const previousItem = previousContainer.items.shift();

        targetContainer.items.splice(0, 0, previousItem!);
    } while (targetContainer.items.length < itemsPerContainer && previousContainer.items.length > 0 && previousContainer.items[0].group === targetContainer.items[0].group);

    targetContainer.isSelected = false;

    return true;
};

export const App = () => {
    const [itemsPerContainer, _] = useState<number>(4);
    const [containers, setContainers] = useState<IContainer[]>(getInitialContainers(itemsPerContainer, 4, 2));
    const [selectedContainerId, setSelectedContainerId] = useState<IContainer["id"] | null>(null);

    const handleOnSelect = (id: number) => {
        const newContainers = [...containers];
        const targetContainer = newContainers[id];

        if (id === selectedContainerId) {
            targetContainer.isSelected = !targetContainer.isSelected;
        }
        else {
            if (selectedContainerId !== null) {
                newContainers[selectedContainerId].isSelected = false;
            }

            targetContainer.isSelected = true;
        }

        performMove(newContainers, selectedContainerId, id, itemsPerContainer);

        setContainers(newContainers);
        setSelectedContainerId(targetContainer.isSelected ? id : null);
    };

    return (
        <div>
            <h1>Puzzle Sorting</h1>

            <Game containers={containers} onSelect={handleOnSelect}></Game>
        </div>
    );
};
