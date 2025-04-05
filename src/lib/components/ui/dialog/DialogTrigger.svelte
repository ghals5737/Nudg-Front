<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from "$lib/utils/utils.js";
  import type { Writable } from 'svelte/store';

  interface DialogContext {
    isOpen: Writable<boolean>;
  }

  const { isOpen } = getContext<DialogContext>('dialog');
  
  let className = "";
  export { className as class };
  export let asChild = false;
</script>

{#if asChild}
  <div 
    on:click={() => $isOpen = true}
    class={className}
    {...$$restProps}
  >
    <slot />
  </div>
{:else}
  <button
    type="button"
    on:click={() => $isOpen = true}
    class={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...$$restProps}
  >
    <slot />
  </button>
{/if} 