import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import tl from 'azure-pipelines-task-lib/task';
import path = require('path');

let taskPath = path.join(__dirname, '..', 'index.ts');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('method', 'get');
tmr.setInput('urlSuffix', '/api/now/table/incident');
process.env['username'] = 'admin';
process.env['password'] = 'FfB7dW=*k7Bf';
process.env['host'] = 'https://dev75028.service-now.com';

tmr.run();
