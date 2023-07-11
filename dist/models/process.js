"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Process {
    constructor(method, url, query, body, executeAt, isRepeated, repeatDelay, repeatCount) {
        this.method = method;
        this.url = url;
        this.query = query;
        this.body = body;
        this.executeAt = executeAt;
        this.isRepeated = isRepeated;
        this.repeatDelay = repeatDelay;
        this.repeatCount = repeatCount;
    }
}
exports.default = Process;
