<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types'; 
    import { ArrowUp, ArrowDown, CheckCircle, Circle, Menu, X, User, LogOut, Plus, Edit, Trash, Clock, Calendar, Tag, AlertCircle, Filter, Search, ChevronDown, ChevronUp, MoreHorizontal, Bell, BellOff, Repeat, CheckSquare, Square, Star, Flag, Play, Pause, Layers, Bookmark, Clipboard, Focus, Eye, EyeOff, Save, XCircle } from 'lucide-svelte';
    import type { RepeatOption, Task, TaskCategory, TaskStatus } from '$lib/type/tasks/tasks';
    import TaskItem from './components/tasks/TaskItem.svelte';
    import TaskModal from './components/modal/TaskModal.svelte';
    import TaskDetailModal from './components/modal/TaskDetailModal.svelte';

    export let categories:TaskCategory[];
    export let statuses:TaskStatus[];
    export let repeatOptions:RepeatOption[];
    export let tasks:Task[];

    const priorities = [
        { id: 'high', name: '높음', color: 'bg-red-100 text-red-700', icon: AlertCircle },
        { id: 'medium', name: '중간', color: 'bg-yellow-100 text-yellow-700', icon: Flag },
        { id: 'low', name: '낮음', color: 'bg-blue-100 text-blue-700', icon: Bookmark }
    ];

    
    let filterCategory = -1;
    let filterPriority = 'all';
    let filterStatus = 'all';
    let searchQuery = '';
    let showCompletedTasks = true;
    let sortBy = 'dueDate';
    let sortDirection = 'asc';

    let showTaskModal = false;
    let editingTask:any = null;
    let newTask:Task = {
      id: -1,
      title: '',
      description: '',
      category: 0,
      priority: 'medium',
      status: 'todo',
      dueDate: '',
      reminder: false,
      reminderTime: '09:00',
      repeat: 'none',
      tags: [],
      createdAt: '',
      completedAt: null,
      isStarred: false,
      estimatedMinutes: 30,
      actualMinutes: 0,
      notes: ''
    };
    
    let tagInput:any = '';
    
    let showTaskDetailModal = false;
    let selectedTask:any = null;    
    
    let focusModeActive = false;
    let focusTask:any = null;
    let focusTimer:any = null;
    let focusTimeElapsed = 0;
    let focusTimerPaused = false;    

    

    function openAddTaskModal() {
      const today = new Date().toISOString().split('T')[0];
      
      newTask = {
        id: -1,
        title: '',
        description: '',
        category: 0,
        priority: 'medium',
        status: 'todo',
        dueDate: today,
        reminder: false,
        reminderTime: '09:00',
        repeat: 'none',
        tags: [],
        createdAt: today,
        completedAt: null,
        isStarred: false,
        estimatedMinutes: 30,
        actualMinutes: 0,
        notes: ''
      };
      
      editingTask = null;
      showTaskModal = true;
    }
    
    const openEditTaskModal=(event:CustomEvent)=> {
      const task=event.detail.task      
      editingTask = task;
      newTask = { ...task, tags: [...task.tags] };
      showTaskModal = true;
    }
    
    const openTaskDetailModal=(event:CustomEvent)=> {
      selectedTask = event.detail.task;
      showTaskDetailModal = true;
    }
    
    const addTask=(event:CustomEvent)=> {
      newTask=event.detail.newTask
      if (!newTask.title.trim()) return;
      
      if (editingTask) {
        const taskIndex = tasks.findIndex(task => task.id === editingTask.id);
        if (taskIndex !== -1) {
          tasks[taskIndex] = { ...newTask };
          tasks = [...tasks];
        }
      } else {
        const newId = Math.max(0, ...tasks.map(task => task.id)) + 1;
        tasks = [
          ...tasks,
          {
            ...newTask,
            id: newId,
            createdAt: new Date().toISOString().split('T')[0]
          }
        ];
      }
      
      showTaskModal = false;
    }
    
    const deleteTask=(event:CustomEvent)=> {
      if (event) event.stopPropagation();

      tasks = tasks.filter(task => task.id !== event.detail.taskId);
    }
    
    const changeTaskStatus=(event:CustomEvent)=> {
      const taskIndex = tasks.findIndex(task => task.id === event.detail.taskId);
      if (taskIndex !== -1) {
        const task = tasks[taskIndex];
                
        if (event.detail.newStatus === 'completed' && task.status !== 'completed') {
          task.completedAt = new Date().toISOString().split('T')[0];
        } else if (event.detail.newStatus !== 'completed') {
          task.completedAt = null;
        }
        
        task.status = event.detail.newStatus;
        tasks = [...tasks];
      }
    }
    const toggleStarred=(event:CustomEvent)=> {
      const taskIndex = tasks.findIndex(task => task.id === event.detail.taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex].isStarred = !tasks[taskIndex].isStarred;
        tasks = [...tasks];
      }
    }
    
    const addTag=(event:CustomEvent)=> {
      tagInput=event.detail.tagInput
      if (!tagInput.trim()) return;
      
      if (!newTask.tags.includes(tagInput.trim())) {
        newTask.tags = [...newTask.tags, tagInput.trim()];
      }
      
      tagInput = '';
    }
    
    // 정렬 변경
    function changeSorting(field:string) {
      if (sortBy === field) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        sortBy = field;
        sortDirection = 'asc';
      }
    }
    
    const startFocusMode=(event:CustomEvent)=> {
      focusTask = event.detail.task;
      focusModeActive = true;
      focusTimeElapsed = 0;
      focusTimerPaused = false;
      
      if (focusTimer) clearInterval(focusTimer);
      
      focusTimer = setInterval(() => {
        if (!focusTimerPaused) {
          focusTimeElapsed++;
        }
      }, 1000);
    }
    
    // 집중 모드 종료
    function endFocusMode() {
      if (focusTimer) clearInterval(focusTimer);
      
      if (focusTask) {
        const taskIndex = tasks.findIndex((t:any) => t.id === focusTask.id);
        if (taskIndex !== -1) {
          tasks[taskIndex].actualMinutes = (tasks[taskIndex].actualMinutes || 0) + Math.floor(focusTimeElapsed / 60);
          tasks = [...tasks];
        }
      }
      
      focusModeActive = false;
      focusTask = null;
      focusTimeElapsed = 0;
      focusTimerPaused = false;
    }

    function toggleFocusTimer() {
      focusTimerPaused = !focusTimerPaused;
    }
        
    function formatTime(seconds:number) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    
    const formatDate=(dateString:string)=> {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const isToday = date.toDateString() === today.toDateString();
      const isTomorrow = date.toDateString() === tomorrow.toDateString();
      
      if (isToday) return '오늘';
      if (isTomorrow) return '내일';
      
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      return `${year}. ${month}. ${day}`;
    }
    
    const getDueDateStatus=(dueDate:string, status:string)=> {
      if (status === 'completed') return 'completed';
      if (!dueDate) return 'none';
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const dueDateTime = new Date(dueDate);
      dueDateTime.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((dueDateTime.getMilliseconds() - today.getMilliseconds()) / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) return 'overdue';
      if (diffDays === 0) return 'today';
      if (diffDays <= 2) return 'soon';
      return 'future';
    }
    
    const getDueDateColor=(status:string)=> {
      switch(status) {
        case 'overdue': return 'text-red-600';
        case 'today': return 'text-orange-600';
        case 'soon': return 'text-yellow-600';
        case 'completed': return 'text-green-600';
        default: return 'text-gray-600';
      }
    }
    
    const getCategoryColor=(categoryId:number)=> {
      const category = categories.find(c => c.id === categoryId);
      return category ? category.color : 'bg-gray-100 text-gray-700';
    }
    
    const getPriorityColor=(priorityId:string)=> {
      const priority = priorities.find(p => p.id === priorityId);
      return priority ? priority.color : 'bg-gray-100 text-gray-700';
    }
    
    const getPriorityIcon=(priorityId:string)=> {
      const priority = priorities.find(p => p.id === priorityId);
      return priority ? priority.icon : null;
    }
    
    $: filteredTasks = tasks.filter((task:Task) => {
      const matchesCategory = filterCategory === -1 || task.category === filterCategory;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesCompleted = showCompletedTasks || task.status !== 'completed';
      const matchesSearch = !searchQuery || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some((tag:any) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesPriority && matchesStatus && matchesCompleted && matchesSearch;
    });
    
    
    $: sortedTasks = [...filteredTasks].sort((a, b) => {
      if (a.isStarred && !b.isStarred) return -1;
      if (!a.isStarred && b.isStarred) return 1;
      
      let comparison = 0;
      
      switch(sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) comparison = 0;
          else if (!a.dueDate) comparison = 1;
          else if (!b.dueDate) comparison = -1;
          else comparison = new Date(a.dueDate).getMilliseconds() - new Date(b.dueDate).getMilliseconds();
          break;
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          comparison = priorityOrder.high - priorityOrder.low;
          break;
        case 'status':
          const statusOrder = { 'in-progress': 0, 'todo': 1, 'completed': 2 };
          comparison = statusOrder['in-progress'] - statusOrder.completed;
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getMilliseconds() - new Date(b.createdAt).getMilliseconds();
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    $: taskStats = {
      total: tasks.length,
      completed: tasks.filter(task => task.status === 'completed').length,
      inProgress: tasks.filter(task => task.status === 'in-progress').length,
      todo: tasks.filter(task => task.status === 'todo').length,
      overdue: tasks.filter(task => {
        if (task.status === 'completed') return false;
        if (!task.dueDate) return false;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const dueDateTime = new Date(task.dueDate);
        dueDateTime.setHours(0, 0, 0, 0);
        
        return dueDateTime < today;
      }).length,
      highPriority: tasks.filter(task => task.priority === 'high' && task.status !== 'completed').length
    };

    onMount(() => {

    });
  </script>
  
  
<div class="w-full max-w-[1200px] px-4">
<div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex items-center justify-between text-[#414141] text-lg mb-6">
    <div class="flex items-center">
        <span class="h-5 border-l-2 border-[#0056A5] mr-2"></span>
        <h1 class="font-semibold">작업 관리</h1>
    </div>
    <button 
        on:click={openAddTaskModal}
        class="text-blue-700 text-sm font-medium flex items-center gap-1 hover:underline"
    >
        <Plus size={16} />
        새 작업 추가
    </button>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
    <div class="bg-blue-50 rounded-lg p-3 flex flex-col">
        <span class="text-sm text-gray-500">전체 작업</span>
        <span class="text-xl font-bold text-blue-700">{taskStats.total}</span>
    </div>
    <div class="bg-green-50 rounded-lg p-3 flex flex-col">
        <span class="text-sm text-gray-500">완료</span>
        <span class="text-xl font-bold text-green-700">{taskStats.completed}</span>
    </div>
    <div class="bg-blue-50 rounded-lg p-3 flex flex-col">
        <span class="text-sm text-gray-500">진행 중</span>
        <span class="text-xl font-bold text-blue-700">{taskStats.inProgress}</span>
    </div>
    <div class="bg-yellow-50 rounded-lg p-3 flex flex-col">
        <span class="text-sm text-gray-500">예정</span>
        <span class="text-xl font-bold text-yellow-700">{taskStats.todo}</span>
    </div>
    <div class="bg-red-50 rounded-lg p-3 flex flex-col">
        <span class="text-sm text-gray-500">기한 초과</span>
        <span class="text-xl font-bold text-red-700">{taskStats.overdue}</span>
    </div>
    </div>
    
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
    <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} class="text-gray-400" />
        </div>
        <input 
        type="text" 
        bind:value={searchQuery}
        placeholder="작업 검색..." 
        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
    </div>
    
    <div class="flex items-center gap-2">
        <div class="relative">
        <select 
            bind:value={filterCategory}
            class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
        >
            <option value="all">모든 카테고리</option>
            {#each categories as category}
            <option value={category.id}>{category.name}</option>
            {/each}
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown size={16} class="text-gray-400" />
        </div>
        </div>
        
        <div class="relative">
        <select 
            bind:value={filterPriority}
            class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
        >
            <option value="all">모든 우선순위</option>
            {#each priorities as priority}
            <option value={priority.id}>{priority.name}</option>
            {/each}
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown size={16} class="text-gray-400" />
        </div>
        </div>
        
        <div class="relative">
        <select 
            bind:value={filterStatus}
            class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
        >
            <option value="all">모든 상태</option>
            {#each statuses as status}
            <option value={status.id}>{status.name}</option>
            {/each}
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown size={16} class="text-gray-400" />
        </div>
        </div>
    </div>
    </div>
    
    <div class="flex justify-between items-center mb-4">
    <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">정렬:</span>
        <button 
        on:click={() => changeSorting('dueDate')}
        class={`text-sm px-2 py-1 rounded ${sortBy === 'dueDate' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
        >
        마감일
        {#if sortBy === 'dueDate'}
            <svelte:component this={sortDirection === 'asc' ? ChevronUp : ChevronDown} size={14} class="inline" />
        {/if}
        </button>
        <button 
        on:click={() => changeSorting('priority')}
        class={`text-sm px-2 py-1 rounded ${sortBy === 'priority' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
        >
        우선순위
        {#if sortBy === 'priority'}
            <svelte:component this={sortDirection === 'asc' ? ChevronUp : ChevronDown} size={14} class="inline" />
        {/if}
        </button>
        <button 
        on:click={() => changeSorting('title')}
        class={`text-sm px-2 py-1 rounded ${sortBy === 'title' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
        >
        제목
        {#if sortBy === 'title'}
            <svelte:component this={sortDirection === 'asc' ? ChevronUp : ChevronDown} size={14} class="inline" />
        {/if}
        </button>
    </div>
    
    <div class="flex items-center gap-2">
        <label class="flex items-center gap-1 text-sm text-gray-700">
        <input 
            type="checkbox" 
            bind:checked={showCompletedTasks}
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        완료된 작업 표시
        </label>
    </div>
    </div>
    
    {#if sortedTasks.length === 0}
    <div class="text-center py-10">
        <p class="text-gray-500">작업이 없습니다. 새 작업을 추가해보세요!</p>
    </div>
    {:else}
    <div class="space-y-3">
        {#each sortedTasks as task}
          <TaskItem
            {task}
            {priorities}
            {categories}
            {repeatOptions}
            on:changeTaskStatus={changeTaskStatus}
            on:deleteTask={deleteTask}
            on:openEditTaskModal={openEditTaskModal}
            on:openTaskDetailModal={openTaskDetailModal}
            on:startFocusMode={startFocusMode}
            on:toggleStarred={toggleStarred}            
          >            
          </TaskItem>        
        {/each}
    </div>
    {/if}
</div>
</div>


  {#if showTaskModal}
    <TaskModal
      bind:showTaskModal={showTaskModal}
      {editingTask}
      {newTask}
      {categories}
      {priorities}
      {statuses}
      {repeatOptions}
      {tagInput}
      on:addTag={addTag}
      on:addTask={addTask}
    >      
    </TaskModal>
  {/if}
  
  {#if showTaskDetailModal && selectedTask}
    <TaskDetailModal
      bind:showTaskDetailModal={showTaskDetailModal}
      {categories}
      {statuses}    
      {priorities}
      {repeatOptions}
      {selectedTask}
      on:changeTaskStatus={changeTaskStatus}
      on:deleteTask={deleteTask}
      on:openEditTaskModal={openEditTaskModal}
      on:startFocusMode={startFocusMode}
    >      
    </TaskDetailModal>
  {/if}
  
  {#if focusModeActive && focusTask}
    <div class="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
      <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-6">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-2">집중 모드</h2>
          <p class="text-gray-600">현재 작업에 집중하세요</p>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 class="font-medium text-lg mb-2">{focusTask.title}</h3>
          {#if focusTask.description}
            <p class="text-gray-600 mb-4">{focusTask.description}</p>
          {/if}
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(focusTask.category)}`}>
                {categories.find(c => c.id === focusTask.category)?.name}
              </span>
              <span class={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(focusTask.priority)}`}>
                {priorities.find(p => p.id === focusTask.priority)?.name}
              </span>
            </div>
            {#if focusTask.dueDate}
              <div class="flex items-center gap-1 text-sm">
                <Calendar size={14} />
                <span>{formatDate(focusTask.dueDate)}</span>
              </div>
            {/if}
          </div>
        </div>
        
        <div class="text-center mb-8">
          <div class="text-5xl font-bold mb-4">{formatTime(focusTimeElapsed)}</div>
          <div class="flex justify-center gap-4">
            <button 
              on:click={toggleFocusTimer}
              class="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              {#if focusTimerPaused}
                <Play size={20} />
                재개
              {:else}
                <Pause size={20} />
                일시정지
              {/if}
            </button>
            <button 
              on:click={endFocusMode}
              class="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
            >
              <XCircle size={20} />
              종료
            </button>
          </div>
        </div>
        
        <div class="text-center text-gray-500 text-sm">
          <p>집중 모드를 종료하면 작업 시간이 자동으로 기록됩니다</p>
        </div>
      </div>
    </div>
  {/if}
  
  <style lang="postcss">
    :global(body) {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    .text-blue-700 {
      color: #0056A5;
    }
    
    .bg-blue-700 {
      background-color: #0056A5;
    }
    
    .hover\:bg-blue-800:hover {
      background-color: #004080;
    }
    
    .bg-blue-50 {
      background-color: #EFF6FF;
    }
    
    .bg-blue-100 {
      background-color: #DBEAFE;
    }
    
    .text-green-500 {
      color: #10B981;
    }
    
    .text-green-700 {
      color: #047857;
    }
    
    .bg-green-50 {
      background-color: #ECFDF5;
    }
    
    .bg-green-100 {
      background-color: #D1FAE5;
    }
    
    .bg-purple-100 {
      background-color: #EDE9FE;
    }
    
    .text-purple-700 {
      color: #6D28D9;
    }
    
    .bg-yellow-50 {
      background-color: #FFFBEB;
    }
    
    .bg-yellow-100 {
      background-color: #FEF3C7;
    }
    
    .text-yellow-500 {
      color: #F59E0B;
    }
    
    .text-yellow-700 {
      color: #B45309;
    }
    
    .bg-red-50 {
      background-color: #FEF2F2;
    }
    
    .bg-red-100 {
      background-color: #FEE2E2;
    }
    
    .text-red-600 {
      color: #DC2626;
    }
    
    .text-red-700 {
      color: #B91C1C;
    }
    
    .bg-pink-100 {
      background-color: #FCE7F3;
    }
    
    .text-pink-700 {
      color: #BE185D;
    }
    
    .text-orange-600 {
      color: #EA580C;
    }
    
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  </style>
  
  