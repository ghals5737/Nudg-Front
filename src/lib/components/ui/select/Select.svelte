<script lang="ts">
  import { cn } from "$lib/utils/utils.js";

  let className = "";
  export { className as class };
  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  
  export let value: any;
  const dispatch = createEventDispatcher();
  const selectValue = writable(value);
  
  setContext('select', {
    selectValue,
    select: (val: any) => {
      value = val;
      $selectValue = val;
      dispatch('change', val);
    }
  });
  
  $: $selectValue = value;
</script>

<div class={cn("relative", className)} {...$$restProps} >
  <slot />
</div> 