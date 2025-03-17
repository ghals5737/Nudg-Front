<script lang="ts">
    import type { Category, Habit } from "$lib/type/habits/habits";
    import { Bell, BellOff, CheckCircle, Circle, Clock, Edit, Trash } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";

    export let habit:Habit;
    export let categories:Category[];

    const dispatch = createEventDispatcher();

    const getCategoryColor=(categoryId:number)=> {
      const category = categories.find(c => c.id === categoryId);
      return category ? category.color : 'bg-gray-100 text-gray-700';
    }

    const getCategoryName=(categoryId:number)=> {
      const category = categories.find(c => c.id  === categoryId);
      return category ? category.name : '';
    } 

    const toggleReminder=(habitId:number)=> {
        dispatch("toggleReminder",{habitId})
    }

    const editHabit=()=>{
        dispatch("editHabit",{habit})
    }

    const deleteHabit=(habitId:number)=>{
        dispatch("deleteHabit",{habitId})
    }

    const toggleHabitCompletion=()=>{
        dispatch("toggleHabitCompletion",{habit})
    }

</script>

<div class="border border-gray-100 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
    <div class="p-4">
      <div class="flex justify-between items-start mb-3">
        <div class="flex items-center gap-2">
          <span class="text-2xl">{habit.icon}</span>
          <div>
            <h3 class="font-medium text-gray-900">{habit.name}</h3>
            <span class={`text-xs px-2 py-1 rounded-full ${getCategoryColor(habit.category)}`}>
              {getCategoryName(habit.category)}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button 
            on:click={() => toggleReminder(habit.id)}
            class="p-1.5 rounded-full hover:bg-gray-100"
            title={habit.reminder ? "알림 끄기" : "알림 켜기"}
          >
            {#if habit.reminder}
              <Bell size={16} class="text-blue-700" />
            {:else}
              <BellOff size={16} class="text-gray-400" />
            {/if}
          </button>
          <button 
            on:click={() => editHabit()}
            class="p-1.5 rounded-full hover:bg-gray-100"
            title="습관 편집"
          >
            <Edit size={16} class="text-gray-500" />
          </button>
          <button 
            on:click={() => deleteHabit(habit.id)}
            class="p-1.5 rounded-full hover:bg-gray-100"
            title="습관 삭제"
          >
            <Trash size={16} class="text-gray-500" />
          </button>
        </div>
      </div>
      
      <div class="flex justify-between items-center mt-4">
        <div class="flex items-center gap-2">
          <!-- <Fire size={16} class="text-orange-500" /> -->
          <span class="text-sm font-medium">
            {habit.streak > 0 ? `${habit.streak}일 연속` : '시작해보세요!'}
          </span>
        </div>
        
        {#if habit.reminder}
          <div class="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={14} />
            <span>{habit.reminderTime}</span>
          </div>
        {/if}
      </div>
      
      <div class="mt-4">
        <button 
          on:click={() => toggleHabitCompletion()}
          class="w-full flex items-center justify-center gap-2 py-2 px-4 border rounded-md shadow-sm text-sm font-medium transition-colors
            {habit.completed 
              ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}"
        >
          {#if habit.completed}
            <CheckCircle size={18} />
            완료됨
          {:else}
            <Circle size={18} />
            완료하기
          {/if}
        </button>
      </div>
    </div>
  </div>

  <style lang="postcss">
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
    
    .text-green-700 {
      color: #047857;
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
    
    .bg-yellow-100 {
      background-color: #FEF3C7;
    }
    
    .text-yellow-700 {
      color: #B45309;
    }
    
    .bg-pink-100 {
      background-color: #FCE7F3;
    }
    
    .text-pink-700 {
      color: #BE185D;
    }
    
    .text-orange-500 {
      color: #F97316;
    }
  </style>