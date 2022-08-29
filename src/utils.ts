
const convertToHex = (value: number): string => {
    return Math.floor(value).toString(16).padStart(2, "0");
};

export const getRandomColor = (): string => {
    const r = convertToHex(Math.random() * 255);
    const g = convertToHex(Math.random() * 255);
    const b = convertToHex(Math.random() * 255);

    return `#${r}${g}${b}`;
};
