import { HapMiddleware } from "../app/App";

export const GlobalMiddleware: HapMiddleware = async (req, res, next): Promise<void> => {
    console.log("global:", Date.now());
    next();
};
