import express from "express";
import bodyParser from "body-parser"; // pull information from HTML POST (express4)
import createError from "http-errors";
import { allRoutes } from "./routes";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );

        this.app.use(bodyParser.json());

        // We are an API so we do not need to set up default views
        // TODO - remove ejs from Build
        // this.app.set("views", path.join(__dirname, "views"));
        // this.app.set("view engine", "ejs");
        // this.app.use(express.static(__dirname +'./../../'));
        // Serve static files from the React app
        // this.app.use(express.static(path.join(__dirname, "client/build")));

        // Route order is IMPORTANT
        this.app.use(allRoutes);

        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            next(createError(404));
        });

        // error handler which is a middleware
        this.app.use((err, req: express.Request, res: express.Response, next) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : "Some error ocurred";
            // Util has a method that can convert an error to String for Json conversion
            const errorResponse = {
                // Error: utils.errorStringify(res.locals.error, null, "\t"),
                Error: res.locals.error,
            };
            // render the error page
            res.status(err.status || 500);
            // TODO  Sending the Stringified error trace back to  caller, ideally you wont do this in prod
            res.json(errorResponse);
        });
    }
}
export default new App().app;
