<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from "$lib/utils/utils.js";
  import type { Writable } from 'svelte/store';
  import Button from '$lib/components/ui/button/Button.svelte';

  interface DialogContext {
    isOpen: Writable<boolean>;
  }

  const { isOpen } = getContext<DialogContext>('dialog');
  
  let className = "";
  export { className as class };
  
  function closeDialog() {
    $isOpen = false;
  }
</script>

{#if $isOpen}
  <div class="fixed inset-0 z-50 bg-black/50" on:click={closeDialog} />
  <div 
    class={cn(
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
      className
    )}
    {...$$restProps}
  >
    <Button 
      variant="ghost" 
      size="icon" 
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
      on:click={closeDialog}
    >
      <span class="h-4 w-4">×</span>
      <span class="sr-only">Close</span>
    </Button>
    <slot />
  </div>
{/if} 