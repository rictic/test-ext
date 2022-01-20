// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "test-ext" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('test-ext.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const message = 'Hello World from test-ext!';
		vscode.window.showInformationMessage(message);
		return message;
	});

	const diagnosticsCollection = vscode.languages.createDiagnosticCollection('test-ext');

	// if a file includes the word "error", show a diagnostic
	vscode.workspace.onDidChangeTextDocument(event => {
		const diagnostics: vscode.Diagnostic[] = [];
		if (event.document.getText().includes('error')) {
			diagnostics.push({
				severity: vscode.DiagnosticSeverity.Error,
				range: new vscode.Range(0, 0, 0, 0),
				message: 'This is a test error message',
				source: 'Test Extension'
			});
		}
		diagnosticsCollection.set(event.document.uri, diagnostics);
	})

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
