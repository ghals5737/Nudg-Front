<script lang="ts">
    import { ChevronLeft, ChevronRight } from "lucide-svelte";
    
    export let viewMode:any
    export let currentMonth:number
    export let currentYear:number
    export let calendarDates:any

    const today = new Date();
    let selectedDate = new Date(today).toISOString().split('T')[0];
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    const changeViewMode=(mode:any)=> {
      viewMode = mode;
    }

    const prevMonth=()=> {
      if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
      } else {
        currentMonth--;
      }
    }
    
    const nextMonth=()=> {
      if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
      } else {
        currentMonth++;
      }
    }

    const goToToday=()=> {
      currentMonth = today.getMonth();
      currentYear = today.getFullYear();
      selectedDate = new Date(today).toISOString().split('T')[0];
      viewMode = 'daily';
    }

    const selectDate=(date:any)=> {
      selectedDate = date;
      viewMode = 'daily';
    }

</script>


<!-- 캘린더 및 날짜 선택 -->
<div class="mb-6">
<div class="flex items-center justify-between mb-4">
    <div class="flex items-center gap-2">
    <button 
        on:click={prevMonth}
        class="p-1.5 rounded-full hover:bg-gray-100"
    >
        <ChevronLeft size={20} />
    </button>
    <h2 class="text-lg font-medium">{currentYear}년 {monthNames[currentMonth]}</h2>
    <button 
        on:click={nextMonth}
        class="p-1.5 rounded-full hover:bg-gray-100"
    >
        <ChevronRight size={20} />
    </button>
    </div>
    
    <button 
    on:click={goToToday}
    class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200"
    >
    오늘
    </button>
</div>

<!-- 캘린더 -->
<div class="grid grid-cols-7 gap-1">
    {#each weekdays as day}
    <div class="text-center py-2 text-sm font-medium text-gray-500">
        {day}
    </div>
    {/each}
    
    {#each calendarDates as date}
    <button 
        on:click={() => selectDate(date.date)}
        class={`
        aspect-square p-1 rounded-md relative
        ${date.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400'}
        ${date.isToday ? 'border-2 border-blue-500' : 'border border-gray-100'}
        ${date.date === selectedDate ? 'bg-blue-50' : ''}
        `}
    >
        <div class="flex flex-col h-full">
        <span class="text-sm">{date.day}</span>
        
        {#if date.hasEvents || date.hasHabits || date.hasTasks}
            <div class="flex justify-center gap-1 mt-auto">
            {#if date.hasEvents}
                <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            {/if}
            {#if date.hasHabits}
                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            {/if}
            {#if date.hasTasks}
                <span class="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
            {/if}
            </div>
        {/if}
        </div>
    </button>
    {/each}
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

  .text-green-500 {
      color: #10B981;
  }

  .text-green-700 {
      color: #047857;
  }

  .bg-green-100 {
      background-color: #D1FAE5;
  }

  .bg-green-500 {
      background-color: #10B981;
  }

  .bg-green-600 {
      background-color: #059669;
  }

  .bg-purple-100 {
      background-color: #EDE9FE;
  }

  .text-purple-700 {
      color: #6D28D9;
  }

  .bg-purple-500 {
      background-color: #8B5CF6;
  }

  .bg-yellow-50 {
      background-color: #FFFBEB;
  }

  .bg-yellow-100 {
      background-color: #FEF3C7;
  }

  .text-yellow-700 {
      color: #B45309;
  }

  .bg-yellow-500 {
      background-color: #F59E0B;
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

  .bg-orange-100 {
      background-color: #FFEDD5;
  }

  .text-orange-700 {
      color: #C2410C;
  }

  .text-red-500 {
      color: #EF4444;
  }

  .bg-red-100 {
  background-color: #FEE2E2;
}

.text-red-700 {
  color: #B91C1C;
}

.border-blue-500 {
  border-color: #3B82F6;
}

.border-blue-700 {
  border-color: #0056A5;
}
</style>