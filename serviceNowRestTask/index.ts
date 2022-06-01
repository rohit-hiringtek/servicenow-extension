import tl = require('azure-pipelines-task-lib/task');
import axios, { AxiosRequestHeaders } from 'axios';
async function run() {
	try {
		console.log('Starting task');

		const username = tl.getVariable('USERNAME');
		const password = tl.getVariable('PASSWORD');
		const host = tl.getVariable('HOST');

		console.log(`Connecting to Service Now instance ${host}`);

		const apiEndpoint = tl.getInput('urlSuffix', true);
		const httpMethod = tl.getInput('method', true);
		const body = tl.getInput('body', false);
		// const headers = `\n\"Content-Type\": \"application/json\", \n\"Accept\": \"application/json\", \n\"Authorization\": \"Basic ${Buffer.from(
		// 	`${username}:${password}`
		// ).toString('base64')}\"`;

		const headers: AxiosRequestHeaders = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
				'base64'
			)}`,
		};
		const url = `${host}/${apiEndpoint}`;

		console.log(`Sending request to ${url}`);
		console.log(`Method: ${httpMethod}`);
		console.log(`Headers: ${headers}`);
		console.log(`Body: ${body}`);
		try {
			const response = await axios({
				url: url,
				method: httpMethod?.toLocaleLowerCase(),
				headers: headers,
				data: body ? body : undefined,
			});
			// console.log(`Response: ${JSON.stringify(response.data)}`);
			if (response.status >= 400) {
				tl.setResult(
					tl.TaskResult.Failed,
					`${response.status} ${response.statusText}`
				);
				return;
			}
			tl.setResult(tl.TaskResult.Succeeded, 'REST API Call Success');
		} catch (err: any) {
			console.log(err);
			tl.setResult(tl.TaskResult.Failed, err.message);
		}
	} catch (err: any) {
		tl.setResult(tl.TaskResult.Failed, err.message);
	}
}

run();
