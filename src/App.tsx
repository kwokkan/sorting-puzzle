import { useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";
import { AppSetup } from "./AppSetup";
import { AppStatus } from "./AppStatus";
import { Game } from "./Game";
import { getInitialContainers, isGameWon, performMove } from "./game-utils";
import { IContainer, ISettings } from "./types";

export const App = () => {
    const [settings, setSettings] = useState<ISettings>({
        itemsPerContainer: 4,
        containerCount: 4,
        emptyContainerCount: 2,
    });
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
        setContainers(getInitialContainers(settings));
        setAppStatus(AppStatus.Playing);
    };

    const restartGame = () => {
        setContainers(getInitialContainers(settings));
    };

    const changeSettings = () => {
        setAppStatus(AppStatus.Setup);
    };

    const cancelSettings = () => {
        setAppStatus(AppStatus.Playing);
    };

    return (
        <div>
            <h1>
                Puzzle Sorting

                {appStatus === AppStatus.Playing && (
                    <Fragment>

                        <button type="button" onClick={changeSettings}>Settings</button>
                        <button type="button" onClick={restartGame}>Restart</button>
                    </Fragment>
                )}

                {appStatus === AppStatus.Setup && containers.length > 0 && (
                    <button type="button" onClick={cancelSettings}>Cancel</button>
                )}
            </h1>

            {appStatus === AppStatus.Setup && (
                <AppSetup settings={settings} onConfirm={handleOnSetupConfirm} />
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
