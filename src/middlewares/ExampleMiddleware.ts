import { HapMiddleware } from "../app/App";

export const exampleMiddleware: HapMiddleware = (req, res, next): void => {
    console.log("Time1:", Date.now());
    setTimeout(() => {
        console.log("Time2:", Date.now());
        next();
    }, 1000);
};
