<script lang="ts">
    import type { Priority, RepeatOption, Task, TaskCategory, TaskStatus } from "$lib/type/tasks/tasks";
    import { Bell, BellOff, Calendar, CheckSquare, Clock, Edit, Focus, Repeat, Square, Star, Trash, X } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";

    export let showTaskDetailModal:boolean;
    export let categories:TaskCategory[];
    export let statuses:TaskStatus[];
    export let priorities:Priority[];
    export let repeatOptions:RepeatOption[];
    export let selectedTask:any = null;
    
    let taskMenuOpen:any = null;
    const dispatch = createEventDispatcher();

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

    const getStatusColor=(statusId:string)=> {
      const status = statuses.find(s => s.id === statusId);
      return status ? status.color : 'bg-gray-100 text-gray-700';
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

    const startFocusMode=()=> {
        dispatch("startFocusMode",{selectedTask})
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

</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start mb-6">
          <div class="flex items-start gap-3">
            <button 
              on:click={(e) => changeTaskStatus(selectedTask.id, selectedTask.status === 'completed' ? 'todo' : 'completed',e)}
              class="mt-1 flex-shrink-0 focus:outline-none"
            >
              {#if selectedTask.status === 'completed'}
                <CheckSquare size={20} class="text-green-500" />
              {:else}
                <Square size={20} class="text-gray-400" />
              {/if}
            </button>
            
            <div>
              <div class="flex items-center gap-2">
                {#if selectedTask.isStarred}
                  <Star size={18} class="text-yellow-500" />
                {/if}
                <h2 class="text-xl font-medium text-gray-900 {selectedTask.status === 'completed' ? 'line-through text-gray-500' : ''}">{selectedTask.title}</h2>
              </div>
              
              <div class="flex flex-wrap items-center gap-2 mt-2">
                <span class={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(selectedTask.category)}`}>
                  {categories.find(c => c.id === selectedTask.category)?.name}
                </span>
                
                <span class={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(selectedTask.priority)}`}>
                  <svelte:component this={getPriorityIcon(selectedTask.priority)} size={12} class="inline mr-1" />
                  {priorities.find(p => p.id === selectedTask.priority)?.name}
                </span>
                
                <span class={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(selectedTask.status)}`}>
                  {statuses.find(s => s.id === selectedTask.status)?.name}
                </span>
                
                {#if selectedTask.repeat !== 'none'}
                  <span class="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 flex items-center gap-1">
                    <Repeat size={12} />
                    {repeatOptions.find(r => r.id === selectedTask.repeat)?.name}
                  </span>
                {/if}
              </div>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <button 
              on:click={(e) => openEditTaskModal(selectedTask,e)}
              class="p-1.5 rounded-md hover:bg-gray-100 text-gray-700"
              title="편집"
            >
              <Edit size={18} />
            </button>
            <button 
              on:click={(e) => deleteTask(selectedTask.id,e)}
              class="p-1.5 rounded-md hover:bg-gray-100 text-red-600"
              title="삭제"
            >
              <Trash size={18} />
            </button>
            <button 
              on:click={() => showTaskDetailModal = false}
              class="p-1.5 rounded-md hover:bg-gray-100 text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        <div class="space-y-6">
          {#if selectedTask.description}
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">설명</h3>
              <p class="text-gray-600">{selectedTask.description}</p>
            </div>
          {/if}
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">마감일</h3>
              <div class="flex items-center gap-2">
                <Calendar size={16} class={getDueDateColor(getDueDateStatus(selectedTask.dueDate, selectedTask.status))} />
                <span class={getDueDateColor(getDueDateStatus(selectedTask.dueDate, selectedTask.status))}>
                  {selectedTask.dueDate ? formatDate(selectedTask.dueDate) : '설정되지 않음'}
                </span>
              </div>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">리마인더</h3>
              <div class="flex items-center gap-2">
                {#if selectedTask.reminder}
                  <Bell size={16} class="text-blue-600" />
                  <span>{selectedTask.reminderTime}</span>
                {:else}
                  <BellOff size={16} class="text-gray-400" />
                  <span class="text-gray-500">설정되지 않음</span>
                {/if}
              </div>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">예상 소요 시간</h3>
              <div class="flex items-center gap-2">
                <Clock size={16} class="text-gray-600" />
                <span>{selectedTask.estimatedMinutes}분</span>
              </div>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">실제 소요 시간</h3>
              <div class="flex items-center gap-2">
                <Clock size={16} class="text-gray-600" />
                <span>{selectedTask.actualMinutes > 0 ? `${selectedTask.actualMinutes}분` : '기록 없음'}</span>
              </div>
            </div>
          </div>
          
          {#if selectedTask.tags.length > 0}
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">태그</h3>
              <div class="flex flex-wrap gap-2">
                {#each selectedTask.tags as tag}
                  <span class="px-2 py-1 bg-gray-100 rounded-md text-sm">#{tag}</span>
                {/each}
              </div>
            </div>
          {/if}
          
          {#if selectedTask.notes}
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">메모</h3>
              <p class="text-gray-600 bg-gray-50 p-3 rounded-md">{selectedTask.notes}</p>
            </div>
          {/if}
          
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">작업 정보</h3>
            <div class="space-y-2 text-sm text-gray-600">
              <p>생성일: {formatDate(selectedTask.createdAt)}</p>
              {#if selectedTask.completedAt}
                <p>완료일: {formatDate(selectedTask.completedAt)}</p>
              {/if}
            </div>
          </div>
          
          <div class="flex justify-between pt-4 border-t border-gray-200">
            <button 
              on:click={() => startFocusMode()}
              class="py-2 px-4 bg-purple-100 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-200 flex items-center gap-2"
            >
              <Focus size={16} />
              집중 모드 시작
            </button>
            
            <button 
              on:click={() => showTaskDetailModal = false}
              class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>