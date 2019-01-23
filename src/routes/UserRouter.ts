import { Router } from "express";
import { userController } from "../controllers/UserController";
import { defaultCipherList } from "constants";

// let router = Router();

// router.get("/", userController.test);

// export default router;

class UserRouter {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    private config(): void {
        // this.router.get("/", (req: express.Request, res: express.Response) => userController.test(req, res));
        this.router.use("/", userController.test);
    }
}
export const userRoutes = new UserRouter().router;
