import { useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";
import { AppSetup } from "./AppSetup";
import { AppStatus } from "./AppStatus";
import { Game } from "./Game";
import { IContainer, IItem, ISettings } from "./types";

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

const performMove = (containers: IContainer[], previousContainerId: number | null, targetContainerId: number): boolean => {
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

const isGameWon = (containers: IContainer[]): boolean => {
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

export const App = () => {
    const [settings, setSettings] = useState<ISettings | null>(null);
    const [containers, setContainers] = useState<IContainer[]>([]);
    const [selectedContainerId, setSelectedContainerId] = useState<IContainer["id"] | null>(null);
    const [hasWon, setHasWon] = useState<boolean>(false);

    const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.Setup);

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

            performMove(newContainers, selectedContainerId, id);
        }

        setHasWon(isGameWon(newContainers));
        setContainers(newContainers);
        setSelectedContainerId(targetContainer.isSelected ? id : null);
    };

    const handleOnSetupConfirm = (settings: ISettings) => {
        setSettings(settings);
        setContainers(getInitialContainers(settings.itemsPerContainer, settings.containerCount, settings.emptyContainerCount));
        setAppStatus(AppStatus.Playing);
    };

    const restartGame = () => {
        setContainers(getInitialContainers(settings!.itemsPerContainer, settings!.containerCount, settings!.emptyContainerCount));
    };

    return (
        <div>
            <h1>
                Puzzle Sorting

                {appStatus === AppStatus.Playing && (
                    <button type="button" onClick={restartGame}>Restart</button>
                )}
            </h1>

            {appStatus === AppStatus.Setup && (
                <AppSetup onConfirm={handleOnSetupConfirm} />
            )}

            {appStatus === AppStatus.Playing && (
                <Fragment>
                    {hasWon && (
                        <h2 class="banner">
                            You won!
                        </h2>
                    )}

                    <Game containers={containers} onSelect={handleOnSelect}></Game>
                </Fragment>
            )}
        </div>
    );
};
