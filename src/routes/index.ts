import * as path from "path";
import express = require("express");

import { userRoutes } from "./UserRouter";

class Routes {
    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        // Add Routers one by one
        this.router.get("/", (req: express.Request, res: express.Response) => {
            res.status(200).send({
                message: "Base request successful!!",
            });
        });
        // Add user fike
        this.router.use("/user", userRoutes);
    }
}

export const allRoutes = new Routes().router;
