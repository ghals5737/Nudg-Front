<script lang="ts">    
  import type { PageData } from './$types'; 
  import Habits from './Habits.svelte';
 
  export let data: PageData
  
  let categories=data.context.categories
  let recommendedHabits=data.context.recommendedHabits
  let userHabits=data.context.userHabits
  
  let mobileMenuOpen = false;   
  let editingStepId: number | null = null;
  let editingTaskId: number | null = null;
  let editingStepTitle = "";
  let editingStepEstimatedTime = 0;
  let editingTaskTitle = "";  
  
      
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
      
  let userDropdownOpen = false;
  
  function toggleUserDropdown() {
    userDropdownOpen = !userDropdownOpen;
  }
  
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-dropdown') && userDropdownOpen) {
      userDropdownOpen = false;
    }
    
    if (editingStepId !== null && !target.closest('.step-menu')) {
      editingStepId = null;
    }

    if (editingTaskId !== null && !target.closest('.task-menu')) {
      editingTaskId = null;
    }
  }
 
</script>

<svelte:window on:click={handleClickOutside} />

<Habits
  {categories}
  {recommendedHabits}
  {userHabits}
>
</Habits>
