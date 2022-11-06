<script lang="ts">
  import { Notice } from 'obsidian';
  import type { Task } from 'src/model';
import type { TickTickPluginSettings } from 'src/setting';
let settings: TickTickPluginSettings;

  import Icon from './Icon.svelte';

  export let task: Task;
  export let onCreateClick: (task: Task) => void;

  function onCopyClick() {
    navigator.clipboard.writeText(task.title);
    new Notice('Copied task title to clipboard');
  }
  // when button is clicked, set the css class of the button to 'clicked' and reset all other buttons
  function onButtonClick() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.classList.remove('clicked');
    });
    this.classList.add('clicked');
  }
  // make button active according to TickTickPluginSettings defaultPriority
  function onMount() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      if (button.id === settings.defaultPriority) {
        button.classList.add('clicked');
      }
    });
  }

</script>

<h1 class="mb-5 text-2xl">Create a new task to TickTick</h1>

<form>
  <div class="mb-5">
    <label class="mb-1 block font-medium" for="title">Title</label>
    <div class="flex items-center">
      <input class="grow" type="text"
      bind:value={task.title}
      placeholder="Default: The link to the current note"/>
      <div class="p-1">
        <button type="button" class="p-1" on:click={onCopyClick}>
          <Icon iconId="ClipboardCopy" size={16} />
        </button>
      </div>
    </div>
  </div>

  <div class="mb-5">
    <label class="mb-1 block font-medium" for="description">Description</label>
    <textarea
      id="description"
      rows="8"
      class="block w-full px-[14px] py-[5px] focus:border-interactive-accent"
      bind:value={task.content}
      placeholder="Default: The selected strings"
    />
  </div>

  <div class="mb-5">
    <label class="mb-3 block font-medium" for="description">List</label>
    <input class="block w-full" type="text" bind:value={task.list} />
  </div>

  <div class="mb-5">
    <label class="mb-1 w-half font-medium" for="description">Tags</label>
    <input class="block w-full"
    type="text"
    bind:value={task.tags}
    placeholder="Prefix # is not neccessary (e.g. obsidian)"/>
  </div>

<div class="mb-5">
  <label class="mb-1 w-half font-medium" for="description">Priority</label>
  <div class="flex">
    <button type="button" id="0" class="inline-block px-6 py-2.5 bg-grey-600 text-grey font-medium text-xs leading-tight rounded shadow-md hover:bg-grey-700 hover:shadow-lg focus:bg-grey-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-grey-800 active:shadow-lg transition duration-150 ease-in-out" on:click={onButtonClick} on:click={() => task.priority = "0"}>
      None
    </button>
    <button type="button" id="1" class="inline-block px-6 py-2.5 bg-yellow-600 text-grey font-medium text-xs leading-tight rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out" on:click={onButtonClick} on:click={() => task.priority = "1"}>
      Low
    </button>
    <button type="button" id="3" class="inline-block px-6 py-2.5 bg-orange-600 text-grey font-medium text-xs leading-tight rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out" on:click={onButtonClick} on:click={() => task.priority = "3"}>
      Medium
    </button>
    <button type="button" id="5" class="inline-block px-6 py-2.5 bg-red-600 text-grey font-medium text-xs leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" on:click={onButtonClick} on:click={() => task.priority = "5"}>
      High
    </button>
  </div>
</div>



  <button
    type="button"
    class="mod-cta mt-3 w-full px-[20px] py-[6px]"
    on:click={() => {
      onCreateClick(task);
    }}>Create and Open TickTick</button>
</form>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  select {
    -webkit-app-region: no-drag;
    background: var(--background-modifier-form-field);
    border: var(--input-border-width) solid var(--background-modifier-border);
    color: var(--text-normal);
    font-family: inherit;
    padding: var(--size-4-1) var(--size-4-2);
    font-size: var(--font-ui-small);
    border-radius: var(--input-radius);
    outline: none;
}
</style>
