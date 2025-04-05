<script lang="ts">
    export let value = 0;
    export let size = 40;
    export let strokeWidth = 4;
    export let strokeColor = "#2C868E";
    
    $: radius = (size - strokeWidth) / 2;
    $: circumference = radius * 2 * Math.PI;
    $: offset = circumference - (value / 100) * circumference;
  </script>
  
  <div class="relative inline-flex items-center justify-center">
    <svg width={size} height={size} class="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="#e6e6e6"
        stroke-width={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-dasharray={circumference}
        stroke-dashoffset={offset}
        stroke-linecap="round"
      />
    </svg>
    <span class="absolute text-xs font-medium">{value}%</span>
  </div>
  
  