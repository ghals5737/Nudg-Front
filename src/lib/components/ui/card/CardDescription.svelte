<script lang="ts">
  import { cn } from "$lib/utils/utils.js";
  
  let className = "";
  export { className as class };
</script>

<p
  class={cn(
    "text-sm text-muted-foreground",
    className
  )}
  {...$$restProps}
>
  <slot />
</p> 