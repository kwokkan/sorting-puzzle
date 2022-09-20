import { IContainer, IItem, ISettings, IUndoItem } from "./types";
import { getRandomColor } from "./utils";

const createContainersAndItems = ({ itemsPerContainer, containerCount }: ISettings): { containers: IContainer[], items: IItem[] } => {
    const containers: IContainer[] = [];
    const items: IItem[] = [];

    for (let i = 0; i < containerCount; i++) {
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

    return {
        containers: containers,
        items: items,
    };
};

const populateContainerItems = (containers: IContainer[], items: IItem[]): boolean => {
    let retryCount = items.length;

    for (const container of containers) {
        for (let i = 0; i < container.maxItems; i++) {
            const currentItems = container.items;

            const randomItemIndex = Math.floor(Math.random() * items.length);
            const randomItem = items[randomItemIndex];

            if (i === (container.maxItems - 1) && currentItems.every(x => x.group === randomItem.group)) {
                i--;

                // the algorithm isn't smart enough to look into unset containers, so this stops the infinite recursion
                if (--retryCount === 0) {
                    return false;
                }

                continue;
            }

            currentItems.push(randomItem);
            items.splice(randomItemIndex, 1);
        }
    }

    return true;
}

export const getInitialContainers = (settings: ISettings): IContainer[] => {
    const { itemsPerContainer, emptyContainerCount } = settings;
    let { containers, items } = createContainersAndItems(settings);

    while (!populateContainerItems(containers, items)) {
        ({ containers, items } = createContainersAndItems(settings));
    }

    for (let i = containers.length, l = containers.length + emptyContainerCount; i < l; i++) {
        containers.push({
            id: i,
            items: [],
            maxItems: itemsPerContainer,
            isSelected: false,
        });
    }

    return containers;
};

export const performMove = (containers: IContainer[], previousContainerId: number | null, targetContainerId: number, undoItems: IUndoItem[]): boolean => {
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

    let undoCount = 0;
    do {
        const previousItem = previousContainer.items.shift();

        targetContainer.items.splice(0, 0, previousItem!);

        undoCount++;
    } while (targetContainer.items.length < itemsPerContainer && previousContainer.items.length > 0 && previousContainer.items[0].group === targetContainer.items[0].group);

    undoItems.push({
        fromContainerId: previousContainer.id,
        toContainerId: targetContainer.id,
        count: undoCount,
    });

    return true;
};

export const undoMove = (containers: IContainer[], undoItems: IUndoItem[]) => {
    const undoItem = undoItems.pop();

    if (undoItem === undefined) {
        return;
    }

    const fromContainer = containers.find(x => x.id === undoItem.fromContainerId)!;
    const toContainer = containers.find(x => x.id === undoItem.toContainerId)!;

    let undoCount = undoItem.count;

    const undoneItems = toContainer.items.splice(0, undoCount);
    fromContainer.items.splice(0, 0, ...undoneItems);
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

export const generateStyles = (containers: IContainer[]): string => {
    const container = containers[0];

    if (!container) {
        return "";
    }

    let styles = `.container { grid-template-rows: repeat(${container.maxItems}, 1fr); } `;

    const items = containers.flatMap(x => x.items);
    const groups = items
        .filter((item, index) => items.findIndex(fi => fi.group === item.group) === index)
        .sort((a, b) => a.group - b.group);

    styles += groups.map(x => `.item-g-${x.group} { background-color: ${x.backgroundColor} }`).join(" ");

    styles += Array(container.maxItems).fill(null).map((_, index) => `.item-n-${container.maxItems - index} { grid-row-end: -${(container.maxItems - index)} }`).join(" ");

    return styles;
};
