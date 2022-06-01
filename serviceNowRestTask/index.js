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
const tl = require("azure-pipelines-task-lib/task");
const axios_1 = __importDefault(require("axios"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Starting task');
            const username = tl.getVariable('username');
            const password = tl.getVariable('password');
            const host = tl.getVariable('host');
            console.log(`Connecting to Service Now instance ${host}`);
            const apiEndpoint = tl.getInput('urlSuffix', true);
            const httpMethod = tl.getInput('method', true);
            const body = tl.getInput('body', false);
            // const headers = `\n\"Content-Type\": \"application/json\", \n\"Accept\": \"application/json\", \n\"Authorization\": \"Basic ${Buffer.from(
            // 	`${username}:${password}`
            // ).toString('base64')}\"`;
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
            };
            const url = `${host}/${apiEndpoint}`;
            console.log(`Sending request to ${url}`);
            console.log(`Method: ${httpMethod}`);
            console.log(`Headers: ${headers}`);
            console.log(`Body: ${body}`);
            try {
                const response = yield axios_1.default({
                    url: url,
                    method: httpMethod,
                    headers: headers,
                    data: body ? body : undefined
                });
                console.log(`Response: ${JSON.stringify(response.data)}`);
                if (response.status >= 400) {
                    tl.setResult(tl.TaskResult.Failed, `${response.status} ${response.statusText}`);
                    return;
                }
                tl.setResult(tl.TaskResult.Succeeded, 'REST API Call Success');
            }
            catch (err) {
                console.log(err);
                tl.setResult(tl.TaskResult.Failed, err.message);
            }
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
