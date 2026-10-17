import * as vscode from 'vscode';
import { activate, deactivate } from '../../extension';
import * as commandsModule from '../../commands';
import * as helpers from '../../helpers';
import { ExtensionProperties } from '../../entities';

jest.mock('../../helpers');

describe('activate', () => {
  const registerCommandMock = jest.fn();
  const getConfigurationMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(helpers, 'getExtensionProperties').mockReturnValue({
      wrapLogMessage: false,
      logMessagePrefix: '🚀',
    } as ExtensionProperties);

    jest.spyOn(commandsModule, 'getAllCommands').mockReturnValue([
      { name: 'turbo.cmd1', handler: jest.fn() },
      { name: 'turbo.cmd2', handler: jest.fn() },
    ]);

    jest
      .spyOn(vscode.commands, 'registerCommand')
      .mockImplementation(registerCommandMock);
    jest
      .spyOn(vscode.workspace, 'getConfiguration')
      .mockImplementation(getConfigurationMock);
  });

  it('should register all commands and add to subscriptions', () => {
    const mockContext = {
      subscriptions: [] as vscode.Disposable[],
    } as vscode.ExtensionContext;

    activate(mockContext);

    expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith(
      'turboConsoleLog',
    );
    expect(helpers.getExtensionProperties).toHaveBeenCalled();
    expect(commandsModule.getAllCommands).toHaveBeenCalled();
    expect(vscode.commands.registerCommand).toHaveBeenCalledTimes(2);
    expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
      'turbo.cmd1',
      expect.any(Function),
    );
    expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
      'turbo.cmd2',
      expect.any(Function),
    );
    expect(mockContext.subscriptions.length).toBe(2);
  });

  it('should execute command handler when registered command callback is invoked', () => {
    const mockHandler = jest.fn();
    jest.spyOn(commandsModule, 'getAllCommands').mockReturnValue([
      { name: 'turbo.testCmd', handler: mockHandler },
    ]);

    const mockContext = {
      subscriptions: [] as vscode.Disposable[],
    } as vscode.ExtensionContext;

    activate(mockContext);

    // Call registered handler
    const registeredCallback = registerCommandMock.mock.calls[0][1];
    registeredCallback(['arg1']);

    expect(mockHandler).toHaveBeenCalledWith({
      extensionProperties: expect.any(Object),
      args: ['arg1'],
      context: mockContext,
    });
  });
});

describe('deactivate', () => {
  it('should run deactivate without error', () => {
    expect(() => deactivate()).not.toThrow();
  });
});
