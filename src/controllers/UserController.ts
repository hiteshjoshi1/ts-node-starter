import { Request, Response } from "express";

// Ideally you would inject a service in this controller which will do the business logic
export class UserController {
    public test(req: Request, res: Response) {
        res.status(200).send({
            message: "GET request successful!!",
        });
    }
}

export const userController = new UserController();
