<script lang="ts">
    import { onMount } from 'svelte';
    import { ArrowUp, ArrowDown, CheckCircle, Circle, Menu, X, User, LogOut, Plus, Edit, Trash, Clock, Calendar, Tag, AlertCircle, Filter, Search, ChevronDown, ChevronUp, MoreHorizontal, Bell, BellOff, Repeat, CheckSquare, Square, Star, Flag, Play, Pause, Layers, Bookmark, Clipboard, Focus, Eye, EyeOff, Save, XCircle } from 'lucide-svelte';
    
    // 작업 카테고리
    const categories = [
      { id: 'work', name: '업무', color: 'bg-blue-100 text-blue-700' },
      { id: 'study', name: '공부', color: 'bg-purple-100 text-purple-700' },
      { id: 'personal', name: '개인', color: 'bg-green-100 text-green-700' },
      { id: 'health', name: '건강', color: 'bg-red-100 text-red-700' },
      { id: 'finance', name: '재정', color: 'bg-yellow-100 text-yellow-700' },
      { id: 'social', name: '사회', color: 'bg-pink-100 text-pink-700' }
    ];
    
    // 작업 우선순위
    const priorities = [
      { id: 'high', name: '높음', color: 'bg-red-100 text-red-700', icon: AlertCircle },
      { id: 'medium', name: '중간', color: 'bg-yellow-100 text-yellow-700', icon: Flag },
      { id: 'low', name: '낮음', color: 'bg-blue-100 text-blue-700', icon: Bookmark }
    ];
    
    // 작업 상태
    const statuses = [
      { id: 'todo', name: '예정', color: 'bg-gray-100 text-gray-700' },
      { id: 'in-progress', name: '진행 중', color: 'bg-blue-100 text-blue-700' },
      { id: 'completed', name: '완료', color: 'bg-green-100 text-green-700' }
    ];
    
    // 반복 주기
    const repeatOptions = [
      { id: 'none', name: '반복 안함' },
      { id: 'daily', name: '매일' },
      { id: 'weekdays', name: '평일마다' },
      { id: 'weekly', name: '매주' },
      { id: 'monthly', name: '매월' }
    ];
    
    // 작업 목록
    let tasks:any = [
      {
        id: 1,
        title: '프로젝트 계획서 작성',
        description: '다음 분기 프로젝트 계획서 초안 작성하기',
        category: 'work',
        priority: 'high',
        status: 'in-progress',
        dueDate: '2025-03-20',
        reminder: true,
        reminderTime: '09:00',
        repeat: 'none',
        tags: ['프로젝트', '계획'],
        createdAt: '2025-03-10',
        completedAt: null,
        isStarred: true,
        estimatedMinutes: 120,
        actualMinutes: 0,
        notes: '주요 목표와 일정, 리소스 계획 포함하기'
      },
      {
        id: 2,
        title: '논문 초안 작성',
        description: '연구 결과를 바탕으로 논문 초안 작성하기',
        category: 'study',
        priority: 'high',
        status: 'todo',
        dueDate: '2025-03-25',
        reminder: true,
        reminderTime: '10:00',
        repeat: 'none',
        tags: ['논문', '연구'],
        createdAt: '2025-03-11',
        completedAt: null,
        isStarred: false,
        estimatedMinutes: 240,
        actualMinutes: 0,
        notes: '서론, 방법론, 결과, 논의 섹션 포함'
      },
      {
        id: 3,
        title: '주간 운동 계획',
        description: '이번 주 운동 계획 세우고 실천하기',
        category: 'health',
        priority: 'medium',
        status: 'todo',
        dueDate: '2025-03-15',
        reminder: false,
        reminderTime: '',
        repeat: 'weekly',
        tags: ['운동', '건강'],
        createdAt: '2025-03-12',
        completedAt: null,
        isStarred: true,
        estimatedMinutes: 60,
        actualMinutes: 0,
        notes: '유산소 30분, 근력 30분'
      },
      {
        id: 4,
        title: '가계부 정리',
        description: '지난 달 지출 내역 정리 및 예산 계획',
        category: 'finance',
        priority: 'low',
        status: 'completed',
        dueDate: '2025-03-05',
        reminder: false,
        reminderTime: '',
        repeat: 'monthly',
        tags: ['재정', '예산'],
        createdAt: '2025-03-01',
        completedAt: '2025-03-05',
        isStarred: false,
        estimatedMinutes: 45,
        actualMinutes: 50,
        notes: '식비, 교통비, 여가비 카테고리별 정리'
      },
      {
        id: 5,
        title: '친구 생일 선물 구매',
        description: '다음 주 친구 생일 선물 준비하기',
        category: 'social',
        priority: 'medium',
        status: 'todo',
        dueDate: '2025-03-18',
        reminder: true,
        reminderTime: '15:00',
        repeat: 'none',
        tags: ['선물', '생일'],
        createdAt: '2025-03-12',
        completedAt: null,
        isStarred: false,
        estimatedMinutes: 60,
        actualMinutes: 0,
        notes: '관심사: 독서, 음악, 요리'
      }
    ];
    
    // 필터 상태
    let filterCategory = 'all';
    let filterPriority = 'all';
    let filterStatus = 'all';
    let searchQuery = '';
    let showCompletedTasks = true;
    let sortBy = 'dueDate';
    let sortDirection = 'asc';
    
    // 작업 추가/편집 모달 상태
    let showTaskModal = false;
    let editingTask:any = null;
    let newTask = {
      id: null,
      title: '',
      description: '',
      category: 'work',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
      reminder: false,
      reminderTime: '09:00',
      repeat: 'none',
      tags: [],
      createdAt: '',
      completedAt: null,
      isStarred: false,
      estimatedMinutes: 30,
      actualMinutes: 0,
      notes: ''
    };
    
    // 태그 입력 상태
    let tagInput:any = '';
    
    // 작업 상세 보기 모달 상태
    let showTaskDetailModal = false;
    let selectedTask:any = null;
    
    // 작업 메뉴 상태
    let taskMenuOpen:any = null;
    
    // 집중 모드 상태
    let focusModeActive = false;
    let focusTask:any = null;
    let focusTimer:any = null;
    let focusTimeElapsed = 0;
    let focusTimerPaused = false;    

    // 작업 메뉴 토글
    function toggleTaskMenu(taskId:any, event:any) {
      event.stopPropagation();
      taskMenuOpen = taskMenuOpen === taskId ? null : taskId;
    }
    
    // 작업 추가 모달 열기
    function openAddTaskModal() {
      const today = new Date().toISOString().split('T')[0];
      
      newTask = {
        id: null,
        title: '',
        description: '',
        category: 'work',
        priority: 'medium',
        status: 'todo',
        dueDate: today,
        reminder: false,
        reminderTime: '09:00',
        repeat: 'none',
        tags: [],
        createdAt: today,
        completedAt: null,
        isStarred: false,
        estimatedMinutes: 30,
        actualMinutes: 0,
        notes: ''
      };
      
      editingTask = null;
      showTaskModal = true;
    }
    
    // 작업 편집 모달 열기
    function openEditTaskModal(task:any, event:any) {
      if (event) event.stopPropagation();
      editingTask = task;
      newTask = { ...task, tags: [...task.tags] };
      showTaskModal = true;
    }
    
    // 작업 상세 보기 모달 열기
    function openTaskDetailModal(task:any) {
      selectedTask = task;
      showTaskDetailModal = true;
    }
    
    // 작업 추가
    function addTask() {
      if (!newTask.title.trim()) return;
      
      if (editingTask) {
        // 작업 편집
        const taskIndex = tasks.findIndex((t:any) => t.id === editingTask.id);
        if (taskIndex !== -1) {
          tasks[taskIndex] = { ...newTask };
          tasks = [...tasks];
        }
      } else {
        // 작업 추가
        const newId = Math.max(0, ...tasks.map((t:any) => t.id)) + 1;
        tasks = [
          ...tasks,
          {
            ...newTask,
            id: newId,
            createdAt: new Date().toISOString().split('T')[0]
          }
        ];
      }
      
      showTaskModal = false;
    }
    
    // 작업 삭제
    function deleteTask(taskId:any, event:any) {
      if (event) event.stopPropagation();
      
      if (confirm('정말로 이 작업을 삭제하시겠습니까?')) {
        tasks = tasks.filter((t:any) => t.id !== taskId);
        taskMenuOpen = null;
      }
    }
    
    // 작업 상태 변경
    function changeTaskStatus(taskId:any, newStatus:any, event:any) {
      if (event) event.stopPropagation();
      
      const taskIndex = tasks.findIndex((t:any) => t.id === taskId);
      if (taskIndex !== -1) {
        const task = tasks[taskIndex];
        
        // 완료 상태로 변경 시 완료 날짜 기록
        if (newStatus === 'completed' && task.status !== 'completed') {
          task.completedAt = new Date().toISOString().split('T')[0];
        } else if (newStatus !== 'completed') {
          task.completedAt = null;
        }
        
        task.status = newStatus;
        tasks = [...tasks];
      }
    }
    
    // 작업 즐겨찾기 토글
    function toggleStarred(taskId:any, event:any) {
      if (event) event.stopPropagation();
      
      const taskIndex = tasks.findIndex((t:any) => t.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex].isStarred = !tasks[taskIndex].isStarred;
        tasks = [...tasks];
      }
    }
    
    // 태그 추가
    function addTag() {
      if (!tagInput.trim()) return;
      
    //   if (!newTask.tags.includes(tagInput.trim())) {
    //     newTask.tags = [...newTask.tags, tagInput.trim()];
    //   }
      
      tagInput = '';
    }
    
    // 태그 삭제
    function removeTag(tag:any) {
      newTask.tags = newTask.tags.filter(t => t !== tag);
    }
    
    // 정렬 변경
    function changeSorting(field:any) {
      if (sortBy === field) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        sortBy = field;
        sortDirection = 'asc';
      }
    }
    
    // 집중 모드 시작
    function startFocusMode(task:any) {
      focusTask = task;
      focusModeActive = true;
      focusTimeElapsed = 0;
      focusTimerPaused = false;
      
      if (focusTimer) clearInterval(focusTimer);
      
      focusTimer = setInterval(() => {
        if (!focusTimerPaused) {
          focusTimeElapsed++;
        }
      }, 1000);
    }
    
    // 집중 모드 종료
    function endFocusMode() {
      if (focusTimer) clearInterval(focusTimer);
      
      if (focusTask) {
        const taskIndex = tasks.findIndex((t:any) => t.id === focusTask.id);
        if (taskIndex !== -1) {
          tasks[taskIndex].actualMinutes = (tasks[taskIndex].actualMinutes || 0) + Math.floor(focusTimeElapsed / 60);
          tasks = [...tasks];
        }
      }
      
      focusModeActive = false;
      focusTask = null;
      focusTimeElapsed = 0;
      focusTimerPaused = false;
    }

    function toggleFocusTimer() {
      focusTimerPaused = !focusTimerPaused;
    }
        
    function formatTime(seconds:any) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    
    function formatDate(dateString:any) {
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
    
    function getDueDateStatus(dueDate:any, status:any) {
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
    
    function getDueDateColor(status:any) {
      switch(status) {
        case 'overdue': return 'text-red-600';
        case 'today': return 'text-orange-600';
        case 'soon': return 'text-yellow-600';
        case 'completed': return 'text-green-600';
        default: return 'text-gray-600';
      }
    }
    
    function getCategoryColor(categoryId:any) {
      const category = categories.find(c => c.id === categoryId);
      return category ? category.color : 'bg-gray-100 text-gray-700';
    }
    
    function getPriorityColor(priorityId:any) {
      const priority = priorities.find(p => p.id === priorityId);
      return priority ? priority.color : 'bg-gray-100 text-gray-700';
    }
    
    function getPriorityIcon(priorityId:any) {
      const priority = priorities.find(p => p.id === priorityId);
      return priority ? priority.icon : null;
    }
    
    function getStatusColor(statusId:any) {
      const status = statuses.find(s => s.id === statusId);
      return status ? status.color : 'bg-gray-100 text-gray-700';
    }
    
    // 필터링된 작업 목록
    $: filteredTasks = tasks.filter((task:any) => {
      const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesCompleted = showCompletedTasks || task.status !== 'completed';
      const matchesSearch = !searchQuery || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some((tag:any) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesPriority && matchesStatus && matchesCompleted && matchesSearch;
    });
    
    
    $: sortedTasks = [...filteredTasks].sort((a, b) => {
      if (a.isStarred && !b.isStarred) return -1;
      if (!a.isStarred && b.isStarred) return 1;
      
      let comparison = 0;
      
      switch(sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) comparison = 0;
          else if (!a.dueDate) comparison = 1;
          else if (!b.dueDate) comparison = -1;
          else comparison = new Date(a.dueDate).getMilliseconds() - new Date(b.dueDate).getMilliseconds();
          break;
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          comparison = priorityOrder.high - priorityOrder.low;
          break;
        case 'status':
          const statusOrder = { 'in-progress': 0, 'todo': 1, 'completed': 2 };
          comparison = statusOrder['in-progress'] - statusOrder.completed;
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getMilliseconds() - new Date(b.createdAt).getMilliseconds();
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    $: taskStats = {
      total: tasks.length,
      completed: tasks.filter((t:any) => t.status === 'completed').length,
      inProgress: tasks.filter((t:any) => t.status === 'in-progress').length,
      todo: tasks.filter((t:any) => t.status === 'todo').length,
      overdue: tasks.filter((t:any) => {
        if (t.status === 'completed') return false;
        if (!t.dueDate) return false;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const dueDateTime = new Date(t.dueDate);
        dueDateTime.setHours(0, 0, 0, 0);
        
        return dueDateTime < today;
      }).length,
      highPriority: tasks.filter((t:any) => t.priority === 'high' && t.status !== 'completed').length
    };

    onMount(() => {

    });
  </script>
  
  
<div class="w-full max-w-[1200px] px-4">
<div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex items-center justify-between text-[#414141] text-lg mb-6">
    <div class="flex items-center">
        <span class="h-5 border-l-2 border-[#0056A5] mr-2"></span>
        <h1 class="font-semibold">작업 관리</h1>
    </div>
    <button 
        on:click={openAddTaskModal}
        class="text-blue-700 text-sm font-medium flex items-center gap-1 hover:underline"
    >
        <Plus size={16} />
        새 작업 추가
    </button>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
    <div class="bg-blue-50 rounded-lg p-3 flex flex-col">
        <span class="text-sm text-gray-500">전체 작업</span>
        <span class="text-xl font-bold text-blue-700">{taskStats.total}</span>
    </div>
    <div class="bg-green-50 rounded-lg p-3 flex flex-col">
        <span class="text-sm text-gray-500">완료</span>
        <span class="text-xl font-bold text-green-700">{taskStats.completed}</span>
    </div>
    <div class="bg-blue-50 rounded-lg p-3 flex flex-col">
        <span class="text-sm text-gray-500">진행 중</span>
        <span class="text-xl font-bold text-blue-700">{taskStats.inProgress}</span>
    </div>
    <div class="bg-yellow-50 rounded-lg p-3 flex flex-col">
        <span class="text-sm text-gray-500">예정</span>
        <span class="text-xl font-bold text-yellow-700">{taskStats.todo}</span>
    </div>
    <div class="bg-red-50 rounded-lg p-3 flex flex-col">
        <span class="text-sm text-gray-500">기한 초과</span>
        <span class="text-xl font-bold text-red-700">{taskStats.overdue}</span>
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
        placeholder="작업 검색..." 
        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
    </div>
    
    <div class="flex items-center gap-2">
        <div class="relative">
        <select 
            bind:value={filterCategory}
            class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
        >
            <option value="all">모든 카테고리</option>
            {#each categories as category}
            <option value={category.id}>{category.name}</option>
            {/each}
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown size={16} class="text-gray-400" />
        </div>
        </div>
        
        <div class="relative">
        <select 
            bind:value={filterPriority}
            class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
        >
            <option value="all">모든 우선순위</option>
            {#each priorities as priority}
            <option value={priority.id}>{priority.name}</option>
            {/each}
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown size={16} class="text-gray-400" />
        </div>
        </div>
        
        <div class="relative">
        <select 
            bind:value={filterStatus}
            class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
        >
            <option value="all">모든 상태</option>
            {#each statuses as status}
            <option value={status.id}>{status.name}</option>
            {/each}
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown size={16} class="text-gray-400" />
        </div>
        </div>
    </div>
    </div>
    
    <div class="flex justify-between items-center mb-4">
    <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">정렬:</span>
        <button 
        on:click={() => changeSorting('dueDate')}
        class={`text-sm px-2 py-1 rounded ${sortBy === 'dueDate' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
        >
        마감일
        {#if sortBy === 'dueDate'}
            <svelte:component this={sortDirection === 'asc' ? ChevronUp : ChevronDown} size={14} class="inline" />
        {/if}
        </button>
        <button 
        on:click={() => changeSorting('priority')}
        class={`text-sm px-2 py-1 rounded ${sortBy === 'priority' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
        >
        우선순위
        {#if sortBy === 'priority'}
            <svelte:component this={sortDirection === 'asc' ? ChevronUp : ChevronDown} size={14} class="inline" />
        {/if}
        </button>
        <button 
        on:click={() => changeSorting('title')}
        class={`text-sm px-2 py-1 rounded ${sortBy === 'title' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
        >
        제목
        {#if sortBy === 'title'}
            <svelte:component this={sortDirection === 'asc' ? ChevronUp : ChevronDown} size={14} class="inline" />
        {/if}
        </button>
    </div>
    
    <div class="flex items-center gap-2">
        <label class="flex items-center gap-1 text-sm text-gray-700">
        <input 
            type="checkbox" 
            bind:checked={showCompletedTasks}
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        완료된 작업 표시
        </label>
    </div>
    </div>
    
    {#if sortedTasks.length === 0}
    <div class="text-center py-10">
        <p class="text-gray-500">작업이 없습니다. 새 작업을 추가해보세요!</p>
    </div>
    {:else}
    <div class="space-y-3">
        {#each sortedTasks as task}
        <div 
            class="border border-gray-100 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer {task.status === 'completed' ? 'opacity-75' : ''}"
            on:click={() => openTaskDetailModal(task)}
        >
            <div class="p-4">
            <div class="flex justify-between items-start">
                <div class="flex items-start gap-3">
                <!-- 체크박스 -->
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
                    
                    <!-- 카테고리 및 태그 -->
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
                    
                    <!-- 설명 -->
                    {#if task.description}
                    <p class="text-sm text-gray-600 mt-2 line-clamp-2">{task.description}</p>
                    {/if}
                </div>
                </div>
                
                <div class="flex items-start gap-2">
                <!-- 마감일 -->
                {#if task.dueDate}
                    <div class="flex items-center gap-1 text-sm {getDueDateColor(getDueDateStatus(task.dueDate, task.status))}">
                    <Calendar size={14} />
                    <span>{formatDate(task.dueDate)}</span>
                    </div>
                {/if}
                
                <!-- 작업 메뉴 -->
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
                            on:click={(e) => startFocusMode(task)}
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
        </div>
        {/each}
    </div>
    {/if}
</div>
</div>


  <!-- 작업 추가/편집 모달 -->
  {#if showTaskModal}
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
  {/if}
  
  <!-- 작업 상세 보기 모달 -->
  {#if showTaskDetailModal && selectedTask}
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
                on:click={() => startFocusMode(selectedTask)}
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
  {/if}
  
  <!-- 집중 모드 -->
  {#if focusModeActive && focusTask}
    <div class="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
      <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-6">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-2">집중 모드</h2>
          <p class="text-gray-600">현재 작업에 집중하세요</p>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 class="font-medium text-lg mb-2">{focusTask.title}</h3>
          {#if focusTask.description}
            <p class="text-gray-600 mb-4">{focusTask.description}</p>
          {/if}
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(focusTask.category)}`}>
                {categories.find(c => c.id === focusTask.category)?.name}
              </span>
              <span class={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(focusTask.priority)}`}>
                {priorities.find(p => p.id === focusTask.priority)?.name}
              </span>
            </div>
            {#if focusTask.dueDate}
              <div class="flex items-center gap-1 text-sm">
                <Calendar size={14} />
                <span>{formatDate(focusTask.dueDate)}</span>
              </div>
            {/if}
          </div>
        </div>
        
        <div class="text-center mb-8">
          <div class="text-5xl font-bold mb-4">{formatTime(focusTimeElapsed)}</div>
          <div class="flex justify-center gap-4">
            <button 
              on:click={toggleFocusTimer}
              class="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              {#if focusTimerPaused}
                <Play size={20} />
                재개
              {:else}
                <Pause size={20} />
                일시정지
              {/if}
            </button>
            <button 
              on:click={endFocusMode}
              class="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
            >
              <XCircle size={20} />
              종료
            </button>
          </div>
        </div>
        
        <div class="text-center text-gray-500 text-sm">
          <p>집중 모드를 종료하면 작업 시간이 자동으로 기록됩니다</p>
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
    
    .text-green-500 {
      color: #10B981;
    }
    
    .text-green-700 {
      color: #047857;
    }
    
    .bg-green-50 {
      background-color: #ECFDF5;
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
    
    .bg-yellow-50 {
      background-color: #FFFBEB;
    }
    
    .bg-yellow-100 {
      background-color: #FEF3C7;
    }
    
    .text-yellow-500 {
      color: #F59E0B;
    }
    
    .text-yellow-700 {
      color: #B45309;
    }
    
    .bg-red-50 {
      background-color: #FEF2F2;
    }
    
    .bg-red-100 {
      background-color: #FEE2E2;
    }
    
    .text-red-600 {
      color: #DC2626;
    }
    
    .text-red-700 {
      color: #B91C1C;
    }
    
    .bg-pink-100 {
      background-color: #FCE7F3;
    }
    
    .text-pink-700 {
      color: #BE185D;
    }
    
    .text-orange-600 {
      color: #EA580C;
    }
    
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  </style>
  
  