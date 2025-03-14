<script lang="ts">
    import { ArrowUp, ArrowDown, CheckCircle, Clock, Circle, Menu, X, User, LogOut, Edit, Undo, Check, AlertTriangle, MoreVertical, Plus, Play, Pause } from 'lucide-svelte';    
    import { onMount } from 'svelte';      
    import TaskAccordion from './components/task/TaskAccordion.svelte';
      import type { PageData } from './$types';
    import Schedule from './Schedule.svelte';
   
    export let data: PageData
    let goals=data.context.goals
    
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
  
  <Schedule
    {goals}
  >
  </Schedule>
