import * as vscode from 'vscode';
import { insertConsoleTableCommand } from '@/commands/insertConsoleTable';
import { insertForSelections } from '@/commands/commandRuntime';
import { makeTextDocument } from '@/jest-tests/mocks/helpers/makeTextDocument';
import { makeTextEditor } from '@/jest-tests/mocks/helpers/makeTextEditor';
import { makeExtensionContext } from '@/jest-tests/mocks/helpers';
import { ExtensionProperties } from '@/entities';

jest.mock('@/commands/commandRuntime', () => ({
  insertForSelections: jest.fn().mockResolvedValue(true),
}));

jest.mock('@/utilities', () => ({
  getTabSize: () => 2,
}));

const mockInsertForSelections = insertForSelections as jest.MockedFunction<
  typeof insertForSelections
>;

describe('insertConsoleTableCommand', () => {
  beforeEach(() => jest.clearAllMocks());

  afterEach(() => {
    vscode.window.activeTextEditor = undefined;
  });

  it('does nothing when no editor is active', async () => {
    vscode.window.activeTextEditor = undefined;

    await insertConsoleTableCommand().handler({
      context: makeExtensionContext(),
      extensionProperties: {} as ExtensionProperties,
    });

    expect(mockInsertForSelections).not.toHaveBeenCalled();
  });

  it('calls insertForSelections with the table type', async () => {
    const extensionProperties = {} as ExtensionProperties;
    const editor = makeTextEditor({
      document: makeTextDocument(['const myVar = 1;']),
    });
    vscode.window.activeTextEditor = editor;

    await insertConsoleTableCommand().handler({
      context: makeExtensionContext(),
      extensionProperties,
    });

    expect(mockInsertForSelections).toHaveBeenCalledWith(
      editor,
      extensionProperties,
      'table',
      2,
    );
  });

  it('shows information message when document is PHP', async () => {
    const showInformationMessageSpy = jest.spyOn(
      vscode.window,
      'showInformationMessage',
    );
    const extensionProperties = {} as ExtensionProperties;
    const editor = makeTextEditor({
      document: makeTextDocument(['<?php $x = 1;'], 'test.php', 'php'),
    });
    vscode.window.activeTextEditor = editor;

    await insertConsoleTableCommand().handler({
      context: makeExtensionContext(),
      extensionProperties,
    });

    expect(showInformationMessageSpy).toHaveBeenCalled();
    expect(mockInsertForSelections).not.toHaveBeenCalled();
  });
});
