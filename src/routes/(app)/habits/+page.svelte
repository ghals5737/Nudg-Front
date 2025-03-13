<script lang="ts">
    import { onMount } from 'svelte';
    import { ArrowUp, ArrowDown, CheckCircle, Circle, Menu, X, User, LogOut, Plus, Bell, BellOff, Edit, Trash, Calendar, Clock, Search, Filter } from 'lucide-svelte';    
 
    // 습관 카테고리
    const categories = [
      { id: 'health', name: '건강', color: 'bg-green-100 text-green-700' },
      { id: 'productivity', name: '생산성', color: 'bg-blue-100 text-blue-700' },
      { id: 'mindfulness', name: '마음챙김', color: 'bg-purple-100 text-purple-700' },
      { id: 'learning', name: '학습', color: 'bg-yellow-100 text-yellow-700' },
      { id: 'social', name: '사회성', color: 'bg-pink-100 text-pink-700' }
    ];
    
    // 추천 습관 목록
    const recommendedHabits = [
      { id: 'water', name: '물 마시기', category: 'health', description: '하루 8잔의 물 마시기', icon: '💧' },
      { id: 'meditation', name: '명상하기', category: 'mindfulness', description: '10분 명상으로 마음 챙기기', icon: '🧘' },
      { id: 'reading', name: '독서하기', category: 'learning', description: '하루 20페이지 책 읽기', icon: '📚' },
      { id: 'exercise', name: '운동하기', category: 'health', description: '30분 걷기 또는 가벼운 운동', icon: '🏃' },
      { id: 'planning', name: '하루 계획 세우기', category: 'productivity', description: '아침에 오늘의 할 일 계획하기', icon: '📝' },
      { id: 'gratitude', name: '감사일기 쓰기', category: 'mindfulness', description: '오늘 감사한 일 3가지 적기', icon: '🙏' },
      { id: 'call', name: '가족에게 전화하기', category: 'social', description: '주 1회 가족에게 안부 전화하기', icon: '📞' },
      { id: 'vitamins', name: '비타민 복용하기', category: 'health', description: '매일 아침 비타민 복용하기', icon: '💊' }
    ];
    
    // 사용자 습관 목록
    let userHabits = [
      { 
        id: 1, 
        name: '물 마시기', 
        category: 'health', 
        icon: '💧', 
        streak: 5, 
        frequency: 'daily', 
        reminder: true, 
        reminderTime: '09:00',
        completedDates: [
          '2025-03-07', '2025-03-08', '2025-03-09', 
          '2025-03-10', '2025-03-11', '2025-03-12'
        ],
        completed: false
      },
      { 
        id: 2, 
        name: '명상하기', 
        category: 'mindfulness', 
        icon: '🧘', 
        streak: 3, 
        frequency: 'daily', 
        reminder: true, 
        reminderTime: '07:30',
        completedDates: [
          '2025-03-10', '2025-03-11', '2025-03-12'
        ],
        completed: false
      },
      { 
        id: 3, 
        name: '독서하기', 
        category: 'learning', 
        icon: '📚', 
        streak: 7, 
        frequency: 'daily', 
        reminder: false, 
        reminderTime: '',
        completedDates: [
          '2025-03-06', '2025-03-07', '2025-03-08', 
          '2025-03-09', '2025-03-10', '2025-03-11', '2025-03-12'
        ],
        completed: true
      },
      { 
        id: 4, 
        name: '가족에게 전화하기', 
        category: 'social', 
        icon: '📞', 
        streak: 2, 
        frequency: 'weekly', 
        reminder: true, 
        reminderTime: '19:00',
        completedDates: [
          '2025-03-05', '2025-03-12'
        ],
        completed: false
      }
    ];
    
    // 현재 날짜
    const today = new Date().toISOString().split('T')[0];
    
    // 습관 추가 모달 상태
    let showAddHabitModal = false;
    let newHabit = {
      name: '',
      category: 'health',
      icon: '💧',
      frequency: 'daily',
      reminder: false,
      reminderTime: '09:00'
    };
    
    // 추천 습관 모달 상태
    let showRecommendedModal = false;
    
    // 습관 편집 모달 상태
    let showEditHabitModal = false;
    let editingHabit:any = null;
    
    // 필터 상태
    let filterCategory = 'all';
    let searchQuery = '';
    
    
    
    // 클릭 이벤트 핸들러
    function handleClickOutside(event:CustomEvent) {
      const target = event.target;
    //   if (!target.closest('.user-dropdown') && userDropdownOpen) {
    //     userDropdownOpen = false;
    //   }
    }
    
    // 습관 완료 토글
    function toggleHabitCompletion(habitId:number) {
      const habitIndex = userHabits.findIndex(h => h.id === habitId);
      if (habitIndex !== -1) {
        const habit = userHabits[habitIndex];
        const completed = !habit.completed;
        
        // 완료 상태 업데이트
        habit.completed = completed;
        
        // 완료 날짜 업데이트
        if (completed) {
          if (!habit.completedDates.includes(today)) {
            habit.completedDates.push(today);
          }
        } else {
          habit.completedDates = habit.completedDates.filter(date => date !== today);
        }
        
        // 연속 기록 업데이트
        updateStreak(habit);
        
        userHabits = [...userHabits];
      }
    }
    
    // 연속 기록 업데이트
    function updateStreak(habit:any) {
      if (!habit.completedDates.length) {
        habit.streak = 0;
        return;
      }
      
      // 날짜 정렬
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
    
    // 리마인더 토글
    function toggleReminder(habitId:number) {
      const habitIndex = userHabits.findIndex(h => h.id === habitId);
      if (habitIndex !== -1) {
        userHabits[habitIndex].reminder = !userHabits[habitIndex].reminder;
        userHabits = [...userHabits];
      }
    }
    
    // 습관 추가
    function addHabit() {
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
          frequency: newHabit.frequency,
          reminder: newHabit.reminder,
          reminderTime: newHabit.reminderTime,
          completedDates: [],
          completed: false
        }
      ];
      
      // 모달 닫기 및 폼 초기화
      showAddHabitModal = false;
      newHabit = {
        name: '',
        category: 'health',
        icon: '💧',
        frequency: 'daily',
        reminder: false,
        reminderTime: '09:00'
      };
    }
    
    // 추천 습관 추가
    function addRecommendedHabit(habit:any) {
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
    
    // 습관 편집
    function editHabit(habitId:number) {
      const habit = userHabits.find(h => h.id === habitId);
      if (habit) {
        editingHabit = { ...habit };
        showEditHabitModal = true;
      }
    }
    
    // 습관 업데이트
    function updateHabit() {
      if (!editingHabit || !editingHabit.name.trim()) return;
      
      const habitIndex = userHabits.findIndex(h => h.id === editingHabit.id);
      if (habitIndex !== -1) {
        userHabits[habitIndex] = { ...editingHabit };
        userHabits = [...userHabits];
      }
      
      showEditHabitModal = false;
      editingHabit = null;
    }
    
    // 습관 삭제
    function deleteHabit(habitId:number) {
      if (confirm('정말로 이 습관을 삭제하시겠습니까?')) {
        userHabits = userHabits.filter(h => h.id !== habitId);
      }
    }
    
    // 필터링된 습관 목록
    $: filteredHabits = userHabits.filter((habit:any) => {
      const matchesCategory = filterCategory === 'all' || habit.category === filterCategory;
      const matchesSearch = !searchQuery || 
        habit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCategoryName(habit.category).toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    // 카테고리 이름 가져오기
    function getCategoryName(categoryId:string) {
      const category = categories.find(c => c.id  === categoryId);
      return category ? category.name : '';
    }
    
    // 카테고리 색상 가져오기
    function getCategoryColor(categoryId:string) {
      const category = categories.find(c => c.id === categoryId);
      return category ? category.color : 'bg-gray-100 text-gray-700';
    }
    
    // 아이콘 목록
    const icons = ['💧', '🧘', '📚', '🏃', '📝', '🙏', '📞', '💊', '🍎', '🌱', '⏰', '✍️', '🎯', '🧠', '💤', '🧹'];
    
    // 페이지 로드 시 습관 완료 상태 업데이트
    onMount(() => {
      userHabits.forEach(habit => {
        habit.completed = habit.completedDates.includes(today);
        updateStreak(habit);
      });
      userHabits = [...userHabits];
    });
  </script>
  
  <!-- <svelte:window on:click={handleClickOutside} /> -->
  
  <div class="w-full max-w-[1200px] px-4">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <!-- 헤더 -->
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
      
      <!-- 필터 및 검색 -->
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
      
      <!-- 습관 목록 -->
      {#if filteredHabits.length === 0}
        <div class="text-center py-10">
          <p class="text-gray-500">습관이 없습니다. 새 습관을 추가해보세요!</p>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each filteredHabits as habit}
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
                      on:click={() => editHabit(habit.id)}
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
                    on:click={() => toggleHabitCompletion(habit.id)}
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
          {/each}
        </div>
      {/if}
    </div>
  </div>
   
  
  <!-- 습관 추가 모달 -->
  {#if showAddHabitModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-900">새 습관 추가</h2>
            <button 
              on:click={() => showAddHabitModal = false}
              class="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
          
          <form on:submit|preventDefault={addHabit} class="space-y-4">
            <div>
              <label for="habit-name" class="block text-sm font-medium text-gray-700">습관 이름</label>
              <input 
                id="habit-name" 
                type="text" 
                bind:value={newHabit.name}
                required
                placeholder="예: 물 마시기"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label for="habit-category" class="block text-sm font-medium text-gray-700">카테고리</label>
              <select 
                id="habit-category" 
                bind:value={newHabit.category}
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
                    on:click={() => newHabit.icon = icon}
                    class="w-full aspect-square flex items-center justify-center text-xl border rounded-md {newHabit.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}"
                  >
                    {icon}
                  </button>
                {/each}
              </div>
            </div>
            
            <div>
              <label for="habit-frequency" class="block text-sm font-medium text-gray-700">빈도</label>
              <select 
                id="habit-frequency" 
                bind:value={newHabit.frequency}
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="daily">매일</option>
                <option value="weekly">매주</option>
              </select>
            </div>
            
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input 
                  id="habit-reminder" 
                  type="checkbox" 
                  bind:checked={newHabit.reminder}
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="habit-reminder" class="font-medium text-gray-700">리마인더 설정</label>
                <p class="text-gray-500">습관을 상기시키는 알림을 받습니다</p>
              </div>
            </div>
            
            {#if newHabit.reminder}
              <div>
                <label for="reminder-time" class="block text-sm font-medium text-gray-700">알림 시간</label>
                <input 
                  id="reminder-time" 
                  type="time" 
                  bind:value={newHabit.reminderTime}
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            {/if}
            
            <div class="flex justify-end gap-3 pt-4">
              <button 
                type="button"
                on:click={() => showAddHabitModal = false}
                class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                취소
              </button>
              <button 
                type="submit"
                class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                추가
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- 추천 습관 모달 -->
  {#if showRecommendedModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-900">추천 습관</h2>
            <button 
              on:click={() => showRecommendedModal = false}
              class="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each recommendedHabits as habit}
              <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div class="flex items-start gap-3">
                  <span class="text-2xl">{habit.icon}</span>
                  <div class="flex-1">
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="font-medium text-gray-900">{habit.name}</h3>
                        <span class={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(habit.category)}`}>
                          {getCategoryName(habit.category)}
                        </span>
                      </div>
                      <button 
                        on:click={() => addRecommendedHabit(habit)}
                        class="p-1 rounded-full text-blue-700 hover:bg-blue-100"
                        title="습관 추가"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <p class="mt-2 text-sm text-gray-600">{habit.description}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- 습관 편집 모달 -->
  {#if showEditHabitModal && editingHabit}
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
  
  