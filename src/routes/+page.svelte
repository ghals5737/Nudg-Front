<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { 
      Menu, X, User, LogOut, Plus, Edit, Trash, Calendar, ChevronLeft, ChevronRight, 
      BarChart2, BookOpen, Clock, Search, Filter, ArrowRight, Check, AlertCircle, 
      Bookmark, Star, Heart, ThumbsUp, ThumbsDown, Frown, Meh, Smile, Activity, 
      Brain, Lightbulb, RefreshCw, Save, Play, Pause, Award, CheckCircle, XCircle, 
      HelpCircle, Info, MessageCircle, PenTool, Zap, Moon, Sun, Wind, Layers, 
      FileText, List, MoreHorizontal, ChevronDown, ChevronUp, Maximize, Minimize,
      Home, Settings, Bell, CheckSquare, Square, LayoutDashboard, Repeat, Flame,
      PlusCircle, AlarmClock, Sparkles, Clipboard, RotateCcw, Hourglass
    } from 'lucide-svelte';
    import "../app.css";
    
    // 테마 상태
    let darkMode = false;
    
    // 현재 활성화된 페이지
    let activePage = 'home';
    
    // 사용자 정보
    const user = {
      name: "김누지",
      email: "user@example.com",
      avatar: "/src/lib/static/login-logo.svg?height=32&width=32"
    };
    
    // 모바일 메뉴 상태
    let mobileMenuOpen = false;
    
    // 사용자 드롭다운 상태
    let userDropdownOpen = false;
    
    // 현재 날짜 및 선택된 날짜
    const today = new Date();
    let currentDate = new Date(today);
    let selectedDate = new Date(today).toISOString().split('T')[0];
    
    // 모달 상태
    let showAddTaskModal = false;
    let showAddRoutineModal = false;
    let showCbtRecordModal = false;
    let showAddScheduleModal = false;
    
    // 일정 데이터
    let schedules = [
      {
        id: 1,
        date: '2025-03-13',
        tasks: [
          { 
            id: 1, 
            title: '저녁만들기', 
            startTime: '18:00',
            endTime: '19:00',
            progress: 33, 
            steps: [
              { id: 1, title: '재료 준비하기', status: 'in-progress', actualStartTime: '18:05', actualEndTime: '' },
              { id: 2, title: '요리 시작하기', status: 'not-started', actualStartTime: '', actualEndTime: '' },
              { id: 3, title: '식탁 차리기', status: 'not-started', actualStartTime: '', actualEndTime: '' }
            ]
          },
          { 
            id: 2, 
            title: '집가기', 
            startTime: '19:30',
            endTime: '20:30',
            progress: 0, 
            steps: [
              { id: 1, title: '짐 챙기기', status: 'not-started', actualStartTime: '', actualEndTime: '' },
              { id: 2, title: '문 잠그기', status: 'not-started', actualStartTime: '', actualEndTime: '' },
              { id: 3, title: '버스 타기', status: 'not-started', actualStartTime: '', actualEndTime: '' }
            ]
          }
        ]
      },
      {
        id: 2,
        date: '2025-03-14',
        tasks: [
          { 
            id: 3, 
            title: '회의 준비', 
            startTime: '09:00',
            endTime: '10:00',
            progress: 0, 
            steps: [
              { id: 1, title: '자료 정리', status: 'not-started', actualStartTime: '', actualEndTime: '' },
              { id: 2, title: '발표 연습', status: 'not-started', actualStartTime: '', actualEndTime: '' }
            ]
          },
          { 
            id: 4, 
            title: '점심 약속', 
            startTime: '12:00',
            endTime: '13:30',
            progress: 0, 
            steps: [
              { id: 1, title: '식당 예약 확인', status: 'not-started', actualStartTime: '', actualEndTime: '' },
              { id: 2, title: '약속 장소로 이동', status: 'not-started', actualStartTime: '', actualEndTime: '' }
            ]
          }
        ]
      }
    ];
    
    // 루틴 데이터
    let routines = [
      {
        id: 1,
        title: '아침 루틴',
        time: '07:00',
        days: ['mon', 'tue', 'wed', 'thu', 'fri'],
        tasks: [
          { id: 1, title: '물 한 잔 마시기', completed: false },
          { id: 2, title: '스트레칭 5분', completed: false },
          { id: 3, title: '명상 10분', completed: false }
        ],
        reminderText: '아침 루틴을 시작할 시간입니다!',
        completionRate: 80
      },
      {
        id: 2,
        title: '취침 전 루틴',
        time: '22:00',
        days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        tasks: [
          { id: 1, title: '내일 할 일 정리', completed: false },
          { id: 2, title: '스마트폰 끄기', completed: false },
          { id: 3, title: '독서 20분', completed: false },
          { id: 4, title: '감사일기 쓰기', completed: false }
        ],
        reminderText: '건강한 수면을 위한 루틴을 시작하세요!',
        completionRate: 65
      },
      {
        id: 3,
        title: '업무 시작 루틴',
        time: '09:00',
        days: ['mon', 'tue', 'wed', 'thu', 'fri'],
        tasks: [
          { id: 1, title: '이메일 확인', completed: false },
          { id: 2, title: '오늘 할 일 우선순위 정하기', completed: false },
          { id: 3, title: '물 한 잔 준비하기', completed: false }
        ],
        reminderText: '생산적인 하루를 위한 준비를 시작하세요!',
        completionRate: 90
      }
    ];
    
    // CBT 기록 데이터
    let cbtRecords = [
      {
        id: 1,
        date: '2025-03-13',
        time: '14:30',
        location: '사무실',
        emotion: {
          type: 'anxious',
          intensity: 8
        },
        impulse: '업무를 미루고 SNS를 확인하고 싶은 충동',
        coping: '5분 타이머를 설정하고 그 시간 동안만 집중하기로 함',
        success: true,
        notes: '짧은 시간을 정해두니 시작하기가 훨씬 쉬웠다. 5분 후에는 계속 일하고 싶은 마음이 생겼다.'
      },
      {
        id: 2,
        date: '2025-03-12',
        time: '19:15',
        location: '집',
        emotion: {
          type: 'tired',
          intensity: 7
        },
        impulse: '저녁 식사 후 설거지를 미루고 싶은 충동',
        coping: '좋아하는 팟캐스트를 들으며 설거지하기',
        success: true,
        notes: '재미있는 콘텐츠를 들으니 지루한 집안일도 덜 힘들게 느껴졌다.'
      },
      {
        id: 3,
        date: '2025-03-11',
        time: '10:45',
        location: '카페',
        emotion: {
          type: 'frustrated',
          intensity: 6
        },
        impulse: '어려운 업무를 포기하고 다른 일로 전환하고 싶은 충동',
        coping: '5분 휴식 후 문제를 작은 단계로 나누어 접근',
        success: false,
        notes: '작은 단계로 나누었지만 여전히 시작하기 어려웠다. 내일 다시 시도해봐야겠다.'
      }
    ];
    
    // 감정 목록
    const emotions = [
      { id: 'happy', name: '행복', emoji: '😊', color: 'bg-green-100 text-green-700', icon: Smile },
      { id: 'calm', name: '평온', emoji: '😌', color: 'bg-blue-100 text-blue-700', icon: Moon },
      { id: 'excited', name: '신남', emoji: '😃', color: 'bg-yellow-100 text-yellow-700', icon: Zap },
      { id: 'neutral', name: '보통', emoji: '😐', color: 'bg-gray-100 text-gray-700', icon: Meh },
      { id: 'tired', name: '피곤', emoji: '😫', color: 'bg-purple-100 text-purple-700', icon: Wind },
      { id: 'anxious', name: '불안', emoji: '😰', color: 'bg-orange-100 text-orange-700', icon: Activity },
      { id: 'sad', name: '슬픔', emoji: '😢', color: 'bg-indigo-100 text-indigo-700', icon: Frown },
      { id: 'angry', name: '분노', emoji: '😠', color: 'bg-red-100 text-red-700', icon: ThumbsDown },
      { id: 'frustrated', name: '좌절', emoji: '😤', color: 'bg-pink-100 text-pink-700', icon: AlertCircle }
    ];
    
    // 새 일정 데이터
    let newSchedule = {
      title: '',
      startTime: '',
      endTime: '',
      steps: [{ id: 1, title: '', status: 'not-started', actualStartTime: '', actualEndTime: '' }]
    };
    
    // 새 루틴 데이터
    let newRoutine = {
      title: '',
      time: '',
      days: [],
      tasks: [{ id: 1, title: '', completed: false }],
      reminderText: ''
    };
    
    // 새 CBT 기록 데이터
    let newCbtRecord = {
      date: selectedDate,
      time: new Date().toTimeString().slice(0, 5),
      location: '',
      emotion: {
        type: 'neutral',
        intensity: 5
      },
      impulse: '',
      coping: '',
      success: true,
      notes: ''
    };
    
    // 요일 이름
    const weekdays = [
      { id: 'mon', name: '월' },
      { id: 'tue', name: '화' },
      { id: 'wed', name: '수' },
      { id: 'thu', name: '목' },
      { id: 'fri', name: '금' },
      { id: 'sat', name: '토' },
      { id: 'sun', name: '일' }
    ];
    
    // 모바일 메뉴 토글
    function toggleMobileMenu() {
      mobileMenuOpen = !mobileMenuOpen;
    }
    
    // 사용자 드롭다운 토글
    function toggleUserDropdown() {
      userDropdownOpen = !userDropdownOpen;
    }
    
    // 클릭 이벤트 핸들러
    function handleClickOutside(event) {
      const target = event.target;
      if (!target.closest('.user-dropdown') && userDropdownOpen) {
        userDropdownOpen = false;
      }
    }
    
    // 페이지 변경
    function changePage(page) {
      activePage = page;
      mobileMenuOpen = false;
    }
    
    // 테마 토글
    function toggleDarkMode() {
      darkMode = !darkMode;
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    // 날짜 변경
    function changeDate(days) {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + days);
      currentDate = newDate;
      selectedDate = newDate.toISOString().split('T')[0];
    }
    
    // 오늘로 이동
    function goToToday() {
      currentDate = new Date(today);
      selectedDate = today.toISOString().split('T')[0];
    }
    
    // 일정 추가 모달 열기
    function openAddScheduleModal() {
      newSchedule = {
        title: '',
        startTime: '',
        endTime: '',
        steps: [{ id: 1, title: '', status: 'not-started', actualStartTime: '', actualEndTime: '' }]
      };
      showAddScheduleModal = true;
    }
    
    // 루틴 추가 모달 열기
    function openAddRoutineModal() {
      newRoutine = {
        title: '',
        time: '',
        days: [],
        tasks: [{ id: 1, title: '', completed: false }],
        reminderText: ''
      };
      showAddRoutineModal = true;
    }
    
    // CBT 기록 모달 열기
    function openCbtRecordModal() {
      newCbtRecord = {
        date: selectedDate,
        time: new Date().toTimeString().slice(0, 5),
        location: '',
        emotion: {
          type: 'neutral',
          intensity: 5
        },
        impulse: '',
        coping: '',
        success: true,
        notes: ''
      };
      showCbtRecordModal = true;
    }
    
    // 일정 추가
    function addSchedule() {
      if (!newSchedule.title || !newSchedule.startTime || !newSchedule.endTime) return;
      
      // 유효한 단계만 필터링
      const validSteps = newSchedule.steps.filter(step => step.title.trim() !== '');
      
      if (validSteps.length === 0) {
        validSteps.push({ id: 1, title: '완료하기', status: 'not-started', actualStartTime: '', actualEndTime: '' });
      }
      
      const existingScheduleIndex = schedules.findIndex(s => s.date === selectedDate);
      
      if (existingScheduleIndex !== -1) {
        // 기존 날짜에 일정 추가
        const newId = Math.max(0, ...schedules[existingScheduleIndex].tasks.map(t => t.id)) + 1;
        
        schedules[existingScheduleIndex].tasks.push({
          id: newId,
          title: newSchedule.title,
          startTime: newSchedule.startTime,
          endTime: newSchedule.endTime,
          progress: 0,
          steps: validSteps.map((step, index) => ({
            ...step,
            id: index + 1
          }))
        });
        
        schedules = [...schedules];
      } else {
        // 새 날짜에 일정 추가
        const newId = Math.max(0, ...schedules.map(s => s.id)) + 1;
        
        schedules = [
          ...schedules,
          {
            id: newId,
            date: selectedDate,
            tasks: [{
              id: 1,
              title: newSchedule.title,
              startTime: newSchedule.startTime,
              endTime: newSchedule.endTime,
              progress: 0,
              steps: validSteps.map((step, index) => ({
                ...step,
                id: index + 1
              }))
            }]
          }
        ];
      }
      
      showAddScheduleModal = false;
    }
    
    // 루틴 추가
    function addRoutine() {
      if (!newRoutine.title || !newRoutine.time || newRoutine.days.length === 0) return;
      
      // 유효한 작업만 필터링
      const validTasks = newRoutine.tasks.filter(task => task.title.trim() !== '');
      
      if (validTasks.length === 0) {
        validTasks.push({ id: 1, title: '완료하기', completed: false });
      }
      
      const newId = Math.max(0, ...routines.map(r => r.id)) + 1;
      
      routines = [
        ...routines,
        {
          id: newId,
          title: newRoutine.title,
          time: newRoutine.time,
          days: [...newRoutine.days],
          tasks: validTasks.map((task, index) => ({
            ...task,
            id: index + 1
          })),
          reminderText: newRoutine.reminderText || `${newRoutine.title} 시간입니다!`,
          completionRate: 0
        }
      ];
      
      showAddRoutineModal = false;
    }
    
    // CBT 기록 추가
    function addCbtRecord() {
      if (!newCbtRecord.location || !newCbtRecord.impulse || !newCbtRecord.coping) return;
      
      const newId = Math.max(0, ...cbtRecords.map(r => r.id)) + 1;
      
      cbtRecords = [
        {
          ...newCbtRecord,
          id: newId
        },
        ...cbtRecords
      ];
      
      showCbtRecordModal = false;
    }
    
    // 일정 단계 추가
    function addScheduleStep() {
      const newId = Math.max(0, ...newSchedule.steps.map(s => s.id)) + 1;
      newSchedule.steps = [...newSchedule.steps, { id: newId, title: '', status: 'not-started', actualStartTime: '', actualEndTime: '' }];
    }
    
    // 루틴 작업 추가
    function addRoutineTask() {
      const newId = Math.max(0, ...newRoutine.tasks.map(t => t.id)) + 1;
      newRoutine.tasks = [...newRoutine.tasks, { id: newId, title: '', completed: false }];
    }
    
    // 요일 토글
    function toggleDay(day) {
      if (newRoutine.days.includes(day)) {
        newRoutine.days = newRoutine.days.filter(d => d !== day);
      } else {
        newRoutine.days = [...newRoutine.days, day];
      }
    }
    
    // 감정 선택
    function selectEmotion(emotionId) {
      newCbtRecord.emotion.type = emotionId;
    }
    
    // 감정 아이콘 가져오기
    function getEmotionIcon(emotionId) {
      const emotion = emotions.find(e => e.id === emotionId);
      return emotion ? emotion.icon : Meh;
    }
    
    // 감정 색상 가져오기
    function getEmotionColor(emotionId) {
      const emotion = emotions.find(e => e.id === emotionId);
      return emotion ? emotion.color : 'bg-gray-100 text-gray-700';
    }
    
    // 감정 이름 가져오기
    function getEmotionName(emotionId) {
      const emotion = emotions.find(e => e.id === emotionId);
      return emotion ? emotion.name : '보통';
    }
    
    // 감정 이모지 가져오기
    function getEmotionEmoji(emotionId) {
      const emotion = emotions.find(e => e.id === emotionId);
      return emotion ? emotion.emoji : '😐';
    }
    
    // 날짜 포맷팅
    function formatDate(dateString, includeYear = true) {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
      
      return includeYear 
        ? `${year}년 ${month}월 ${day}일 (${weekday})` 
        : `${month}월 ${day}일 (${weekday})`;
    }
    
    // 선택된 날짜의 일정 가져오기
    $: selectedDateSchedule = schedules.find(s => s.date === selectedDate);
    
    // 오늘의 루틴 가져오기
    $: {
      const todayWeekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()];
      const todayRoutines = routines.filter(r => r.days.includes(todayWeekday));
    }
    
    // 컴포넌트 마운트 시 실행
    onMount(() => {
      // 사용자 테마 설정 확인
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      darkMode = prefersDarkMode;
      
      if (darkMode) {
        document.documentElement.classList.add('dark');
      }
    });
  </script>
  
  <svelte:window on:click={handleClickOutside} />
  
  <div class={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-[#F8FAFE] text-gray-900'}`}>
    <!-- 헤더 -->
    <header class={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm sticky top-0 z-10`}>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <a href="#" class="text-blue-600 dark:text-blue-400 font-bold text-2xl">nudg</a>
            </div>
                        
            <nav class="hidden sm:ml-8 sm:flex sm:space-x-8">
              <button 
                on:click={() => changePage('home')}
                class={`inline-flex items-center px-1 pt-1 border-b-2 ${activePage === 'home' ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'} text-sm font-medium`}
              >
                홈
              </button>
              <button 
                on:click={() => changePage('planner')}
                class={`inline-flex items-center px-1 pt-1 border-b-2 ${activePage === 'planner' ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'} text-sm font-medium`}
              >
                하루 일정 관리
              </button>
              <button 
                on:click={() => changePage('cbt')}
                class={`inline-flex items-center px-1 pt-1 border-b-2 ${activePage === 'cbt' ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'} text-sm font-medium`}
              >
                CBT 기록
              </button>
              <button 
                on:click={() => changePage('routine')}
                class={`inline-flex items-center px-1 pt-1 border-b-2 ${activePage === 'routine' ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'} text-sm font-medium`}
              >
                루틴 관리
              </button>
              <button 
                on:click={() => changePage('insights')}
                class={`inline-flex items-center px-1 pt-1 border-b-2 ${activePage === 'insights' ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'} text-sm font-medium`}
              >
                기록 보기
              </button>
            </nav>
          </div>
          
          <div class="flex items-center">
            <button 
              on:click={toggleDarkMode}
              class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none mr-2"
            >
              {#if darkMode}
                <Sun size={20} />
              {:else}
                <Moon size={20} />
              {/if}
            </button>
            
            <div class="sm:hidden -mr-2 flex items-center">
              <button 
                type="button" 
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                on:click={toggleMobileMenu}
              >
                {#if mobileMenuOpen}
                  <X size={24} />
                {:else}
                  <Menu size={24} />
                {/if}
              </button>
            </div>
            
            <div class="hidden sm:ml-6 sm:flex sm:items-center user-dropdown relative">
              <button 
                type="button" 
                class="flex text-sm rounded-full focus:outline-none"
                on:click={toggleUserDropdown}
              >
                <div class="flex items-center">
                  <img 
                    class="h-8 w-8 rounded-full" 
                    src={user.avatar || "/placeholder.svg?height=32&width=32"} 
                    alt={user.name} 
                  />
                  <span class="ml-2 text-gray-700 dark:text-gray-300">{user.name}</span>
                </div>
              </button>
              
              {#if userDropdownOpen}
                <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <User size={16} class="mr-2" />
                    프로필
                  </a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <Settings size={16} class="mr-2" />
                    설정
                  </a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <LogOut size={16} class="mr-2" />
                    로그아웃
                  </a>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
      
      {#if mobileMenuOpen}
        <div class="sm:hidden">
          <div class="pt-2 pb-3 space-y-1">
            <button 
              on:click={() => changePage('home')}
              class={`block pl-3 pr-4 py-2 ${activePage === 'home' ? 'bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-l-4 border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'} text-base font-medium`}
            >
              홈
            </button>
            <button 
              on:click={() => changePage('planner')}
              class={`block pl-3 pr-4 py-2 ${activePage === 'planner' ? 'bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-l-4 border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'} text-base font-medium`}
            >
              하루 일정 관리
            </button>
            <button 
              on:click={() => changePage('cbt')}
              class={`block pl-3 pr-4 py-2 ${activePage === 'cbt' ? 'bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-l-4 border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'} text-base font-medium`}
            >
              CBT 기록
            </button>
            <button 
              on:click={() => changePage('routine')}
              class={`block pl-3 pr-4 py-2 ${activePage === 'routine' ? 'bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-l-4 border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'} text-base font-medium`}
            >
              루틴 관리
            </button>
            <button 
              on:click={() => changePage('insights')}
              class={`block pl-3 pr-4 py-2 ${activePage === 'insights' ? 'bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-l-4 border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'} text-base font-medium`}
            >
              기록 보기
            </button>
          </div>
          <div class="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center px-4">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" src={user.avatar || "/placeholder.svg?height=32&width=32"} alt={user.name} />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800 dark:text-gray-200">{user.name}</div>
                <div class="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
              </div>
              <button 
                on:click={toggleDarkMode}
                class="ml-auto p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                {#if darkMode}
                  <Sun size={20} />
                {:else}
                  <Moon size={20} />
                {/if}
              </button>
            </div>
            <div class="mt-3 space-y-1">
              <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                프로필
              </a>
              <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                설정
              </a>
              <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                로그아웃
              </a>
            </div>
          </div>
        </div>
      {/if}
    </header>
  
    <!-- 메인 콘텐츠 -->
    <main class="flex items-center flex-col py-6">
      <div class="w-full max-w-[1200px] px-4">
        <!-- 홈 페이지 -->
        {#if activePage === 'home'}
          <div class="space-y-6">
            <!-- 환영 메시지 -->
            <div class={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
              <div class="flex items-center justify-between mb-4">
                <h1 class="text-2xl font-bold">{formatDate(selectedDate)}</h1>
                <div class="flex items-center gap-2">
                  <button 
                    on:click={() => changeDate(-1)}
                    class={`p-1.5 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    on:click={goToToday}
                    class="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-md text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    오늘
                  </button>
                  <button 
                    on:click={() => changeDate(1)}
                    class={`p-1.5 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              
              <div class="flex flex-col md:flex-row gap-6">
                <div class="flex-1">
                  <h2 class="text-lg font-medium mb-3 flex items-center gap-2">
                    <Calendar size={18} class="text-blue-600 dark:text-blue-400" />
                    오늘의 일정
                  </h2>
                  
                  {#if selectedDateSchedule && selectedDateSchedule.tasks.length > 0}
                    <div class="space-y-3">
                      {#each selectedDateSchedule.tasks.slice(0, 3) as task}
                        <div class={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} p-3 rounded-lg cursor-pointer transition-colors`}>
                          <div class="flex justify-between items-center mb-1">
                            <div class="font-medium">{task.title}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{task.startTime} - {task.endTime}</div>
                          </div>
                          <div class="flex items-center gap-2 text-sm">
                            <div class="flex-1">
                              <div class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                <div 
                                  class="h-full bg-blue-600 dark:bg-blue-500 rounded-full" 
                                  style="width: {task.progress}%"
                                ></div>
                              </div>
                            </div>
                            <span class="text-gray-500 dark:text-gray-400">{task.progress}%</span>
                          </div>
                        </div>
                      {/each}
                      
                      {#if selectedDateSchedule.tasks.length > 3}
                        <button 
                          on:click={() => changePage('planner')}
                          class="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center gap-1"
                        >
                          더 보기 ({selectedDateSchedule.tasks.length - 3}개 더)
                          <ArrowRight size={14} />
                        </button>
                      {/if}
                    </div>
                  {:else}
                    <div class={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                      <p class="text-gray-500 dark:text-gray-400 mb-2">오늘 예정된 일정이 없습니다</p>
                      <button 
                        on:click={openAddScheduleModal}
                        class="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-md text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 inline-flex items-center gap-1"
                      >
                        <Plus size={14} />
                        일정 추가하기
                      </button>
                    </div>
                  {/if}
                </div>
                
                <div class="flex-1">
                  <h2 class="text-lg font-medium mb-3 flex items-center gap-2">
                    <Repeat size={18} class="text-green-600 dark:text-green-400" />
                    오늘의 루틴
                  </h2>
                  
                  {#if routines.length > 0}
                    <div class="space-y-3">
                      {#each routines.slice(0, 3) as routine}
                        <div class={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} p-3 rounded-lg cursor-pointer transition-colors`}>
                          <div class="flex justify-between items-center mb-1">
                            <div class="font-medium">{routine.title}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{routine.time}</div>
                          </div>
                          <div class="flex items-center gap-2 text-sm">
                            <div class="flex-1">
                              <div class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                <div 
                                  class="h-full bg-green-600 dark:bg-green-500 rounded-full" 
                                  style="width: {routine.completionRate}%"
                                ></div>
                              </div>
                            </div>
                            <span class="text-gray-500 dark:text-gray-400">{routine.completionRate}%</span>
                          </div>
                        </div>
                      {/each}
                      
                      {#if routines.length > 3}
                        <button 
                          on:click={() => changePage('routine')}
                          class="text-green-600 dark:text-green-400 text-sm hover:underline flex items-center gap-1"
                        >
                          더 보기 ({routines.length - 3}개 더)
                          <ArrowRight size={14} />
                        </button>
                      {/if}
                    </div>
                  {:else}
                    <div class={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                      <p class="text-gray-500 dark:text-gray-400 mb-2">설정된 루틴이 없습니다</p>
                      <button 
                        on:click={openAddRoutineModal}
                        class="px-3 py-1.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-md text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 inline-flex items-center gap-1"
                      >
                        <Plus size={14} />
                        루틴 추가하기
                      </button>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
            
            <!-- 빠른 액션 버튼 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                on:click={openAddScheduleModal}
                class={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg shadow-sm p-6 flex flex-col items-center text-center transition-colors`}
              >
                <div class="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mb-3">
                  <Calendar size={24} />
                </div>
                <h3 class="font-medium mb-1">일정 추가하기</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">오늘의 일정을 계획하고 관리하세요</p>
              </button>
              
              <button 
                on:click={openCbtRecordModal}
                class={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg shadow-sm p-6 flex flex-col items-center text-center transition-colors`}
              >
                <div class="p-3 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full mb-3">
                  <Brain size={24} />
                </div>
                <h3 class="font-medium mb-1">지금 기록하기</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">충동이나 감정 상태를 기록하세요</p>
              </button>
              
              <button 
                on:click={openAddRoutineModal}
                class={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg shadow-sm p-6 flex flex-col items-center text-center transition-colors`}
              >
                <div class="p-3 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full mb-3">
                  <Repeat size={24} />
                </div>
                <h3 class="font-medium mb-1">루틴 만들기</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">반복적인 습관을 설정하고 관리하세요</p>
              </button>
            </div>
            
            <!-- 최근 CBT 기록 -->
            <div class={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-medium flex items-center gap-2">
                  <Brain size={18} class="text-purple-600 dark:text-purple-400" />
                  최근 CBT 기록
                </h2>
                <button 
                  on:click={() => changePage('cbt')}
                  class="text-purple-600 dark:text-purple-400 text-sm hover:underline flex items-center gap-1"
                >
                  모두 보기
                  <ArrowRight size={14} />
                </button>
              </div>
              
              {#if cbtRecords.length > 0}
                <div class="space-y-4">
                  {#each cbtRecords.slice(0, 3) as record}
                    <div class={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <div class="flex justify-between items-start mb-2">
                        <div class="flex items-center gap-2">
                          <div class={`p-2 rounded-full ${getEmotionColor(record.emotion.type)}`}>
                            <svelte:component this={getEmotionIcon(record.emotion.type)} size={18} />
                          </div>
                          <div>
                            <div class="font-medium">{getEmotionName(record.emotion.type)}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{record.date} {record.time}</div>
                          </div>
                        </div>
                        <div class={`px-2 py-1 rounded-full text-xs ${record.success ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'}`}>
                          {record.success ? '성공' : '실패'}
                        </div>
                      </div>
                      <p class="text-sm mb-2">{record.impulse}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">대처: {record.coping}</p>
                    </div>
                  {/each}
                </div>
              {:else}
                <div class={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                  <p class="text-gray-500 dark:text-gray-400 mb-2">기록된 CBT 데이터가 없습니다</p>
                  <button 
                    on:click={openCbtRecordModal}
                    class="px-3 py-1.5 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-md text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800 inline-flex items-center gap-1"
                  >
                    <Plus size={14} />
                    CBT 기록하기
                  </button>
                </div>
              {/if}
            </div>
          </div>
        
        <!-- 하루 일정 관리 페이지 -->
        {:else if activePage === 'planner'}
          <div class={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <span class="h-5 border-l-2 border-blue-600 dark:border-blue-400 mr-2"></span>
                <h1 class="font-semibold">하루 일정 관리</h1>
              </div>
              <button 
                on:click={openAddScheduleModal}
                class="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 hover:underline"
              >
                <Plus size={16} />
                새 일정 추가
              </button>
            </div>
            
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-medium">{formatDate(selectedDate)}</h2>
              <div class="flex items-center gap-2">
                <button 
                  on:click={() => changeDate(-1)}
                  class={`p-1.5 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  on:click={goToToday}
                  class="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-md text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  오늘
                </button>
                <button 
                  on:click={() => changeDate(1)}
                  class={`p-1.5 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            {#if selectedDateSchedule && selectedDateSchedule.tasks.length > 0}
              <div class="space-y-4">
                {#each selectedDateSchedule.tasks as task}
                  <div class={`border ${darkMode ? 'border-gray-700' : 'border-gray-100'} rounded-lg overflow-hidden`}>
                    <div class={`${darkMode ? 'bg-blue-900' : 'bg-blue-50'} text-blue-600 dark:text-blue-400 p-4`}>
                      <div class="flex justify-between items-center">
                        <div class="flex items-center gap-3">
                          <span class="font-medium text-lg">{task.title}</span>
                        </div>
                        
                        <div class="flex items-center gap-4">
                          <span class="text-sm">{task.startTime} - {task.endTime}</span>
                          {#if task.progress > 0}
                            <div class="flex items-center gap-2">
                              <span>
                                진행률: <span class="font-bold text-blue-600 dark:text-blue-400">{task.progress}%</span>
                              </span>
                              <div class="w-24 h-2 bg-blue-100 dark:bg-blue-800 rounded-full overflow-hidden">
                                <div class="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style="width: {task.progress}%"></div>
                              </div>
                            </div>
                          {:else}
                            <span class="text-gray-500 dark:text-gray-400">
                              <span class="font-medium">0</span>/{task.steps.length}
                            </span>
                          {/if}
                        </div>
                      </div>
                    </div>
                    
                    <div class={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                      {#each task.steps as step}
                        <div class={`p-4 flex items-center justify-between ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <div class="flex items-center gap-3">
                            {#if step.status === "completed"}
                              <CheckCircle class="text-green-500" size={18} />
                            {:else if step.status === "in-progress"}
                              <Circle class="text-blue-500 fill-blue-100 dark:fill-blue-900" size={18} />
                            {:else}
                              <Circle class="text-gray-300 dark:text-gray-600" size={18} />
                            {/if}
                            
                            <div class="flex items-center gap-2">
                              <span class="text-gray-500 dark:text-gray-400 font-medium">step{step.id}</span>
                              <span class="font-medium">{step.title}</span>
                            </div>
                          </div>
                          
                          <div class="flex items-center gap-3">
                            {#if step.actualStartTime}
                              <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-md text-sm">
                                <Clock size={14} />
                                <span>{step.actualStartTime} {step.actualEndTime ? `- ${step.actualEndTime}` : ''}</span>
                              </div>
                            {/if}
                            
                            {#if step.status === "completed"}
                              <span class="px-3 py-1.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-md text-sm font-medium">완료</span>
                            {:else if step.status === "in-progress"}
                              <span class="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-md text-sm font-medium">진행중</span>
                            {:else}
                              <span class="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md text-sm font-medium">미실시</span>
                            {/if}
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/each}
              </div>
            {:else}
              <div class={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-8 rounded-lg text-center`}>
                <p class="text-gray-500 dark:text-gray-400 mb-4">이 날짜에 예정된 일정이 없습니다</p>
                <button 
                  on:click={openAddScheduleModal}
                  class="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-md text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 inline-flex items-center gap-2"
                >
                  <Plus size={16} />
                  일정 추가하기
                </button>
              </div>
            {/if}
          </div>
        
        <!-- CBT 기록 페이지 -->
        {:else if activePage === 'cbt'}
          <div class={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <span class="h-5 border-l-2 border-purple-600 dark:border-purple-400 mr-2"></span>
                <h1 class="font-semibold">CBT 기록</h1>
              </div>
              <button 
                on:click={openCbtRecordModal}
                class="text-purple-600 dark:text-purple-400 text-sm font-medium flex items-center gap-1 hover:underline"
              >
                <Plus size={16} />
                지금 기록하기
              </button>
            </div>
            
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-medium">CBT 기록 목록</h2>
              <div class="flex items-center gap-2">
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} class="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="검색..." 
                    class={`pl-10 pr-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md text-sm`}
                  />
                </div>
                <div class="relative">
                  <select 
                    class={`pl-3 pr-8 py-2 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md text-sm appearance-none`}
                  >
                    <option value="all">모든 감정</option>
                    {#each emotions as emotion}
                      <option value={emotion.id}>{emotion.name}</option>
                    {/each}
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown size={16} class="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {#if cbtRecords.length > 0}
              <div class="space-y-4">
                {#each cbtRecords as record}
                  <div class={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                    <div class="flex justify-between items-start mb-3">
                      <div class="flex items-center gap-3">
                        <div class={`p-2 rounded-full ${getEmotionColor(record.emotion.type)}`}>
                          <svelte:component this={getEmotionIcon(record.emotion.type)} size={20} />
                        </div>
                        <div>
                          <div class="flex items-center gap-2">
                            <span class="font-medium">{getEmotionName(record.emotion.type)}</span>
                            <span class="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded-full">{record.emotion.intensity}/10</span>
                          </div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">{record.date} {record.time} · {record.location}</div>
                        </div>
                      </div>
                      <div class={`px-2 py-1 rounded-full text-xs ${record.success ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'}`}>
                        {record.success ? '성공' : '실패'}
                      </div>
                    </div>
                    
                    <div class="space-y-2 mb-3">
                      <div>
                        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">충동 내용</h3>
                        <p>{record.impulse}</p>
                      </div>
                      <div>
                        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">대처 방법</h3>
                        <p>{record.coping}</p>
                      </div>
                      {#if record.notes}
                        <div>
                          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">메모/느낌</h3>
                          <p class="text-sm">{record.notes}</p>
                        </div>
                      {/if}
                    </div>
                    
                    <div class="flex justify-end gap-2">
                      <button class={`p-1.5 rounded-md ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} text-gray-500 dark:text-gray-400`}>
                        <Edit size={16} />
                      </button>
                      <button class={`p-1.5 rounded-md ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} text-gray-500 dark:text-gray-400`}>
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                {/each}
              </div>
            {:else}
              <div class={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-8 rounded-lg text-center`}>
                <p class="text-gray-500 dark:text-gray-400 mb-4">기록된 CBT 데이터가 없습니다</p>
                <button 
                  on:click={openCbtRecordModal}
                  class="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-md text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800 inline-flex items-center gap-2"
                >
                  <Plus size={16} />
                  CBT 기록하기
                </button>
              </div>
            {/if}
          </div>
        
        <!-- 루틴 관리 페이지 -->
        {:else if activePage === 'routine'}
          <div class={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <span class="h-5 border-l-2 border-green-600 dark:border-green-400 mr-2"></span>
                <h1 class="font-semibold">루틴 관리</h1>
              </div>
              <button 
                on:click={openAddRoutineModal}
                class="text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-1 hover:underline"
              >
                <Plus size={16} />
                새 루틴 추가
              </button>
            </div>
            
            {#if routines.length > 0}
              <div class="space-y-6">
                {#each routines as routine}
                  <div class={`border ${darkMode ? 'border-gray-700' : 'border-gray-100'} rounded-lg overflow-hidden`}>
                    <div class={`${darkMode ? 'bg-green-900' : 'bg-green-50'} text-green-600 dark:text-green-400 p-4`}>
                      <div class="flex justify-between items-center">
                        <div class="flex items-center gap-3">
                          <span class="font-medium text-lg">{routine.title}</span>
                          <span class="text-sm bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 px-2 py-0.5 rounded-full">{routine.time}</span>
                        </div>
                        
                        <div class="flex items-center gap-4">
                          <div class="flex items-center gap-1">
                            {#each weekdays as day}
                              <span class={`w-6 h-6 flex items-center justify-center text-xs rounded-full ${routine.days.includes(day.id) ? 'bg-green-600 dark:bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                                {day.name}
                              </span>
                            {/each}
                          </div>
                          
                          <div class="flex items-center gap-2">
                            <span>
                              완료율: <span class="font-bold text-green-600 dark:text-green-400">{routine.completionRate}%</span>
                            </span>
                            <div class="w-24 h-2 bg-green-100 dark:bg-green-800 rounded-full overflow-hidden">
                              <div class="h-full bg-green-600 dark:bg-green-500 rounded-full" style="width: {routine.completionRate}%"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                      {#each routine.tasks as task}
                        <div class={`p-4 flex items-center justify-between ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <div class="flex items-center gap-3">
                            <button class="focus:outline-none">
                              {#if task.completed}
                                <CheckSquare size={18} class="text-green-500" />
                              {:else}
                                <Square size={18} class="text-gray-300 dark:text-gray-600" />
                              {/if}
                            </button>
                            <span class="font-medium">{task.title}</span>
                          </div>
                        </div>
                      {/each}
                    </div>
                    
                    <div class={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <div class="flex items-center gap-2">
                        <Bell size={16} class="text-yellow-500" />
                        <span class="text-sm text-gray-500 dark:text-gray-400">알림 메시지: {routine.reminderText}</span>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            {:else}
              <div class={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-8 rounded-lg text-center`}>
                <p class="text-gray-500 dark:text-gray-400 mb-4">설정된 루틴이 없습니다</p>
                <button 
                  on:click={openAddRoutineModal}
                  class="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-md text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 inline-flex items-center gap-2"
                >
                  <Plus size={16} />
                  루틴 추가하기
                </button>
              </div>
            {/if}
          </div>
        
        <!-- 기록 보기 페이지 -->
        {:else if activePage === 'insights'}
          <div class={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <span class="h-5 border-l-2 border-yellow-600 dark:border-yellow-400 mr-2"></span>
                <h1 class="font-semibold">기록 보기</h1>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- 루틴 성공률 그래프 -->
              <div class={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                <h2 class="text-lg font-medium mb-3 flex items-center gap-2">
                  <BarChart2 size={18} class="text-green-600 dark:text-green-400" />
                  루틴 성공률
                </h2>
                
                <div class="h-64 flex items-center justify-center">
                  <p class="text-gray-500 dark:text-gray-400">그래프 영역 (실제 구현 시 차트 라이브러리 사용)</p>
                </div>
              </div>
              
              <!-- 충동 발생 시각 분포 -->
              <div class={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                <h2 class="text-lg font-medium mb-3 flex items-center gap-2">
                  <Clock size={18} class="text-purple-600 dark:text-purple-400" />
                  충동 발생 시각 분포
                </h2>
                
                <div class="h-64 flex items-center justify-center">
                  <p class="text-gray-500 dark:text-gray-400">히트맵 영역 (실제 구현 시 차트 라이브러리 사용)</p>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- 자주 쓰는 대처법 TOP3 -->
              <div class={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                <h2 class="text-lg font-medium mb-3 flex items-center gap-2">
                  <Award size={18} class="text-yellow-600 dark:text-yellow-400" />
                  자주 쓰는 대처법 TOP3
                </h2>
                
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 flex items-center justify-center font-bold">1</div>
                    <div class="flex-1">
                      <div class="font-medium">5분 타이머 설정하기</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">7회 사용</div>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 flex items-center justify-center font-bold">2</div>
                    <div class="flex-1">
                      <div class="font-medium">좋아하는 콘텐츠 들으며 작업하기</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">5회 사용</div>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">3</div>
                    <div class="flex-1">
                      <div class="font-medium">작은 단계로 나누어 접근하기</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">3회 사용</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- CBT 기록 타임라인 -->
              <div class={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                <h2 class="text-lg font-medium mb-3 flex items-center gap-2">
                  <Activity size={18} class="text-blue-600 dark:text-blue-400" />
                  감정 변화 추적
                </h2>
                
                <div class="h-64 flex items-center justify-center">
                  <p class="text-gray-500 dark:text-gray-400">타임라인 영역 (실제 구현 시 차트 라이브러리 사용)</p>
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </main>
  </div>
  
  <!-- 일정 추가 모달 -->
  {#if showAddScheduleModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-md w-full`}>
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium">일정 추가</h2>
            <button 
              on:click={() => showAddScheduleModal = false}
              class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
            >
              <X size={20} />
            </button>
          </div>
          
          <form on:submit|preventDefault={addSchedule} class="space-y-4">
            <div>
              <label for="schedule-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">일정 제목</label>
              <input 
                id="schedule-title" 
                type="text" 
                bind:value={newSchedule.title}
                required
                placeholder="예: 프로젝트 회의"
                class={`block w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="schedule-start-time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">시작 시간</label>
                <input 
                  id="schedule-start-time" 
                  type="time" 
                  bind:value={newSchedule.startTime}
                  required
                  class={`block w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
              </div>
              
              <div>
                <label for="schedule-end-time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">종료 시간</label>
                <input 
                  id="schedule-end-time" 
                  type="time" 
                  bind:value={newSchedule.endTime}
                  required
                  class={`block w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">세부 단계</label>
              <div class="space-y-2">
                {#each newSchedule.steps as step, index}
                  <div class="flex items-center gap-2">
                    <input 
                      type="text" 
                      bind:value={step.title}
                      placeholder={`단계 ${index + 1}`}
                      class={`block flex-1 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    />
                    {#if index === newSchedule.steps.length - 1}
                      <button 
                        type="button"
                        on:click={addScheduleStep}
                        class="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800"
                      >
                        <Plus size={16} />
                      </button>
                    {:else}
                      <button 
                        type="button"
                        on:click={() => newSchedule.steps = newSchedule.steps.filter((_, i) => i !== index)}
                        class="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-800"
                      >
                        <Trash size={16} />
                      </button>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
            
            <div class="flex justify-end gap-3 pt-4">
              <button 
                type="button"
                on:click={() => showAddScheduleModal = false}
                class={`py-2 px-4 border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                취소
              </button>
              <button 
                type="submit"
                class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                추가
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- 루틴 추가 모달 -->
  {#if showAddRoutineModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-md w-full`}>
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium">루틴 추가</h2>
            <button 
              on:click={() => showAddRoutineModal = false}
              class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
            >
              <X size={20} />
            </button>
          </div>
          
          <form on:submit|preventDefault={addRoutine} class="space-y-4">
            <div>
              <label for="routine-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">루틴 제목</label>
              <input 
                id="routine-title" 
                type="text" 
                bind:value={newRoutine.title}
                required
                placeholder="예: 아침 루틴"
                class={`block w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
              />
            </div>
            
            <div>
              <label for="routine-time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">시간</label>
              <input 
                id="routine-time" 
                type="time" 
                bind:value={newRoutine.time}
                required
                class={`block w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">반복 요일</label>
              <div class="flex flex-wrap gap-2">
                {#each weekdays as day}
                  <button 
                    type="button"
                    on:click={() => toggleDay(day.id)}
                    class={`w-10 h-10 flex items-center justify-center rounded-full ${newRoutine.days.includes(day.id) ? 'bg-green-600 dark:bg-green-500 text-white' : `border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}`}
                  >
                    {day.name}
                  </button>
                {/each}
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">루틴 작업</label>
              <div class="space-y-2">
                {#each newRoutine.tasks as task, index}
                  <div class="flex items-center gap-2">
                    <input 
                      type="text" 
                      bind:value={task.title}
                      placeholder={`작업 ${index + 1}`}
                      class={`block flex-1 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                    />
                    {#if index === newRoutine.tasks.length - 1}
                      <button 
                        type="button"
                        on:click={addRoutineTask}
                        class="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-md hover:bg-green-200 dark:hover:bg-green-800"
                      >
                        <Plus size={16} />
                      </button>
                    {:else}
                      <button 
                        type="button"
                        on:click={() => newRoutine.tasks = newRoutine.tasks.filter((_, i) => i !== index)}
                        class="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-800"
                      >
                        <Trash size={16} />
                      </button>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
            
            <div>
              <label for="routine-reminder" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">알림 메시지</label>
              <input 
                id="routine-reminder" 
                type="text" 
                bind:value={newRoutine.reminderText}
                placeholder="예: 아침 루틴을 시작할 시간입니다!"
                class={`block w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
              />
            </div>
            
            <div class="flex justify-end gap-3 pt-4">
              <button 
                type="button"
                on:click={() => showAddRoutineModal = false}
                class={`py-2 px-4 border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                취소
              </button>
              <button 
                type="submit"
                class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                추가
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- CBT 기록 모달 -->
  {#if showCbtRecordModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-md w-full`}>
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium">충동/감정 기록하기</h2>
            <button 
              on:click={() => showCbtRecordModal = false}
              class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
            >
              <X size={20} />
            </button>
          </div>
          
          <form on:submit|preventDefault={addCbtRecord} class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="cbt-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">날짜</label>
                <input 
                  id="cbt-date" 
                  type="date" 
                  bind:value={newCbtRecord.date}
                  class={`block w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                />
              </div>
              
              <div>
                <label for="cbt-time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">시간</label>
                <input 
                  id="cbt-time" 
                  type="time" 
                  bind:value={newCbtRecord.time}
                  class={`block w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                />
              </div>
            </div>
            
            <div>
              <label for="cbt-location" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">장소</label>
              <input 
                id="cbt-location" 
                type="text" 
                bind:value={newCbtRecord.location}
                required
                placeholder="예: 사무실, 집, 카페 등"
                class={`block w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">감정 상태</label>
              <div class="grid grid-cols-3 gap-2 mb-2">
                {#each emotions as emotion}
                  <button 
                    type="button"
                    on:click={() => selectEmotion(emotion.id)}
                    class={`flex flex-col items-center p-2 rounded-md border ${newCbtRecord.emotion.type === emotion.id ? `${getEmotionColor(emotion.id)} border-transparent` : `${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}`}
                  >
                    <span class="text-2xl">{emotion.emoji}</span>
                    <span class="text-xs mt-1">{emotion.name}</span>
                  </button>
                {/each}
              </div>
              
              <div class="flex items-center gap-3">
                <span class="text-sm">약함</span>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  bind:value={newCbtRecord.emotion.intensity}
                  class="flex-1"
                />
                <span class="text-sm">강함</span>
                <span class="ml-2 font-medium">{newCbtRecord.emotion.intensity}</span>
              </div>
            </div>
            
            <div>
              <label for="cbt-impulse" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">충동 내용</label>
              <textarea 
                id="cbt-impulse" 
                bind:value={newCbtRecord.impulse}
                required
                placeholder="어떤 충동이 들었나요?"
                rows="3"
                class={`block w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              ></textarea>
            </div>
            
            <div>
              <label for="cbt-coping" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">대처 방법</label>
              <textarea 
                id="cbt-coping" 
                bind:value={newCbtRecord.coping}
                required
                placeholder="어떻게 대처했나요?"
                rows="3"
                class={`block w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              ></textarea>
            </div>
            
            <div>
              <div class="flex items-center gap-2 mb-1">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">대처 성공 여부</label>
                <div class="flex items-center gap-2">
                  <button 
                    type="button"
                    on:click={() => newCbtRecord.success = true}
                    class={`px-3 py-1 rounded-full text-xs ${newCbtRecord.success ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
                  >
                    성공
                  </button>
                  <button 
                    type="button"
                    on:click={() => newCbtRecord.success = false}
                    class={`px-3 py-1 rounded-full text-xs ${!newCbtRecord.success ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
                  >
                    실패
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label for="cbt-notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">메모/느낌</label>
              <textarea 
                id="cbt-notes" 
                bind:value={newCbtRecord.notes}
                placeholder="추가로 기록하고 싶은 내용이 있나요?"
                rows="2"
                class={`block w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              ></textarea>
            </div>
            
            <div class="flex justify-end gap-3 pt-4">
              <button 
                type="button"
                on:click={() => showCbtRecordModal = false}
                class={`py-2 px-4 border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
              >
                취소
              </button>
              <button 
                type="submit"
                class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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
    
    /* 다크 모드 스타일 */
    :global(.dark) {
      color-scheme: dark;
    }
    
    /* 색상 변수 */
    :root {
      --color-blue-50: #EFF6FF;
      --color-blue-100: #DBEAFE;
      --color-blue-500: #3B82F6;
      --color-blue-600: #2563EB;
      --color-blue-700: #1D4ED8;
      
      --color-green-50: #ECFDF5;
      --color-green-100: #D1FAE5;
      --color-green-500: #10B981;
      --color-green-600: #059669;
      
      --color-purple-50: #F5F3FF;
      --color-purple-100: #EDE9FE;
      --color-purple-500: #8B5CF6;
      --color-purple-600: #7C3AED;
      
      --color-yellow-50: #FFFBEB;
      --color-yellow-100: #FEF3C7;
      --color-yellow-500: #F59E0B;
      --color-yellow-600: #D97706;
      
      --color-red-50: #FEF2F2;
      --color-red-100: #FEE2E2;
      --color-red-500: #EF4444;
      --color-red-600: #DC2626;
      
      --color-gray-50: #F9FAFB;
      --color-gray-100: #F3F4F6;
      --color-gray-200: #E5E7EB;
      --color-gray-300: #D1D5DB;
      --color-gray-400: #9CA3AF;
      --color-gray-500: #6B7280;
      --color-gray-600: #4B5563;
      --color-gray-700: #374151;
      --color-gray-800: #1F2937;
      --color-gray-900: #111827;
    }
  </style>
  
  