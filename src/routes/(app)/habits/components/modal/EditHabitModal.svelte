<script lang="ts">
    import type { Category, Habit } from "$lib/type/habits/habits";
    import { X } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";

    export let showEditHabitModal:boolean;
    export let editingHabit:Habit;
    export let icons:string[];
    export let categories:Category[];

    const dispatch = createEventDispatcher();

    const updateHabit=()=>{
      dispatch('updateHabit',{editingHabit})
    }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium text-gray-900">습관 편집</h2>
          <button 
            on:click={() => showEditHabitModal = false}
            class="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        
        <form on:submit|preventDefault={updateHabit} class="space-y-4">
          <div>
            <label for="edit-habit-name" class="block text-sm font-medium text-gray-700">습관 이름</label>
            <input 
              id="edit-habit-name" 
              type="text" 
              bind:value={editingHabit.name}
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label for="edit-habit-category" class="block text-sm font-medium text-gray-700">카테고리</label>
            <select 
              id="edit-habit-category" 
              bind:value={editingHabit.category}
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {#each categories as category}
                <option value={category.id}>{category.name}</option>
              {/each}
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">아이콘</label>
            <div class="mt-1 grid grid-cols-8 gap-2">
              {#each icons as icon}
                <button 
                  type="button"
                  on:click={() => editingHabit.icon = icon}
                  class="w-full aspect-square flex items-center justify-center text-xl border rounded-md {editingHabit.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}"
                >
                  {icon}
                </button>
              {/each}
            </div>
          </div>
          
          <div>
            <label for="edit-habit-frequency" class="block text-sm font-medium text-gray-700">빈도</label>
            <select 
              id="edit-habit-frequency" 
              bind:value={editingHabit.frequency}
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="daily">매일</option>
              <option value="weekly">매주</option>
            </select>
          </div>
          
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input 
                id="edit-habit-reminder" 
                type="checkbox" 
                bind:checked={editingHabit.reminder}
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="edit-habit-reminder" class="font-medium text-gray-700">리마인더 설정</label>
              <p class="text-gray-500">습관을 상기시키는 알림을 받습니다</p>
            </div>
          </div>
          
          {#if editingHabit.reminder}
            <div>
              <label for="edit-reminder-time" class="block text-sm font-medium text-gray-700">알림 시간</label>
              <input 
                id="edit-reminder-time" 
                type="time" 
                bind:value={editingHabit.reminderTime}
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          {/if}
          
          <div class="flex justify-end gap-3 pt-4">
            <button 
              type="button"
              on:click={() => showEditHabitModal = false}
              class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              취소
            </button>
            <button 
              type="submit"
              class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>