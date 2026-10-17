import * as vscode from 'vscode';

import { ExtensionProperties } from './extensionProperties';

type CommandHandlerProperties = {
  context: vscode.ExtensionContext;
  extensionProperties: ExtensionProperties;
  args?: unknown[];
};

export type Command = {
  name: string;
  handler: (
    commandHandlerProperties: CommandHandlerProperties,
  ) => Promise<void>;
};
