<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types'; 
    import { ArrowUp, ArrowDown, CheckCircle, Circle, Menu, X, User, LogOut, Plus, Edit, Trash, Clock, Calendar, Tag, AlertCircle, Filter, Search, ChevronDown, ChevronUp, MoreHorizontal, Bell, BellOff, Repeat, CheckSquare, Square, Star, Flag, Play, Pause, Layers, Bookmark, Clipboard, Focus, Eye, EyeOff, Save, XCircle } from 'lucide-svelte';
    import type { Task, TaskStatus } from '$lib/type/tasks/tasks';
    import Tasks from './Tasks.svelte';
    
    export let data: PageData

    let categories=data.context.categories
    let statuses=data.context.statuses
    let repeatOptions=data.context.repeatOptions
    let tasks=data.context.tasks
    
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

<Tasks
  {categories}
  {statuses}
  {repeatOptions}
  {tasks}
>
</Tasks>  