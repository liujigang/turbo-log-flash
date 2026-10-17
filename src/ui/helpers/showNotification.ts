import * as vscode from 'vscode';

/**
 * Shows an information notification.
 * @param message - Notification message
 * @param duration - Duration in milliseconds (optional, preserved for compatibility)
 */
export function showNotification(message: string, duration?: number): void {
  void duration;
  vscode.window.showInformationMessage(message);
}
