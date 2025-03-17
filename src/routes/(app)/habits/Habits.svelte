<script lang="ts">
    import { onMount } from 'svelte';
    import { ArrowUp, ArrowDown, CheckCircle, Circle, Menu, X, User, LogOut, Plus, Bell, BellOff, Edit, Trash, Calendar, Clock, Search, Filter } from 'lucide-svelte';    
    import type { Category, CreateHabit, Habit, HabitFrequencyEnum } from '$lib/type/habits/habits';
    import HabitCard from './components/habits/HabitCard.svelte';
    import AddHabitModal from './components/modal/AddHabitModal.svelte';
    import RecommendedModal from './components/modal/RecommendedModal.svelte';
    import EditHabitModal from './components/modal/EditHabitModal.svelte';
    export let categories:Category[]
    export let recommendedHabits:Habit[]
    export let userHabits:Habit[]
    
    const today = new Date().toISOString().split('T')[0];
    
    let showAddHabitModal = false;
    
    
    let showRecommendedModal = false;
    
    let showEditHabitModal = false;
    let editingHabit:any = null;
    
    let filterCategory = 0;
    let searchQuery = '';
    
    const handleClickOutside = (event:CustomEvent) => {
      const target = event.target;
    //   if (!target.closest('.user-dropdown') && userDropdownOpen) {
    //     userDropdownOpen = false;
    //   }
    }    
    
    const toggleHabitCompletion = (event:CustomEvent) => { 
        const habit=event.detail.habit as Habit;             
        const completed = !habit.completed;
                
        habit.completed = completed;
                
        if (completed) {
          if (!habit.completedDates.includes(today)) {
            habit.completedDates.push(today);
          }
        } else {
          habit.completedDates = habit.completedDates.filter(date => date !== today);
        }
        
        updateStreak(habit);
        
        userHabits = [...userHabits];
    }
    
    const updateStreak=(habit:Habit)=> {
      if (!habit.completedDates.length) {
        habit.streak = -1;
        return;
      }
      
      const sortedDates = [...habit.completedDates].sort();
      let streak = 1;
      let currentDate = new Date(sortedDates[sortedDates.length - 1]);
      
      for (let i = sortedDates.length - 2; i >= 0; i--) {
        const prevDate = new Date(sortedDates[i]);
        const diffDays = Math.floor((currentDate.getMilliseconds() - prevDate.getMilliseconds()) / (1000 * 60 * 60 * 24));
        
        if (habit.frequency === 'daily' && diffDays === 1) {
          streak++;
        } else if (habit.frequency === 'weekly' && diffDays <= 7) {
          streak++;
        } else {
          break;
        }
        
        currentDate = prevDate;
      }
      
      habit.streak = streak;
    }
    
    const toggleReminder=(event:CustomEvent)=> {
      const habitIndex = userHabits.findIndex(h => h.id === event.detail.habitId);
      if (habitIndex !== -1) {
        userHabits[habitIndex].reminder = !userHabits[habitIndex].reminder;
        userHabits = [...userHabits];
      }
    }
    
    // 습관 추가
    function addHabit(event:CustomEvent) {
      const newHabit=event.detail.newHabit
      if (!newHabit.name.trim()) return;
      
      const newId = Math.max(0, ...userHabits.map(h => h.id)) + 1;
      
      userHabits = [
        ...userHabits,
        {
          id: newId,
          name: newHabit.name,
          category: newHabit.category,
          icon: newHabit.icon,
          streak: 0,
          frequency: newHabit.frequency as HabitFrequencyEnum,
          reminder: newHabit.reminder,
          reminderTime: newHabit.reminderTime,
          completedDates: [],
          completed: false
        }
      ];
    
      showAddHabitModal = false;      
    }
    
    const addRecommendedHabit=(event:CustomEvent)=> {
      const habit=event.detail.habit
      const existingHabit = userHabits.find(h => h.name === habit.name);
      if (existingHabit) {
        alert('이미 추가된 습관입니다.');
        return;
      }
      
      const newId = Math.max(0, ...userHabits.map(h => h.id)) + 1;
      
      userHabits = [
        ...userHabits,
        {
          id: newId,
          name: habit.name,
          category: habit.category,
          icon: habit.icon,
          streak: 0,
          frequency: 'daily',
          reminder: false,
          reminderTime: '09:00',
          completedDates: [],
          completed: false
        }
      ];
      
      showRecommendedModal = false;
    }

    const editHabit=(event:CustomEvent)=> {      
        editingHabit = { ...event.detail.habit };
        showEditHabitModal = true;
    }
    
    const updateHabit=(event:CustomEvent)=> {
      editingHabit=event.detail.editingHabit
      if (!editingHabit || !editingHabit.name.trim()) return;
      
      const habitIndex = userHabits.findIndex(h => h.id === editingHabit.id);
      if (habitIndex !== -1) {
        userHabits[habitIndex] = { ...editingHabit };
        userHabits = [...userHabits];
      }
      
      showEditHabitModal = false;
      editingHabit = null;
    }
        
    const deleteHabit=(event:CustomEvent)=> {
      if (confirm('정말로 이 습관을 삭제하시겠습니까?')) {
        userHabits = userHabits.filter(h => h.id !== event.detail.habitId);
      }
    }
    
    // 필터링된 습관 목록
    $: filteredHabits = userHabits.filter((habit:Habit) => {
      const matchesCategory = filterCategory === -1 || habit.category === filterCategory;
      const matchesSearch = !searchQuery || 
        habit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCategoryName(habit.category).toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    const getCategoryName=(categoryId:number)=> {
      const category = categories.find(c => c.id  === categoryId);
      return category ? category.name : '';
    }    
    
    const getCategoryColor=(categoryId:number)=> {
      const category = categories.find(c => c.id === categoryId);
      return category ? category.color : 'bg-gray-100 text-gray-700';
    }
        
    const icons = ['💧', '🧘', '📚', '🏃', '📝', '🙏', '📞', '💊', '🍎', '🌱', '⏰', '✍️', '🎯', '🧠', '💤', '🧹'];
        
    onMount(() => {
      userHabits.forEach(habit => {
        habit.completed = habit.completedDates.includes(today);
        updateStreak(habit);
      });
      userHabits = [...userHabits];
    });
  </script>
  
  <div class="w-full max-w-[1200px] px-4">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex items-center justify-between text-[#414141] text-lg mb-6">
        <div class="flex items-center">
          <span class="h-5 border-l-2 border-[#0056A5] mr-2"></span>
          <h1 class="font-semibold">습관 관리</h1>
        </div>
        <div class="flex gap-2">
          <button 
            on:click={() => showRecommendedModal = true}
            class="text-blue-700 text-sm font-medium flex items-center gap-1 hover:underline"
          >
            <Calendar size={16} />
            추천 습관
          </button>
          <button 
            on:click={() => showAddHabitModal = true}
            class="text-blue-700 text-sm font-medium flex items-center gap-1 hover:underline"
          >
            <Plus size={16} />
            새 습관 추가
          </button>
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
            placeholder="습관 검색..." 
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        
        <div class="flex items-center gap-2">
          <Filter size={18} class="text-gray-500" />
          <select 
            bind:value={filterCategory}
            class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="all">모든 카테고리</option>
            {#each categories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>
        </div>
      </div>
      
      {#if filteredHabits.length === 0}
        <div class="text-center py-10">
          <p class="text-gray-500">습관이 없습니다. 새 습관을 추가해보세요!</p>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each filteredHabits as habit}
            <HabitCard
                {categories}
                {habit}
                on:deleteHabit={deleteHabit}
                on:editHabit={editHabit}
                on:toggleHabitCompletion={toggleHabitCompletion}
                on:toggleReminder={toggleReminder}
            >
            </HabitCard>            
          {/each}
        </div>
      {/if}
    </div>
  </div>
   
  {#if showAddHabitModal}
    <AddHabitModal
        bind:showAddHabitModal={showAddHabitModal}
        {icons}
        {categories}
        on:addHabit={addHabit}
    >
    </AddHabitModal>
  {/if}
  
  {#if showRecommendedModal}
    <RecommendedModal
       bind:showRecommendedModal={showRecommendedModal} 
       {recommendedHabits}
       {categories}
       on:addRecommendedHabit={addRecommendedHabit}
    >
    </RecommendedModal>
  {/if}
  
  {#if showEditHabitModal && editingHabit}
    <EditHabitModal
        bind:showEditHabitModal={showEditHabitModal}
        {editingHabit}
        {icons}
        {categories}
        on:updateHabit={updateHabit}
    >        
    </EditHabitModal>    
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
  
  