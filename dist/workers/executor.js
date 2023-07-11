"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const executor_1 = __importDefault(require("../usecases/executor"));
const executor = new executor_1.default([]);
process.on('message', ({ event, payload }) => {
    switch (event) {
        case "start":
            setInterval(() => {
                executor.execute();
            }, 500);
            break;
        case "push":
            executor.data.push(payload);
            console.log("Pushed: ", payload);
            break;
    }
});
