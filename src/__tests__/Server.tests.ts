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
        // jwtTokens = await signinAll(HOST);
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

// test("valid getUser()", async () => {
//     const id = 123;

//     const data = {
//         jsonrpc: "2.0",
//         id,
//         method: "eapi_echo",
//         params: {
//             message: "",
//         },
//     };

//     const r = await axios.post(HOST, data);
//     expect(r.data.error).toEqual(echo.errors.emptyMessageError);
// });

//         test("invalid eapi_echo()", async () => {
//             // '1.0' is invalid! the spec only accepts '2.0'.
//             const invalidJsonRpcField = "1.0";

//             const id = 123;

//             const data = {
//                 jsonrpc: invalidJsonRpcField,
//                 id,
//                 method: "eapi_echo",
//                 params: {
//                     message: "hello",
//                 },
//             };

//             const r = await axios.post(HOST, data);
//             expect(r.data).toBeTruthy();
//             expect(r.status).toEqual(200);
//             expect(r.data.id).toEqual(id);
//             expect(r.data.error).toEqual(JrpcErrorCodes.invalidRequest);
//         });

//         test("undefined method", async () => {
//             const id = 123;
//             const data = {
//                 jsonrpc: "2.0",
//                 id,
//                 method: "abcdef1234xyz",
//                 params: {
//                     message: "hello",
//                 },
//             };

//             const r = await axios.post(HOST, data);
//             expect(r.data).toBeTruthy();
//             expect(r.status).toEqual(200);
//             expect(r.data.id).toEqual(id);
//             expect(r.data.error).toEqual(JrpcErrorCodes.methodNotFound);
//         });

//         test("invalid eapi_echo() params", async () => {
//             const id = 123;

//             const data = {
//                 jsonrpc: "2.0",
//                 id,
//                 method: "eapi_echo",
//                 params: {
//                     invalid123: "hello",
//                 },
//             };

//             const r = await axios.post(HOST, data);
//             expect(r.data).toBeTruthy();
//             expect(r.status).toEqual(200);
//             expect(r.data.id).toEqual(id);
//             expect(r.data.error).toEqual(JrpcErrorCodes.invalidParams);
//         });

//         test("eapi_echo_invalid_success should be caught by router validation", async () => {
//             const data = {
//                 jsonrpc: "2.0",
//                 id: 123,
//                 method: "eapi_echo_invalid_success",
//                 params: {
//                     message: "hello",
//                 },
//             };

//             const r = await axios.post(HOST, data);
//             expect(r.data.error).toEqual(JrpcErrorCodes.invalidSuccessResponse);
//         });

//         test("eapi_echo_invalid_error should be caught by router validation", async () => {
//             const data = {
//                 jsonrpc: "2.0",
//                 id: 123,
//                 method: "eapi_echo_invalid_error",
//                 params: {
//                     message: "hello",
//                 },
//             };

//             const r = await axios.post(HOST, data);
//             expect(r.data.error).toEqual(JrpcErrorCodes.invalidErrorResponse);
//         });

//         test("eapi_echo_neither_error should be caught by router validation", async () => {
//             const data = {
//                 jsonrpc: "2.0",
//                 id: 123,
//                 method: "eapi_echo_neither_error",
//                 params: {
//                     message: "hello",
//                 },
//             };

//             const r = await axios.post(HOST, data);
//             expect(r.data.error).toEqual(JrpcErrorCodes.neitherSuccessNorErrorResponse);
//         });
//     });

//     describe("Endpoint security via JWT and privileges", async () => {
//         test("Secured eapi_echo_secure() with correct rights", async () => {
//             const id = Math.floor(Math.random() * 10000);

//             const data = {
//                 jsonrpc: "2.0",
//                 id,
//                 method: "eapi_echo_secure",
//                 params: {
//                     jwt: jwtTokens["trader1@test.com"],
//                     message: "hello",
//                 },
//             };

//             const r = await axios.post(HOST, data);
//             expect(r.status).toEqual(200);
//             expect(r.data.id).toEqual(id);
//             expect(r.data.jsonrpc).toEqual("2.0");
//             expect(r.data.result).toEqual({ message: "hello" });
//         });
//         test("Secured eapi_echo_secure() with incorrect rights", async () => {
//             const id = Math.floor(Math.random() * 10000);

//             const data = {
//                 jsonrpc: "2.0",
//                 id,
//                 method: "eapi_echo_secure2",
//                 params: {
//                     jwt: jwtTokens["trader1@test.com"],
//                     message: "hello",
//                 },
//             };

//             const r = await axios.post(HOST, data);
//             expect(r.status).toEqual(200);
//             expect(r.data.id).toEqual(id);
//             expect(r.data.jsonrpc).toEqual("2.0");
//             expect(r.data.result).toBeUndefined();
//             expect(r.data.error.code).toEqual(-32003);
//         });
//     });

//     describe("Multi-call JSON-RPC validation", () => {
//         test("array of calls to eapi_echo() with one erroneous result", async () => {
//             const id = 123;

//             const data = {
//                 jsonrpc: "2.0",
//                 id,
//                 method: "eapi_echo",
//                 params: {
//                     message: "hello",
//                 },
//             };

//             const invalidData = {
//                 jsonrpc: "1.0",
//                 id,
//                 method: "eapi_echo",
//                 params: {
//                     message: "hello",
//                 },
//             };

//             const resp = await axios.post(HOST, [data, invalidData]);
//             expect(resp.status).toEqual(200);
//             const d = resp.data;

//             // make the erroneous result be at index 0
//             d.sort((a: any) => {
//                 if (a.hasOwnProperty("error")) {
//                     return -1;
//                 }

//                 return 1;
//             });

//             expect(d[0].id).toEqual(id);
//             expect(d[0].jsonrpc).toEqual("2.0");
//             expect(d[0].error).toEqual({ code: -32600, message: "Invalid Request" });

//             expect(d[1].id).toEqual(id);
//             expect(d[1].jsonrpc).toEqual("2.0");
//             expect(d[1].result).toEqual({ message: "hello" });
//         });

//         test("array of calls to eapi_echo()", async () => {
//             const id = 123;

//             const data = {
//                 jsonrpc: "2.0",
//                 id,
//                 method: "eapi_echo",
//                 params: {
//                     message: "hello",
//                 },
//             };

//             const resp = await axios.post(HOST, [data, data]);
//             expect(resp.status).toEqual(200);
//             resp.data.forEach((r: any) => {
//                 expect(r.id).toEqual(id);
//                 expect(r.jsonrpc).toEqual("2.0");
//                 expect(r.result).toEqual({ message: "hello" });
//             });
//         });
//     });

//     afterAll(() => {
//         // Close the server once the tests are complete
//         server.close();
//     });
// });

// async function signin(host: string, email: string, password: string) {
//     const data = {
//         jsonrpc: "2.0",
//         id: 28282,
//         method: "eapi_signin",
//         params: {
//             email,
//             password,
//         },
//     };
//     const result = await axios.post(host, data);

//     return result.data.result;
// }

// async function signinAll(host: string) {
//     //Log in everyone
//     const tokenStore = {};
//     config.seed.users.forEach(async (item: any) => {
//         tokenStore[item.email] = (await signin(host, item.email, item.password)).token;
//     });

//     return tokenStore;
// }
