/**
 * @jest-environment node
 */
import * as Http from "http";
import launchServer from "../server";

import app from "../app";

import axios from "axios";

import httpAdapter from "axios/lib/adapters/http";
import { logger } from "../logger/logger";
axios.defaults.adapter = httpAdapter;

const PORT = 4401;
const HOST = "http://localhost:" + PORT.toString();
// let jwtTokens;

describe("Exchange API", () => {
    let server: Http.Server;

    beforeAll(async () => {
        server = Http.createServer(app);
        await launchServer(server, PORT);
    });

    // Run tests
    describe("Test Get", () => {
        test("valid getAll()", async () => {
            const r = await axios.get(HOST);
            expect(r.status).toEqual(200);
            expect(r.data).toEqual({ message: "Base request successful!!" });
        });
        test("valid getUser()", async () => {
            const r = await axios.get(`${HOST}/user`);
            expect(r.status).toEqual(200);
            expect(r.data).toEqual({ message: "User request successful!!" });
        });
        test("invalid getUser()", async () => {
            expect.assertions(1);
            try {
                const r = await axios.get(`${HOST}/abcd`);
            } catch (e) {
                expect(e.message).toStrictEqual("Request failed with status code 404");
                // expect(e).toMatch(`${notExisting.errorMessage} (Code: ${notExisting.errorCode})`);
            }
        });
    });
});
