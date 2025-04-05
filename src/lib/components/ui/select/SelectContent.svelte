<script lang="ts">
  import { cn } from "$lib/utils/utils.js";

  let className = "";
  export { className as class };
</script>

<div
  class={cn(
    "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
    className
  )}
  {...$$restProps}
>
  <div class="p-1">
    <slot />
  </div>
</div> 