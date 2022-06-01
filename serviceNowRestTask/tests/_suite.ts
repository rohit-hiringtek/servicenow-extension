import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';

describe('Sample task tests', function () {
	before(function () {});

	after(() => {});

	it('should succeed with sample get call', function (done: Mocha.Done) {
		console.log('Running GET call');
		let tp = path.join(__dirname, 'success.js');
		let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

		tr.run();
		assert.equal(tr.succeeded, true, 'should have succeeded');
		assert.equal(tr.warningIssues.length, 0, 'should have no warnings');
		assert.equal(tr.errorIssues.length, 0, 'should have no errors');
		console.log(tr.stdout);
		done();
	});

	it('should fail with sample get call', function (done: Mocha.Done) {
		console.log('Running GET call');
		let tp = path.join(__dirname, 'failure.js');
		let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
		tr.run();
		assert.equal(tr.succeeded, false, 'should have failed');
		assert.equal(tr.warningIssues.length, 0, 'should have no warnings');
		assert.equal(tr.errorIssues.length, 1, 'should have one error');
		console.log(tr.stdout);
		done();
	});
});
