import { IContainer, IItem } from "./types";
import { getRandomColor } from "./utils";

export const getInitialContainers = (itemsPerContainer: number, numberOfContainers: number, emptyContainers: number): IContainer[] => {
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

            if (i == currentItems.length - 1 && container.items.every(x => x.group === randomItem.group)) {
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

export const performMove = (containers: IContainer[], previousContainerId: number | null, targetContainerId: number): boolean => {
    if (previousContainerId === null) {
        return false;
    };

    const targetContainer = containers[targetContainerId];

    const itemsPerContainer = targetContainer.maxItems;

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

export const isGameWon = (containers: IContainer[]): boolean => {
    for (const container of containers) {
        if (container.items.length === 0) {
            continue;
        }

        if (container.items.length !== container.maxItems) {
            return false;
        }

        const group = container.items[0].group;
        if (!container.items.every(x => x.group === group)) {
            return false;
        }
    }

    return true;
};
