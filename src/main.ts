import { App, MarkdownView, Notice, Platform, Plugin } from 'obsidian';
import type { PluginManifest } from 'obsidian';

import { CreateTaskModal } from './modal';
import { TickTickPluginSettingTab } from './setting';
import type { TickTickPluginSettings } from './setting';
import { DEFAULT_SETTINGS } from './setting';
import { generateTikTickCreateTaskTitleQuick, generateTikTickCreateTaskURL } from './model';
import type { Task } from './model';

export default class TickTickPlugin extends Plugin {
  settings: TickTickPluginSettings;

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);
  }

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new TickTickPluginSettingTab(this.app, this));

    this.addCommand({
      id: 'create-task',
      name: 'Create a Task of the current page',
      checkCallback: (checking: boolean) => {
        const file = this.app.workspace.getActiveFile();
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        const isMacOS = Platform.isDesktop && Platform.isMacOS;

        if (file && view) {
          if (!checking) {
            if (!isMacOS) {
              new Notice('Error: Unsupported platform');
              return;
            }
            new CreateTaskModal(this.app, view, file, this.settings).open();
          }
          return true;
        }

        return false;
      },
      hotkeys: [{ modifiers: ['Meta'], key: 't' }],
    });

    this.addCommand({
      id: 'create-task-quick',
      name: 'Quick Add a Task based on a Preset',
      checkCallback: (checking: boolean) => {
        const file = this.app.workspace.getActiveFile();
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        const isMacOS = Platform.isDesktop && Platform.isMacOS;

        if (file && view) {
          if (!checking) {
            if (!isMacOS) {
              new Notice('Error: Unsupported platform');
              return;
            }
            // call generateTikTickCreateTaskURL
            const task: Task = {
              title: generateTikTickCreateTaskTitleQuick(file.basename, file.path, this.app.vault.getName(), this.settings.prependText, this.settings.appendText),
              content: view.editor.getSelection(),
              list: this.settings.defaultList,
              tags: this.settings.defaultTags,
              priority: this.settings.defaultPriority,
              prependText: this.settings.prependText,
              appendText: this.settings.appendText,
            };
            const url = generateTikTickCreateTaskURL(task);
            console.debug('create TickTick Task:', url);
            window.open(url);
          }
          return true;
        }

        return false;
      },
      hotkeys: [{ modifiers: ['Meta'], key: '5' }],
    });

    this.registerObsidianProtocolHandler('ticktick', (params) => {
      // TODO: It doesn't seems to be called from ticktick for macOS. only for iOS?
      // `obsidian://ticktick?id=value` would generate `{"action": "ticktick", "id": "value"}`.
      console.debug('callback', params);
    });
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  saveSettings = async () => {
    await this.saveData(this.settings);
  };
}
