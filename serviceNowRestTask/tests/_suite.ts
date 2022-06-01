import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';

describe('Sample task tests', function () {
	before(function () {});

	after(() => {});

	it('should succeed with sample get call', function (done: Mocha.Done) {
		console.log('Running GET call');
		let tp = path.join(__dirname, 'success.ts');
		let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

		tr.run();
		assert.equal(tr.succeeded, true, 'should have succeeded');
		assert.equal(tr.warningIssues.length, 0, 'should have no warnings');
		assert.equal(tr.errorIssues.length, 0, 'should have no errors');
		console.log(tr.stdout);
		done();
	});
});
