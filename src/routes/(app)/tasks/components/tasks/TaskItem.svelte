<script lang="ts">
    import type { Priority, RepeatOption, Task, TaskCategory } from "$lib/type/tasks/tasks";
    import { Calendar, CheckSquare, Edit, Focus, MoreHorizontal, Play, Repeat, Square, Star, Trash } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";

    export let task:Task;
    export let priorities:Priority[];
    export let categories:TaskCategory[];
    export let repeatOptions:RepeatOption[];

    let taskMenuOpen:any = null;
    const dispatch = createEventDispatcher();
    
    const openTaskDetailModal=()=>{
        dispatch('openTaskDetailModal',{task})
    }

    const changeTaskStatus=(taskId:number, newStatus:string, event:any)=> {
      if (event) event.stopPropagation();
      dispatch("changeTaskStatus",{taskId,newStatus})
    }

    const getPriorityIcon=(priorityId:string)=> {
      const priority = priorities.find(p => p.id === priorityId);
      return priority ? priority.icon : null;
    }

    const getCategoryColor=(categoryId:number)=> {
      const category = categories.find(c => c.id === categoryId);
      return category ? category.color : 'bg-gray-100 text-gray-700';
    }

    const getPriorityColor=(priorityId:string)=> {
      const priority = priorities.find(p => p.id === priorityId);
      return priority ? priority.color : 'bg-gray-100 text-gray-700';
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

    const toggleTaskMenu=(taskId:any, event:any)=> {
      event.stopPropagation();
      taskMenuOpen = taskMenuOpen === taskId ? null : taskId;
    }

    const toggleStarred=(taskId:number, event:any)=> {
        if (event) event.stopPropagation();      
        dispatch("toggleStarred",{taskId})
    }

    const startFocusMode=()=> {
        dispatch("startFocusMode",{task})
    }

    const openEditTaskModal=(task:Task, event:any)=> {
        if (event) event.stopPropagation();
        dispatch("openEditTaskModal",{task})      
    }

    const deleteTask=(taskId:number, event:any)=> {
      if (event) event.stopPropagation();
      
      if (confirm('정말로 이 작업을 삭제하시겠습니까?')) {
        dispatch("deleteTask",{taskId})      
        taskMenuOpen = null;        
      }      
    }

</script>

<button 
    class="border border-gray-100 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer {task.status === 'completed' ? 'opacity-75' : ''}"
    on:click={() => openTaskDetailModal()}
>
<div class="p-4">
<div class="flex justify-between items-start">
    <div class="flex items-start gap-3">
    <button 
        on:click={(e) => changeTaskStatus(task.id, task.status === 'completed' ? 'todo' : 'completed', e)}
        class="mt-1 flex-shrink-0 focus:outline-none"
    >
        {#if task.status === 'completed'}
        <CheckSquare size={18} class="text-green-500" />
        {:else}
        <Square size={18} class="text-gray-400" />
        {/if}
    </button>
    
    <div class="flex-1">
        <!-- 제목 및 우선순위 -->
        <div class="flex items-center gap-2">
        {#if task.isStarred}
            <Star size={16} class="text-yellow-500 flex-shrink-0" />
        {/if}
        
        <h3 class="font-medium text-gray-900 {task.status === 'completed' ? 'line-through text-gray-500' : ''}">{task.title}</h3>
        
        {#if task.priority !== 'medium'}
            <span class={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
            <svelte:component this={getPriorityIcon(task.priority)} size={12} />
            {priorities.find(p => p.id === task.priority)?.name}
            </span>
        {/if}
        </div>
       
        <div class="flex flex-wrap items-center gap-2 mt-2">
        <span class={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(task.category)}`}>
            {categories.find(c => c.id === task.category)?.name}
        </span>
        
        {#if task.status === 'in-progress'}
            <span class="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
            진행 중
            </span>
        {/if}
        
        {#each task.tags as tag}
            <span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
            #{tag}
            </span>
        {/each}
        
        {#if task.repeat !== 'none'}
            <span class="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 flex items-center gap-1">
            <Repeat size={12} />
            {repeatOptions.find(r => r.id === task.repeat)?.name}
            </span>
        {/if}
        </div>
       
        {#if task.description}
        <p class="text-sm text-gray-600 mt-2 line-clamp-2">{task.description}</p>
        {/if}
    </div>
    </div>
    
    <div class="flex items-start gap-2">
    {#if task.dueDate}
        <div class="flex items-center gap-1 text-sm {getDueDateColor(getDueDateStatus(task.dueDate, task.status))}">
        <Calendar size={14} />
        <span>{formatDate(task.dueDate)}</span>
        </div>
    {/if}
    
    <div class="relative task-menu">
        <button 
        on:click={(e) => toggleTaskMenu(task.id, e)}
        class="p-1 rounded-full hover:bg-gray-100"
        >
        <MoreHorizontal size={16} class="text-gray-500" />
        </button>
        
        {#if taskMenuOpen === task.id}
        <div class="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div class="py-1">
            <button 
                on:click={(e) => toggleStarred(task.id, e)}
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
                <Star size={16} class={task.isStarred ? 'text-yellow-500' : 'text-gray-400'} />
                {task.isStarred ? '즐겨찾기 해제' : '즐겨찾기 추가'}
            </button>
            
            {#if task.status !== 'in-progress'}
                <button 
                on:click={(e) => changeTaskStatus(task.id, 'in-progress', e)}
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                <Play size={16} class="text-blue-500" />
                진행 중으로 변경
                </button>
            {/if}
            
            <button 
                on:click={(e) => startFocusMode()}
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
                <Focus size={16} class="text-purple-500" />
                집중 모드 시작
            </button>
            
            <button 
                on:click={(e) => openEditTaskModal(task, e)}
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
                <Edit size={16} class="text-gray-500" />
                편집
            </button>
            
            <button 
                on:click={(e) => deleteTask(task.id, e)}
                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
            >
                <Trash size={16} class="text-red-500" />
                삭제
            </button>
            </div>
        </div>
        {/if}
    </div>
    </div>
</div>
</div>
</button>