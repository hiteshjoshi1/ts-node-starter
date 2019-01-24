import app from "./app";
import http from "http";
import { logger } from "./logger/Logger";

const normalizePort = (val: string) => {
    const aPort = parseInt(val, 10);

    if (isNaN(aPort)) {
        // named pipe
        return val;
    }

    if (aPort >= 0) {
        // port number
        return aPort;
    }

    return false;
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    logger.info(`Listening on  ${bind}`);
};

const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(`${bind}  requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind}  is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Get the port
const port = normalizePort(process.env.PORT || "4000");

// Set the port where you want ti run the app
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

server.listen(port);

// Server Implements Emitter and catches error and listening events
server.on("error", onError);
server.on("listening", onListening);
