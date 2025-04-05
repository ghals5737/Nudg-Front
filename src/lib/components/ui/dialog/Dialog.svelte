<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { cn } from "$lib/utils/utils.js";

  export let open = false;
  const isOpen = writable(open);
  
  $: $isOpen = open;
  
  setContext('dialog', {
    isOpen
  });
</script>

<div class="relative z-50" {...$$restProps}>
  <slot />
</div> 