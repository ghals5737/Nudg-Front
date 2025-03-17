<script lang="ts">
    import { onMount } from 'svelte';
    import { ArrowUp, ArrowDown, CheckCircle, Circle, Menu, X, User, LogOut, Calendar, ChevronLeft, ChevronRight, BarChart2, PieChart, LineChart, Clock, Smile, Frown, Meh, Award, TrendingUp, TrendingDown, Filter, Search, List, Grid, BookOpen } from 'lucide-svelte';    
    import type { PageData } from './$types';
    
    export let data: PageData
    
    let goalRecords=data.context.goalRecords
    let taskRecords=data.context.taskRecords
    let habitRecords=data.context.habitRecords
        
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = new Date(today).toISOString().split('T')[0];
    
    let viewMode = 'daily';
    
    let activeTab = 'all';
    
    function prevMonth() {
      if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
      } else {
        currentMonth--;
      }
    }
    
    function nextMonth() {
      if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
      } else {
        currentMonth++;
      }
    }
    
    function selectDate(date:any) {
      selectedDate = date;
      viewMode = 'daily';
    }
    
    function goToToday() {
      currentMonth = today.getMonth();
      currentYear = today.getFullYear();
      selectedDate = new Date(today).toISOString().split('T')[0];
      viewMode = 'daily';
    }
    
    // 탭 변경
    function changeTab(tab:any) {
      activeTab = tab;
    }
    
    // 보기 모드 변경
    function changeViewMode(mode:any) {
      viewMode = mode;
    }
    
    // 캘린더 날짜 생성
    function getCalendarDates(year:any, month:any) {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();
      
      // 이전 달의 마지막 날짜들
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      const prevMonthDays = Array.from({ length: startingDayOfWeek }, (_, i) => {
        const day = prevMonthLastDay - startingDayOfWeek + i + 1;
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        return {
          date: `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          day,
          isCurrentMonth: false,
          isToday: false,
          hasEvents: false,
          hasHabits: false,
          hasTasks: false
        };
      });
      
      // 현재 달의 날짜들
      const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = date === new Date().toISOString().split('T')[0];
        
        // 이벤트, 습관, 작업 데이터 확인
        const hasEvents = goalRecords.some(goal => goal.date === date);
        const hasHabits = habitRecords.some(record => record.date === date);
        const hasTasks = taskRecords.some(task => task.date === date);
        
        return {
          date,
          day,
          isCurrentMonth: true,
          isToday,
          hasEvents,
          hasHabits,
          hasTasks
        };
      });
      
      // 다음 달의 시작 날짜들
      const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length);
      const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => {
        const day = i + 1;
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;
        return {
          date: `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          day,
          isCurrentMonth: false,
          isToday: false,
          hasEvents: false,
          hasHabits: false,
          hasTasks: false
        };
      });
      
      return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    }
    
    // 요일 이름
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    
    // 월 이름
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    
    // 샘플 데이터: 집중 시간 기록
    const focusRecords = [
      {
        date: '2025-03-13',
        totalFocusTime: 180,
        sessions: [
          { startTime: '09:00', endTime: '10:00', duration: 60, task: '프로젝트 A 기획' },
          { startTime: '11:30', endTime: '12:30', duration: 60, task: '디자인 검토' },
          { startTime: '15:00', endTime: '16:00', duration: 60, task: '이메일 확인' }
        ],
        peakHours: ['09:00', '15:00']
      },
      {
        date: '2025-03-12',
        totalFocusTime: 240,
        sessions: [
          { startTime: '08:30', endTime: '10:00', duration: 90, task: '코드 리뷰' },
          { startTime: '13:00', endTime: '15:30', duration: 150, task: '버그 수정' }
        ],
        peakHours: ['09:00', '14:00']
      },
      {
        date: '2025-03-11',
        totalFocusTime: 210,
        sessions: [
          { startTime: '10:00', endTime: '11:00', duration: 60, task: '고객 미팅' },
          { startTime: '14:00', endTime: '17:30', duration: 150, task: '제안서 작성' }
        ],
        peakHours: ['10:00', '16:00']
      }
    ];
    
    // 샘플 데이터: 감정 & 에너지 기록
    const moodRecords = [
      {
        date: '2025-03-13',
        mood: 'neutral', // happy, neutral, sad
        energy: {
          morning: 7,
          afternoon: 5,
          evening: 4
        },
        notes: '오늘은 평범한 하루였다. 오후에 약간 피곤함을 느꼈지만 계획한 일은 대부분 진행했다.'
      },
      {
        date: '2025-03-12',
        mood: 'happy',
        energy: {
          morning: 8,
          afternoon: 7,
          evening: 6
        },
        notes: '오늘은 기분이 좋았다. 모든 작업을 완료했고, 팀원들과의 협업도 원활했다.'
      },
      {
        date: '2025-03-11',
        mood: 'sad',
        energy: {
          morning: 4,
          afternoon: 3,
          evening: 5
        },
        notes: '오늘은 컨디션이 좋지 않았다. 아침부터 피곤함을 느꼈고, 집중하기 어려웠다.'
      }
    ];
    
    // 샘플 데이터: 성취 뱃지
    const achievements = [
      { id: 1, title: '7일 연속 독서 습관 달성!', date: '2025-03-13', icon: '📚', type: 'streak' },
      { id: 2, title: '이번 주 작업 완료율 90% 달성!', date: '2025-03-12', icon: '🎯', type: 'completion' },
      { id: 3, title: '하루 집중 시간 4시간 달성!', date: '2025-03-12', icon: '⏱️', type: 'focus' },
      { id: 4, title: '첫 번째 습관 등록 완료!', date: '2025-03-10', icon: '🌱', type: 'milestone' }
    ];
    
    // 샘플 데이터: 주간 통계
    const weeklyStats = {
      currentWeek: {
        taskCompletion: 85,
        habitCompletion: 75,
        focusTime: 630,
        averageMood: 'happy'
      },
      previousWeek: {
        taskCompletion: 70,
        habitCompletion: 60,
        focusTime: 540,
        averageMood: 'neutral'
      },
      change: {
        taskCompletion: 15,
        habitCompletion: 15,
        focusTime: 90,
        mood: 'improved'
      }
    };
    
    // 샘플 데이터: 월간 통계
    const monthlyStats = {
      habitStreaks: [
        { name: '물 마시기', streak: 15, category: 'health' },
        { name: '독서하기', streak: 7, category: 'learning' },
        { name: '명상하기', streak: 5, category: 'mindfulness' }
      ],
      mostProductiveDay: '화요일',
      averageTaskCompletion: 78,
      totalFocusHours: 42
    };
    
    // 선택된 날짜의 데이터 가져오기
    $: selectedDateGoals = goalRecords.find(goal => goal.date === selectedDate) || {
      date: selectedDate,
      goals: [],
      completionRate: 0,
      totalTime: 0,
      plannedTime: 0
    };
    
    $: selectedDateTasks = taskRecords.find(record => record.date === selectedDate) || {
      date: selectedDate,
      tasks: [],
      completionRate: 0
    };
    
    $: selectedDateHabits = habitRecords.find(record => record.date === selectedDate) || {
      date: selectedDate,
      habits: [],
      completionRate: 0
    };
    
    $: selectedDateFocus = focusRecords.find(record => record.date === selectedDate) || {
      date: selectedDate,
      totalFocusTime: 0,
      sessions: [],
      peakHours: []
    };
    
    $: selectedDateMood = moodRecords.find(record => record.date === selectedDate) || {
      date: selectedDate,
      mood: 'neutral',
      energy: {
        morning: 5,
        afternoon: 5,
        evening: 5
      },
      notes: ''
    };
    
    // 캘린더 날짜 계산
    $: calendarDates = getCalendarDates(currentYear, currentMonth);
    
    // 선택된 날짜의 성취 뱃지
    $: selectedDateAchievements = achievements.filter(achievement => achievement.date === selectedDate);
    
    // 감정 아이콘 가져오기
    function getMoodIcon(mood:any) {
      switch(mood) {
        case 'happy': return Smile;
        case 'sad': return Frown;
        default: return Meh;
      }
    }
    
    // 감정 색상 가져오기
    function getMoodColor(mood:any) {
      switch(mood) {
        case 'happy': return 'text-green-500';
        case 'sad': return 'text-red-500';
        default: return 'text-yellow-500';
      }
    }
    
    // 카테고리 색상 가져오기
    function getCategoryColor(category:any) {
      switch(category) {
        case 'health': return 'bg-green-100 text-green-700';
        case 'mindfulness': return 'bg-purple-100 text-purple-700';
        case 'learning': return 'bg-yellow-100 text-yellow-700';
        case 'social': return 'bg-pink-100 text-pink-700';
        case 'productivity': return 'bg-blue-100 text-blue-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    }
    
    // 프로젝트 색상 가져오기
    function getProjectColor(project:any) {
      switch(project) {
        case '마케팅': return 'bg-blue-100 text-blue-700';
        case '디자인': return 'bg-purple-100 text-purple-700';
        case '개발': return 'bg-green-100 text-green-700';
        case '영업': return 'bg-yellow-100 text-yellow-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    }
    
    // 상태 색상 가져오기
    function getStatusColor(status:any) {
      switch(status) {
        case 'completed': return 'bg-green-100 text-green-700';
        case 'in-progress': return 'bg-blue-100 text-blue-700';
        case 'not-started': return 'bg-gray-100 text-gray-700';
        case 'overdue': return 'bg-red-100 text-red-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    }
    
    // 시간 포맷팅
    function formatTime(minutes:any) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      
      if (hours > 0) {
        return `${hours}시간 ${mins > 0 ? `${mins}분` : ''}`;
      }
      
      return `${mins}분`;
    }
    
    // 날짜 포맷팅
    function formatDate(dateString:any) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      return `${year}년 ${month}월 ${day}일`;
    }
    
    // 요일 가져오기
    function getDayOfWeek(dateString:any) {
      const date = new Date(dateString);
      return weekdays[date.getDay()];
    }
    
    // 변화율 화살표 아이콘
    function getChangeIcon(change:any) {
      return change >= 0 ? TrendingUp : TrendingDown;
    }
    
    // 변화율 색상
    function getChangeColor(change:any) {
      return change >= 0 ? 'text-green-500' : 'text-red-500';
    }
  </script>
  
  
<div class="w-full max-w-[1200px] px-4">
<div class="bg-white rounded-lg shadow-sm p-6">
    <!-- 헤더 -->
    <div class="flex items-center justify-between text-[#414141] text-lg mb-6">
    <div class="flex items-center">
        <span class="h-5 border-l-2 border-[#0056A5] mr-2"></span>
        <h1 class="font-semibold">기록 보기</h1>
    </div>
    
    <!-- 보기 모드 선택 -->
    <div class="flex gap-2">
        <button 
        on:click={() => changeViewMode('daily')}
        class={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === 'daily' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
        일간
        </button>
        <button 
        on:click={() => changeViewMode('weekly')}
        class={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === 'weekly' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
        주간
        </button>
        <button 
        on:click={() => changeViewMode('monthly')}
        class={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === 'monthly' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
        월간
        </button>
    </div>
    </div>
    
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
    
    <!-- 탭 메뉴 -->
    <div class="border-b border-gray-200 mb-6">
    <div class="flex overflow-x-auto">
        <button 
        on:click={() => changeTab('all')}
        class={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'all' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
        전체 요약
        </button>
        <button 
        on:click={() => changeTab('schedule')}
        class={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'schedule' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
        하루 일정
        </button>
        <button 
        on:click={() => changeTab('tasks')}
        class={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'tasks' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
        작업
        </button>
        <button 
        on:click={() => changeTab('habits')}
        class={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'habits' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
        습관
        </button>
        <button 
        on:click={() => changeTab('focus')}
        class={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'focus' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
        집중 시간
        </button>
        <button 
        on:click={() => changeTab('mood')}
        class={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'mood' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
        감정 & 에너지
        </button>
    </div>
    </div>
    
    {#if viewMode === 'daily'}
    <!-- 일간 보기 -->
    <div class="mb-6">
        <h2 class="text-xl font-medium mb-2">{formatDate(selectedDate)} ({getDayOfWeek(selectedDate)})</h2>
        
        {#if selectedDateAchievements.length > 0}
        <div class="mb-4">
            <div class="flex flex-wrap gap-2">
            {#each selectedDateAchievements as achievement}
                <div class="flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-md border border-yellow-200">
                <Award size={16} />
                <span>{achievement.title}</span>
                </div>
            {/each}
            </div>
        </div>
        {/if}
        
        {#if activeTab === 'all' || activeTab === 'schedule'}
        <!-- 하루 일정 요약 -->
        <div class="bg-white border border-gray-100 rounded-lg p-4 mb-6">
            <h3 class="text-lg font-medium mb-3 flex items-center gap-2">
            <Calendar size={18} />
            하루 일정
            </h3>
            
            {#if selectedDateGoals.goals.length === 0}
            <p class="text-gray-500">이 날짜에 등록된 일정이 없습니다.</p>
            {:else}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-500 mb-1">완료율</p>
                <div class="flex items-center gap-2">
                    <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        class="h-full bg-blue-600 rounded-full" 
                        style="width: {selectedDateGoals.completionRate}%"
                    ></div>
                    </div>
                    <span class="font-medium">{selectedDateGoals.completionRate}%</span>
                </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-500 mb-1">소요 시간</p>
                <p class="font-medium">{formatTime(selectedDateGoals.totalTime)}</p>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-500 mb-1">계획 대비</p>
                <div class="flex items-center gap-2">
                    <span class="font-medium">{formatTime(selectedDateGoals.totalTime)}</span>
                    <span class="text-gray-500">/</span>
                    <span class="text-gray-500">{formatTime(selectedDateGoals.plannedTime)}</span>
                </div>
                </div>
            </div>
            
            <div class="space-y-3">
                {#each selectedDateGoals.goals as goal}
                <div class="border border-gray-100 rounded-lg p-3">
                    <div class="flex justify-between items-center mb-2">
                    <h4 class="font-medium">{goal.title}</h4>
                    <span class="text-sm">{0}/{goal.steps.length} 단계</span>
                    </div>
                    <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                        class="h-full bg-blue-600 rounded-full" 
                        style="width: {goal.progress}%"
                    ></div>
                    </div>
                </div>
                {/each}
            </div>
            {/if}
        </div>
        {/if}
        
        {#if activeTab === 'all' || activeTab === 'tasks'}
        <!-- 작업 요약 -->
        <div class="bg-white border border-gray-100 rounded-lg p-4 mb-6">
            <h3 class="text-lg font-medium mb-3 flex items-center gap-2">
            <List size={18} />
            작업
            </h3>
            
            {#if selectedDateTasks.tasks.length === 0}
            <p class="text-gray-500">이 날짜에 등록된 작업이 없습니다.</p>
            {:else}
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
                <p class="text-sm text-gray-500 mb-1">작업 완료율</p>
                <div class="flex items-center gap-2">
                <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                    class="h-full bg-blue-600 rounded-full" 
                    style="width: {selectedDateTasks.completionRate}%"
                    ></div>
                </div>
                <span class="font-medium">{selectedDateTasks.completionRate}%</span>
                </div>
            </div>
            
            <div class="space-y-3">
                {#each selectedDateTasks.tasks as task}
                <div class="border border-gray-100 rounded-lg p-3">
                    <div class="flex justify-between items-center">
                    <div>
                        <h4 class="font-medium">{task.title}</h4>
                        <div class="flex items-center gap-2 mt-1">
                        <span class={`text-xs px-2 py-0.5 rounded-full ${getProjectColor(task.priority)}`}>
                            {task.category}
                        </span>
                        <span class={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(task.status)}`}>
                            {task.status === 'completed' ? '완료' : task.status === 'in-progress' ? '진행중' : '미시작'}
                        </span>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-500">소요 시간</p>
                        <p class="font-medium">{formatTime(task.dueDate)}</p>
                    </div>
                    </div>
                </div>
                {/each}
            </div>
            {/if}
        </div>
        {/if}
        
        {#if activeTab === 'all' || activeTab === 'habits'}
        <!-- 습관 요약 -->
        <div class="bg-white border border-gray-100 rounded-lg p-4 mb-6">
            <h3 class="text-lg font-medium mb-3 flex items-center gap-2">
            <Calendar size={18} />
            습관
            </h3>
            
            {#if selectedDateHabits.habits.length === 0}
            <p class="text-gray-500">이 날짜에 등록된 습관이 없습니다.</p>
            {:else}
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
                <p class="text-sm text-gray-500 mb-1">습관 완료율</p>
                <div class="flex items-center gap-2">
                <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                    class="h-full bg-green-600 rounded-full" 
                    style="width: {selectedDateHabits.completionRate}%"
                    ></div>
                </div>
                <span class="font-medium">{selectedDateHabits.completionRate}%</span>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                {#each selectedDateHabits.habits as habit}
                <div class="border border-gray-100 rounded-lg p-3">
                    <div class="flex justify-between items-center">
                    <div>
                        <h4 class="font-medium">{habit.name}</h4>
                        <div class="flex items-center gap-2 mt-1">
                        <span class={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(habit.category)}`}>
                            {habit.category === 0 ? '건강' : 
                            habit.category === 1 ? '마음챙김' : 
                            habit.category === 2 ? '학습' : 
                            habit.category === 3 ? '사회성' : '생산성'}
                        </span>
                        {#if habit.streak > 0}
                            <span class="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 flex items-center gap-1">
                            <!-- <Fire size={12} /> -->
                            {habit.streak}일 연속
                            </span>
                        {/if}
                        </div>
                    </div>
                    <div>
                        {#if habit.completed}
                        <span class="flex items-center gap-1 text-green-500">
                            <CheckCircle size={18} />
                            완료
                        </span>
                        {:else}
                        <span class="flex items-center gap-1 text-gray-400">
                            <Circle size={18} />
                            미완료
                        </span>
                        {/if}
                    </div>
                    </div>
                </div>
                {/each}
            </div>
            {/if}
        </div>
        {/if}
        
        {#if activeTab === 'all' || activeTab === 'focus'}
        <!-- 집중 시간 요약 -->
        <div class="bg-white border border-gray-100 rounded-lg p-4 mb-6">
            <h3 class="text-lg font-medium mb-3 flex items-center gap-2">
            <Clock size={18} />
            집중 시간
            </h3>
            
            {#if selectedDateFocus.sessions.length === 0}
            <p class="text-gray-500">이 날짜에 기록된 집중 시간이 없습니다.</p>
            {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-500 mb-1">총 집중 시간</p>
                <p class="font-medium text-lg">{formatTime(selectedDateFocus.totalFocusTime)}</p>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-500 mb-1">집중도 높은 시간대</p>
                <p class="font-medium">
                    {selectedDateFocus.peakHours.join(', ')}
                </p>
                </div>
            </div>
            
            <div class="space-y-3">
                <h4 class="font-medium text-gray-700">집중 세션</h4>
                {#each selectedDateFocus.sessions as session}
                <div class="border border-gray-100 rounded-lg p-3">
                    <div class="flex justify-between items-center">
                    <div>
                        <h5 class="font-medium">{session.task}</h5>
                        <p class="text-sm text-gray-500">{session.startTime} - {session.endTime}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-500">지속 시간</p>
                        <p class="font-medium">{formatTime(session.duration)}</p>
                    </div>
                    </div>
                </div>
                {/each}
            </div>
            {/if}
        </div>
        {/if}
        
        {#if activeTab === 'all' || activeTab === 'mood'}
        <!-- 감정 & 에너지 요약 -->
        <div class="bg-white border border-gray-100 rounded-lg p-4 mb-6">
            <h3 class="text-lg font-medium mb-3 flex items-center gap-2">
            <svelte:component this={getMoodIcon(selectedDateMood.mood)} class={getMoodColor(selectedDateMood.mood)} />
            감정 & 에너지
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-500 mb-2">오늘의 기분</p>
                <div class="flex items-center gap-2">
                <svelte:component this={getMoodIcon(selectedDateMood.mood)} size={24} class={getMoodColor(selectedDateMood.mood)} />
                <span class="font-medium">
                    {selectedDateMood.mood === 'happy' ? '좋음' : selectedDateMood.mood === 'sad' ? '나쁨' : '보통'}
                </span>
                </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-500 mb-2">에너지 레벨</p>
                <div class="flex items-center justify-between">
                <div class="text-center">
                    <p class="text-xs text-gray-500">아침</p>
                    <p class="font-medium">{selectedDateMood.energy.morning}/10</p>
                </div>
                <div class="text-center">
                    <p class="text-xs text-gray-500">오후</p>
                    <p class="font-medium">{selectedDateMood.energy.afternoon}/10</p>
                </div>
                <div class="text-center">
                    <p class="text-xs text-gray-500">저녁</p>
                    <p class="font-medium">{selectedDateMood.energy.evening}/10</p>
                </div>
                </div>
            </div>
            </div>
            
            {#if selectedDateMood.notes}
            <div class="border border-gray-100 rounded-lg p-4">
                <h4 class="font-medium text-gray-700 mb-2 flex items-center gap-2">
                <BookOpen size={16} />
                메모
                </h4>
                <p class="text-gray-600">{selectedDateMood.notes}</p>
            </div>
            {/if}
        </div>
        {/if}
    </div>
    {:else if viewMode === 'weekly'}
    <!-- 주간 보기 -->
    <div>
        <h2 class="text-xl font-medium mb-4">주간 통계</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- 작업 완료율 -->
        <div class="bg-white border border-gray-100 rounded-lg p-4">
            <h3 class="text-lg font-medium mb-3">작업 완료율</h3>
            <div class="flex items-center justify-between mb-4">
            <div>
                <p class="text-3xl font-bold">{weeklyStats.currentWeek.taskCompletion}%</p>
                <div class="flex items-center gap-1 mt-1">
                <svelte:component 
                    this={getChangeIcon(weeklyStats.change.taskCompletion)} 
                    size={16} 
                    class={getChangeColor(weeklyStats.change.taskCompletion)} 
                />
                <span class={getChangeColor(weeklyStats.change.taskCompletion)}>
                    {Math.abs(weeklyStats.change.taskCompletion)}%
                </span>
                <span class="text-gray-500 text-sm">지난주 대비</span>
                </div>
            </div>
            <div class="w-24 h-24 relative">
                <div class="w-full h-full rounded-full bg-gray-100"></div>
                <div 
                class="absolute top-0 left-0 w-full h-full rounded-full border-8 border-blue-500"
                style="clip: rect(0, {24 * weeklyStats.currentWeek.taskCompletion / 100}px, 24px, 0)"
                ></div>
            </div>
            </div>
        </div>
        
        <!-- 습관 완료율 -->
        <div class="bg-white border border-gray-100 rounded-lg p-4">
            <h3 class="text-lg font-medium mb-3">습관 완료율</h3>
            <div class="flex items-center justify-between mb-4">
            <div>
                <p class="text-3xl font-bold">{weeklyStats.currentWeek.habitCompletion}%</p>
                <div class="flex items-center gap-1 mt-1">
                <svelte:component 
                    this={getChangeIcon(weeklyStats.change.habitCompletion)} 
                    size={16} 
                    class={getChangeColor(weeklyStats.change.habitCompletion)} 
                />
                <span class={getChangeColor(weeklyStats.change.habitCompletion)}>
                    {Math.abs(weeklyStats.change.habitCompletion)}%
                </span>
                <span class="text-gray-500 text-sm">지난주 대비</span>
                </div>
            </div>
            <div class="w-24 h-24 relative">
                <div class="w-full h-full rounded-full bg-gray-100"></div>
                <div 
                class="absolute top-0 left-0 w-full h-full rounded-full border-8 border-green-500"
                style="clip: rect(0, {24 * weeklyStats.currentWeek.habitCompletion / 100}px, 24px, 0)"
                ></div>
            </div>
            </div>
        </div>
        
        <!-- 집중 시간 -->
        <div class="bg-white border border-gray-100 rounded-lg p-4">
            <h3 class="text-lg font-medium mb-3">총 집중 시간</h3>
            <div class="flex items-center justify-between mb-4">
            <div>
                <p class="text-3xl font-bold">{formatTime(weeklyStats.currentWeek.focusTime)}</p>
                <div class="flex items-center gap-1 mt-1">
                <svelte:component 
                    this={getChangeIcon(weeklyStats.change.focusTime)} 
                    size={16} 
                    class={getChangeColor(weeklyStats.change.focusTime)} 
                />
                <span class={getChangeColor(weeklyStats.change.focusTime)}>
                    {formatTime(Math.abs(weeklyStats.change.focusTime))}
                </span>
                <span class="text-gray-500 text-sm">지난주 대비</span>
                </div>
            </div>
            <div class="text-right">
                <p class="text-sm text-gray-500">일일 평균</p>
                <p class="font-medium">{formatTime(Math.round(weeklyStats.currentWeek.focusTime / 7))}</p>
            </div>
            </div>
        </div>
        
        <!-- 평균 기분 -->
        <div class="bg-white border border-gray-100 rounded-lg p-4">
            <h3 class="text-lg font-medium mb-3">평균 기분</h3>
            <div class="flex items-center justify-between mb-4">
            <div>
                <div class="flex items-center gap-2">
                <svelte:component 
                    this={getMoodIcon(weeklyStats.currentWeek.averageMood)} 
                    size={32} 
                    class={getMoodColor(weeklyStats.currentWeek.averageMood)} 
                />
                <p class="text-xl font-bold">
                    {weeklyStats.currentWeek.averageMood === 'happy' ? '좋음' : 
                    weeklyStats.currentWeek.averageMood === 'sad' ? '나쁨' : '보통'}
                </p>
                </div>
                <p class="text-gray-500 text-sm mt-1">
                {weeklyStats.change.mood === 'improved' ? '지난주보다 개선됨' : weeklyStats.change.mood === 'worsened' ? '지난주보다 악화됨' : '지난주와 비슷함'}
                </p>
            </div>
            <div class="text-right">
                <p class="text-sm text-gray-500">지난주</p>
                <div class="flex items-center justify-end gap-1">
                <svelte:component 
                    this={getMoodIcon(weeklyStats.previousWeek.averageMood)} 
                    size={20} 
                    class={getMoodColor(weeklyStats.previousWeek.averageMood)} 
                />
                <p class="font-medium">
                    {weeklyStats.previousWeek.averageMood === 'happy' ? '좋음' : 
                    weeklyStats.previousWeek.averageMood === 'sad' ? '나쁨' : '보통'}
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>
        
        <!-- 성취 뱃지 -->
        <div class="bg-white border border-gray-100 rounded-lg p-4 mb-6">
        <h3 class="text-lg font-medium mb-3 flex items-center gap-2">
            <Award size={18} />
            이번 주 성취
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            {#each achievements as achievement}
            <div class="border border-gray-100 rounded-lg p-3 flex items-center gap-3">
                <div class="text-2xl">{achievement.icon}</div>
                <div>
                <p class="font-medium">{achievement.title}</p>
                <p class="text-sm text-gray-500">{formatDate(achievement.date)}</p>
                </div>
            </div>
            {/each}
        </div>
        </div>
    </div>
    {:else if viewMode === 'monthly'}
    <!-- 월간 보기 -->
    <div>
        <h2 class="text-xl font-medium mb-4">월간 통계</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- 습관 연속 기록 -->
        <div class="bg-white border border-gray-100 rounded-lg p-4">
            <h3 class="text-lg font-medium mb-3 flex items-center gap-2">
            <!-- <Fire size={18} /> -->
            가장 긴 습관 연속 기록
            </h3>
            
            <div class="space-y-4">
            {#each monthlyStats.habitStreaks as habit, index}
                <div class="flex items-center gap-3">
                <div class="text-xl font-bold text-gray-400">{index + 1}</div>
                <div class="flex-1">
                    <div class="flex justify-between items-center">
                    <p class="font-medium">{habit.name}</p>
                    <span class="text-orange-500 font-medium flex items-center gap-1">
                        <!-- <Fire size={16} /> -->
                        {habit.streak}일
                    </span>
                    </div>
                    <div class="w-full h-2 bg-gray-100 rounded-full mt-1">
                    <div 
                        class={`h-full rounded-full ${habit.category === 'health' ? 'bg-green-500' : 
                                                    habit.category === 'learning' ? 'bg-yellow-500' : 
                                                    habit.category === 'mindfulness' ? 'bg-purple-500' : 
                                                    'bg-blue-500'}`}
                        style="width: {Math.min(habit.streak * 3, 100)}%"
                    ></div>
                    </div>
                </div>
                </div>
            {/each}
            </div>
        </div>
        
        <!-- 생산성 통계 -->
        <div class="bg-white border border-gray-100 rounded-lg p-4">
            <h3 class="text-lg font-medium mb-3">생산성 통계</h3>
            
            <div class="space-y-4">
            <div class="bg-gray-50 p-3 rounded-lg">
                <p class="text-sm text-gray-500 mb-1">가장 생산적인 요일</p>
                <p class="font-medium text-lg">{monthlyStats.mostProductiveDay}</p>
            </div>
            
            <div class="bg-gray-50 p-3 rounded-lg">
                <p class="text-sm text-gray-500 mb-1">평균 작업 완료율</p>
                <div class="flex items-center gap-2">
                <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                    class="h-full bg-blue-600 rounded-full" 
                    style="width: {monthlyStats.averageTaskCompletion}%"
                    ></div>
                </div>
                <span class="font-medium">{monthlyStats.averageTaskCompletion}%</span>
                </div>
            </div>
            
            <div class="bg-gray-50 p-3 rounded-lg">
                <p class="text-sm text-gray-500 mb-1">총 집중 시간</p>
                <p class="font-medium text-lg">{monthlyStats.totalFocusHours}시간</p>
            </div>
            </div>
        </div>
        </div>
        
        <!-- 월간 요약 차트 -->
        <div class="bg-white border border-gray-100 rounded-lg p-4 mb-6">
        <h3 class="text-lg font-medium mb-3 flex items-center gap-2">
            <BarChart2 size={18} />
            월간 요약
        </h3>
        
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p class="text-gray-500">차트 영역 (실제 구현 시 차트 라이브러리 사용)</p>
        </div>
        </div>
    </div>
    {/if}
</div>
</div>

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