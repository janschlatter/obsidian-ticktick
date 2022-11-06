import { App, PluginSettingTab, Setting } from 'obsidian';

import type TickTickPlugin from './main';

export interface TickTickPluginSettings {
  defaultTags: string;
  defaultList: string;
  defaultPriority: string;
  appendText: string;
  prependText: string;
}

export const DEFAULT_SETTINGS: TickTickPluginSettings = {
  defaultTags: '',
  defaultList: 'Inbox',
  defaultPriority: 'None',
  appendText: '',
  prependText: '',
};

export class TickTickPluginSettingTab extends PluginSettingTab {
  plugin: TickTickPlugin;

  constructor(app: App, plugin: TickTickPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();
    containerEl.createEl('h2', { text: 'TickTick Settings' });

    new Setting(containerEl)
      .setName('Default Tags')
      .setDesc('Prefixing with # is not required.')
      .addText((toggle) => {
        toggle.setValue(this.plugin.settings.defaultTags).onChange(async (value) => {
          this.plugin.settings.defaultTags = value;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Default List')
      .setDesc('The default list for a new task')
      .addText((toggle) => {
        toggle.setValue(this.plugin.settings.defaultList).onChange(async (value) => {
          this.plugin.settings.defaultList = value;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Default Priority')
      .setDesc('The default priority for a new task')
      .addDropdown((dropdown) => {
          dropdown.addOption('0', 'None');
          dropdown.addOption('1', 'Low');
          dropdown.addOption('3', 'Medium');
          dropdown.addOption('5', 'High');
          dropdown.onChange(async (value) => {
            this.plugin.settings.defaultPriority = value;
            await this.plugin.saveSettings();
        });
      });

      containerEl.createEl('hr');
      containerEl.createEl('h2', { text: 'Quick Add Settings' });
      containerEl.createEl('p', { text: 'Using the Quck Add command skips the Pop-Up Modal. Aside of the extra options below, it will follow the given options above. Due to restrictions, macOS will still switch to TickTick.' });

      new Setting(containerEl)
      .setName('Prepend Task Title')
      .setDesc('By default, the task title starts with a link to the file. This option will add a prefix to task title.')
      .addText((toggle) => {
        toggle.setValue(this.plugin.settings.prependText).onChange(async (value) => {
          this.plugin.settings.prependText = value;
          await this.plugin.saveSettings();
        });
      });

      new Setting(containerEl)
      .setName('Append Task Title')
      .setDesc('Remember to add a space before the text.')
      .addText((toggle) => {
        toggle.setValue(this.plugin.settings.appendText).onChange(async (value) => {
          this.plugin.settings.appendText = value;
          await this.plugin.saveSettings();
        });
      });

      containerEl.createEl('p', { text: 'If you have any questions or suggestions, please visit the GitHub repo.' });
      new Setting(containerEl)
      .setName('GitHub')
      .setDesc('Feel free to star the repo if you like the plugin.')
      .addButton((button) => {
        button.setButtonText('GitHub').setCta().onClick(() => {
          window.open('https://github.com/tkat0/obsidian-ticktick');
        });
      });
    }
}
