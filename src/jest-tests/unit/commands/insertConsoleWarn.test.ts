import * as vscode from 'vscode';
import { insertConsoleWarnCommand } from '@/commands/insertConsoleWarn';
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

describe('insertConsoleWarnCommand', () => {
  beforeEach(() => jest.clearAllMocks());

  afterEach(() => {
    vscode.window.activeTextEditor = undefined;
  });

  it('does nothing when no editor is active', async () => {
    vscode.window.activeTextEditor = undefined;

    await insertConsoleWarnCommand().handler({
      context: makeExtensionContext(),
      extensionProperties: {} as ExtensionProperties,
    });

    expect(mockInsertForSelections).not.toHaveBeenCalled();
  });

  it('calls insertForSelections with the log type', async () => {
    const extensionProperties = {} as ExtensionProperties;
    const editor = makeTextEditor({
      document: makeTextDocument(['const myVar = 1;']),
    });
    vscode.window.activeTextEditor = editor;

    await insertConsoleWarnCommand().handler({
      context: makeExtensionContext(),
      extensionProperties,
    });

    expect(mockInsertForSelections).toHaveBeenCalledWith(
      editor,
      extensionProperties,
      'warn',
      2,
    );
  });
});
