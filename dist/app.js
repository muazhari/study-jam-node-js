"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const process_1 = __importDefault(require("./models/process"));
const child_process_1 = require("child_process");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const port = 3000;
const executorChildProcess = (0, child_process_1.fork)("./dist/workers/executor.js");
executorChildProcess.send({ event: "start", payload: undefined });
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.post('/', (req, res) => {
    const { method, url, query, body, executeAt, isRepeated, repeatDelay, repeatCount } = req.body;
    const process = new process_1.default(method, url, query, body, new Date(executeAt), isRepeated, repeatDelay, repeatCount);
    executorChildProcess.send({ event: "push", payload: process });
    res.send('A new process has inserted to queue');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
