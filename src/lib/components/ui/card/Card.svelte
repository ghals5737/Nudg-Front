<script lang="ts">
  import { cn } from "$lib/utils/utils.js";

  let className = "";
  export { className as class };
</script>

<div class={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
  <slot />
</div> 