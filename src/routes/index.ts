import * as path from "path"; // normalize the paths : http://stackoverflow.com/questions/9756567/do-you-need-to-use-path-join-in-node-js
import express = require("express");

import { userRoutes } from "./UserRouter";

class Routes {
    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get("/", (req: express.Request, res: express.Response) => {
            res.status(200).send({
                message: "Base request successful!!",
            });
        });
        this.router.use("/user", userRoutes);
    }
}

export const allRoutes = new Routes().router;
