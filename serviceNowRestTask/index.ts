import tl = require('azure-pipelines-task-lib/task');
import fetch from 'node-fetch';
async function run() {
	try {
		const username = tl.getVariable('username');
		const password = tl.getVariable('password');
		const host = tl.getVariable('host');

		console.log(`Connecting to Service Now instance ${host}`);

		const apiEndpoint = tl.getInput('urlSuffix', true);
		const httpMethod = tl.getInput('method', true);
		const body = tl.getInput('body', false);
		const headers = `\n\"Content-Type\": \"application/json\", \n\"Accept\": \"application/json\", \n\"Authorization\": \"Basic ${Buffer.from(
			`${username}:${password}`
		).toString('base64')}\"`;
		const url = `${host}/${apiEndpoint}`;

		console.log(`Sending request to ${url}`);
	} catch (err: any) {
		tl.setResult(tl.TaskResult.Failed, err.message);
	}
}

run();
