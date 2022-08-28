
export interface IItem {
    group: number;
    backgroundColor: string;
    text?: string;
}

export interface IContainer {
    id: number;
    maxItems: number;
    items: IItem[];
    isSelected: boolean;
}

export interface ISettings {
    itemsPerContainer: number;
    containerCount: number;
    emptyContainerCount: number;
}
