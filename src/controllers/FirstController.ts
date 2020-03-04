// import { Request, Response } from "express";

import { Route, Get, Controller } from "tsoa";
import { logger } from "../logger/logger";

@Route("/")
export class FirstController extends Controller {
    @Get("/")
    public async getAll() {
        logger.info("Testing");
        return { Hitesh: "skaffold test v2" };
    }

}
