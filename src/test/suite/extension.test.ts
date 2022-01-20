import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');
	test('Sample test', async () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
		const ids = vscode.extensions.all.map(e => e.id);
		assert(ids.includes('undefined_publisher.test-ext'), `text-ext extension is not installed. Installed extensions: ${JSON.stringify(ids)}`);
		const result = await vscode.commands.executeCommand('test-ext.helloWorld');
		const commandsList = await vscode.commands.getCommands(true);
		assert.strictEqual('Hello World from test-ext!', result);
		// create a new file and open it
		const doc = await vscode.workspace.openTextDocument({
			content: 'Hello error World',
		});
		await vscode.window.showTextDocument(doc);
		// get all diagnostics
		let diagnostics = (await vscode.languages.getDiagnostics()).flatMap(([_, d]) => d);
		assert.deepStrictEqual(diagnostics.map(d => d.message), ['This is a test erro message']);

		// remove the word 'error' from the document and get diagnostics again
		const editResult = await vscode.window.activeTextEditor!.edit(edit => {
			edit.delete(new vscode.Range(0, 0, 0, 12));
		});
		assert.strictEqual(editResult, true);
		diagnostics = (await vscode.languages.getDiagnostics()).flatMap(([_, d]) => d);
		assert.deepStrictEqual(diagnostics.map(d => d.message), []);
	});
});
