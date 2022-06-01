import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('method', 'get');
tmr.setInput('urlSuffix', '/api/now/table/inciden');
process.env['USERNAME'] = 'admin';
process.env['PASSWORD'] = 'FfB7dW=*k7Bf';
process.env['HOST'] = 'https://dev75028.service-now.com';

tmr.run();
