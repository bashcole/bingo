import {ICell} from "@/interfaces/ICell";

export const fetchLocalStorage = <T>(key: string, defaultValue: T) => {
    const item = localStorage.getItem(key);
    if (item !== null) {
        try {
            return JSON.parse(item);
        } catch {
            return defaultValue;
        }
    }
}

export const updateLocalStorage = (key: string, field: string, value: any): void => {
    const state = fetchLocalStorage(key, {})
    localStorage.setItem(key, JSON.stringify({...state, [field]: value}))
}

export const randomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomRange = (length: number, min: number, max: number): ICell[] => {
    let array: ICell[] = [];
    let temp = [];
    while (array.length < length) {
        const r = randomInt(min, max);
        if (temp.indexOf(r) === -1) {
            array.push([r, false]);
            temp.push(r)
        }
    }
    array[import.meta.env.VITE_FREE_COLUMN_INDEX][0] = import.meta.env.VITE_FREE_COLUMN_NAME
    return array;
};

export const generateDefaultState = (): ICell[] => {

    const temp: ICell[] = [
        [null, false], [null, false], [null, false], [null, false], [null, false],
        [null, false], [null, false], [null, false], [null, false], [null, false],
        [null, false], [null, false], [null, false], [null, false], [null, false],
        [null, false], [null, false], [null, false], [null, false], [null, false],
        [null, false], [null, false], [null, false], [null, false], [null, false]
    ]

    temp[import.meta.env.VITE_FREE_COLUMN_INDEX][0] = import.meta.env.VITE_FREE_COLUMN_NAME
    return temp
}
