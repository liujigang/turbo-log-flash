import * as vscode from 'vscode';
import { Command } from '../entities';
import { getTabSize } from '../utilities';
import { insertForSelections } from './commandRuntime';

export function insertConsoleInfoCommand(): Command {
  return {
    name: 'turboConsoleLog.insertConsoleInfo',
    handler: async ({ extensionProperties }) => {
      const editor: vscode.TextEditor | undefined =
        vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const tabSize: number = getTabSize(editor.options.tabSize);
      await insertForSelections(
        editor,
        extensionProperties,
        'info',
        tabSize,
      );
    },
  };
}
