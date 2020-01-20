import { HapMiddleware } from "../app/App";

export const exampleMiddleware: HapMiddleware = async (req, res, next): Promise<void> => {
    console.log("Time1:", Date.now());
    setTimeout(() => {
        console.log("Time2:", Date.now());
        next();
    }, 1000);
};
