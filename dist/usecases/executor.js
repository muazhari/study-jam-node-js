"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class Executor {
    constructor(data) {
        this.data = data;
    }
    execute() {
        this.data.forEach((item, index) => {
            console.log("Checking: ", item);
            const executeAt = new Date(item.executeAt);
            const currentDate = new Date();
            if (executeAt.getMilliseconds() <= currentDate.getMilliseconds()) {
                console.log("Executing: ", item);
                const httpClient = this.prepareHttpClient(item.method, item.url, item.query, item.body);
                httpClient.then((response) => {
                    console.log("Response: ", response.status, response.data);
                }).catch((error) => {
                    console.log("Error: ", error);
                });
                if (item.isRepeated) {
                    item.executeAt = new Date(new Date().getMilliseconds() + item.repeatDelay);
                    item.repeatCount = item.repeatCount - 1;
                    if (item.repeatCount === 0) {
                        this.data.splice(index, 1);
                    }
                }
                else {
                    this.data.splice(index, 1);
                }
            }
        });
    }
    prepareHttpClient(method, url, query, body) {
        switch (method) {
            case "get":
                return axios_1.default.get(url, {
                    params: query
                });
            case "post":
                return axios_1.default.post(url, body, {
                    params: query
                });
            case "put":
                return axios_1.default.put(url, body, {
                    params: query
                });
            case "patch":
                return axios_1.default.patch(url, body, {
                    params: query
                });
            case "delete":
                return axios_1.default.delete(url, {
                    params: query
                });
            default:
                throw Error("Method not supported.");
        }
    }
}
exports.default = Executor;
