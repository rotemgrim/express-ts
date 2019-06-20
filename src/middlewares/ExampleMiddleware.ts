import {HaploMiddleware} from "../haplo/App";

export const exampleMiddleware: HaploMiddleware = (): Promise<void> => {
    return new Promise((resolve) => {
        console.log('Time0:', Date.now());
        setTimeout(() => {
            console.log('Time0:', Date.now());
            resolve();
        }, 10);
    });
}
