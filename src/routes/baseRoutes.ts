import { IRouter } from "express";
import { RoutesBatch, App } from "../haplo/App";
import ExampleController from "../controllers/ExampleController";
import { exampleMiddleware } from "../middlewares/ExampleMiddleware";


export const baseRoutes: RoutesBatch = (app: App) => {
    
    app.get('/', ExampleController.index);
    app.get('/2', ExampleController.index);

} 
