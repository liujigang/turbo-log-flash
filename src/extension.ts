import * as vscode from 'vscode';
import { Command, ExtensionProperties } from './entities';
import { getAllCommands } from './commands';
import { getExtensionProperties } from './helpers';

export function activate(context: vscode.ExtensionContext): void {
  const config: vscode.WorkspaceConfiguration =
    vscode.workspace.getConfiguration('turboConsoleLog');
  const extensionProperties: ExtensionProperties =
    getExtensionProperties(config);

  const commands: Array<Command> = getAllCommands();
  for (const { name, handler } of commands) {
    context.subscriptions.push(
      vscode.commands.registerCommand(name, (args: unknown[]) => {
        handler({
          extensionProperties,
          args,
          context,
        });
      }),
    );
  }
}

export function deactivate(): void {}
