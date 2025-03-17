<script lang="ts">
    import type { Priority, RepeatOption, Task, TaskCategory, TaskStatus } from "$lib/type/tasks/tasks";
    import { Plus, X } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";

    export let showTaskModal:boolean;
    export let editingTask:any;
    export let newTask:Task;
    export let categories:TaskCategory[];
    export let priorities:Priority[];
    export let statuses:TaskStatus[];
    export let repeatOptions:RepeatOption[];
    export let tagInput:any = '';
    
    const dispatch = createEventDispatcher();
    const addTag=()=>{
        dispatch('addTag',{tagInput})
    }
    const addTask=()=>{
        if (!newTask.title.trim()) return;
        dispatch('addTask',{newTask})
    }
    const removeTag=(targetTag:string)=> {
      newTask.tags = newTask.tags.filter(tag => tag !== targetTag);
    }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
    <div class="p-6">
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-medium text-gray-900">{editingTask ? '작업 편집' : '새 작업 추가'}</h2>
        <button 
        on:click={() => showTaskModal = false}
        class="text-gray-400 hover:text-gray-500"
        >
        <X size={20} />
        </button>
    </div>
    
    <form on:submit|preventDefault={addTask} class="space-y-4">
        <div>
        <label for="task-title" class="block text-sm font-medium text-gray-700">작업 제목</label>
        <input 
            id="task-title" 
            type="text" 
            bind:value={newTask.title}
            required
            placeholder="예: 프로젝트 계획서 작성"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        </div>
        
        <div>
        <label for="task-description" class="block text-sm font-medium text-gray-700">설명</label>
        <textarea 
            id="task-description" 
            bind:value={newTask.description}
            placeholder="작업에 대한 상세 설명을 입력하세요"
            rows="3"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        ></textarea>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label for="task-category" class="block text-sm font-medium text-gray-700">카테고리</label>
            <select 
            id="task-category" 
            bind:value={newTask.category}
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
            {#each categories as category}
                <option value={category.id}>{category.name}</option>
            {/each}
            </select>
        </div>
        
        <div>
            <label for="task-priority" class="block text-sm font-medium text-gray-700">우선순위</label>
            <select 
            id="task-priority" 
            bind:value={newTask.priority}
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
            {#each priorities as priority}
                <option value={priority.id}>{priority.name}</option>
            {/each}
            </select>
        </div>
        
        <div>
            <label for="task-status" class="block text-sm font-medium text-gray-700">상태</label>
            <select 
            id="task-status" 
            bind:value={newTask.status}
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
            {#each statuses as status}
                <option value={status.id}>{status.name}</option>
            {/each}
            </select>
        </div>
        
        <div>
            <label for="task-due-date" class="block text-sm font-medium text-gray-700">마감일</label>
            <input 
            id="task-due-date" 
            type="date" 
            bind:value={newTask.dueDate}
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
        
        <div>
            <label for="task-estimated-time" class="block text-sm font-medium text-gray-700">예상 소요 시간 (분)</label>
            <input 
            id="task-estimated-time" 
            type="number" 
            bind:value={newTask.estimatedMinutes}
            min="1"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
        
        <div>
            <label for="task-repeat" class="block text-sm font-medium text-gray-700">반복</label>
            <select 
            id="task-repeat" 
            bind:value={newTask.repeat}
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
            {#each repeatOptions as option}
                <option value={option.id}>{option.name}</option>
            {/each}
            </select>
        </div>
        </div>
        
        <div class="flex items-start">
        <div class="flex items-center h-5">
            <input 
            id="task-reminder" 
            type="checkbox" 
            bind:checked={newTask.reminder}
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
        </div>
        <div class="ml-3 text-sm">
            <label for="task-reminder" class="font-medium text-gray-700">리마인더 설정</label>
            <p class="text-gray-500">작업 마감일에 알림을 받습니다</p>
        </div>
        </div>
        
        {#if newTask.reminder}
        <div>
            <label for="reminder-time" class="block text-sm font-medium text-gray-700">알림 시간</label>
            <input 
            id="reminder-time" 
            type="time" 
            bind:value={newTask.reminderTime}
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
        {/if}
        
        <div>
        <label for="task-tags" class="block text-sm font-medium text-gray-700">태그</label>
        <div class="mt-1 flex flex-wrap gap-2">
            {#each newTask.tags as tag}
            <div class="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md">
                <span class="text-sm">#{tag}</span>
                <button 
                type="button"
                on:click={() => removeTag(tag)}
                class="text-gray-500 hover:text-gray-700"
                >
                <X size={14} />
                </button>
            </div>
            {/each}
            
            <div class="flex items-center gap-2">
            <input 
                type="text" 
                bind:value={tagInput}
                placeholder="태그 추가..."
                class="border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
            <button 
                type="button"
                on:click={addTag}
                class="p-1 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
            >
                <Plus size={14} />
            </button>
            </div>
        </div>
        </div>
        
        <div>
        <label for="task-notes" class="block text-sm font-medium text-gray-700">메모</label>
        <textarea 
            id="task-notes" 
            bind:value={newTask.notes}
            placeholder="추가 메모를 입력하세요"
            rows="2"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        ></textarea>
        </div>
        
        <div class="flex justify-end gap-3 pt-4">
        <button 
            type="button"
            on:click={() => showTaskModal = false}
            class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            취소
        </button>
        <button 
            type="submit"
            class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            {editingTask ? '저장' : '추가'}
        </button>
        </div>
    </form>
    </div>
</div>
</div>