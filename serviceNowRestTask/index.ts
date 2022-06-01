import tl from 'azure-pipelines-task-lib/task';
import fetch from 'node-fetch';
async function run() {
	try {
		console.log('Starting task');
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
		console.log(`Method: ${httpMethod}`);
		console.log(`Headers: ${headers}`);
		console.log(`Body: ${body}`);
		try {
			const response = await fetch(url, {
				method: httpMethod?.toLowerCase(),
				headers: headers,
				body: body,
			});
			const data = await response.json();
			console.log(`Response: ${JSON.stringify(data)}`);
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
