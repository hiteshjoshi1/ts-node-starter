import { Router } from "express";
import { userController } from "../controllers/UserController";
import { defaultCipherList } from "constants";

class UserRouter {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    private config(): void {
        this.router.use("/", userController.test);
    }
}
export const userRoutes = new UserRouter().router;
