import { IRouter } from "express";
import { RoutesBatch, App } from "../app/App";
import ExampleController from "../controllers/ExampleController";
import { exampleMiddleware } from "../middlewares/ExampleMiddleware";
import Container from "typedi";


export const baseRoutes: RoutesBatch = (app: App) => {
    const exampleController = new ExampleController();

    app.get("/", ExampleController.index);
    app.get("/db", ExampleController.dbTest);

};
