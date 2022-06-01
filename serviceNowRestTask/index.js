"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = __importDefault(require("azure-pipelines-task-lib/task"));
const node_fetch_1 = __importDefault(require("node-fetch"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Starting task');
            const username = task_1.default.getVariable('username');
            const password = task_1.default.getVariable('password');
            const host = task_1.default.getVariable('host');
            console.log(`Connecting to Service Now instance ${host}`);
            const apiEndpoint = task_1.default.getInput('urlSuffix', true);
            const httpMethod = task_1.default.getInput('method', true);
            const body = task_1.default.getInput('body', false);
            const headers = `\n\"Content-Type\": \"application/json\", \n\"Accept\": \"application/json\", \n\"Authorization\": \"Basic ${Buffer.from(`${username}:${password}`).toString('base64')}\"`;
            const url = `${host}/${apiEndpoint}`;
            console.log(`Sending request to ${url}`);
            console.log(`Method: ${httpMethod}`);
            console.log(`Headers: ${headers}`);
            console.log(`Body: ${body}`);
            try {
                const response = yield node_fetch_1.default(url, {
                    method: httpMethod === null || httpMethod === void 0 ? void 0 : httpMethod.toLowerCase(),
                    headers: headers,
                    body: body,
                });
                const data = yield response.json();
                console.log(`Response: ${JSON.stringify(data)}`);
                if (response.status >= 400) {
                    task_1.default.setResult(task_1.default.TaskResult.Failed, `${response.status} ${response.statusText}`);
                    return;
                }
                task_1.default.setResult(task_1.default.TaskResult.Succeeded, 'REST API Call Success');
            }
            catch (err) {
                console.log(err);
                task_1.default.setResult(task_1.default.TaskResult.Failed, err.message);
            }
        }
        catch (err) {
            task_1.default.setResult(task_1.default.TaskResult.Failed, err.message);
        }
    });
}
run();
