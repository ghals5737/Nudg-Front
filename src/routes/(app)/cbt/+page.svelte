<script lang="ts">
    import { onMount } from 'svelte';
    import { Menu, X, User, LogOut, Plus, Edit, Trash, Calendar, ChevronLeft, ChevronRight, BarChart2, BookOpen, Clock, Search, Filter, ArrowRight, Check, AlertCircle, Bookmark, Star, Heart, ThumbsUp, ThumbsDown, Frown, Meh, Smile, Activity, Brain, Lightbulb, RefreshCw, Save, Play, Pause, Award, CheckCircle, XCircle, HelpCircle, Info, MessageCircle, PenTool, Zap, Moon, Sun, Wind, Layers, FileText, List, MoreHorizontal, ChevronDown, ChevronUp, Maximize, Minimize, Undo } from 'lucide-svelte';    
    
    // 사용자 정보
    const user = {
      name: "김누지",
      email: "user@example.com",
      avatar: "/src/lib/static/login-logo.svg?height=32&width=32"
    };
  
    // 메뉴 아이템
    const menuItems = [
      { name: "하루일정관리", href: "#", active: false },
      { name: "기록 보기", href: "#", active: false },
      { name: "작업관리", href: "#", active: false },
      { name: "습관", href: "#", active: false },
      { name: "CBT", href: "#", active: true }
    ];
    
    // 모바일 메뉴 상태
    let mobileMenuOpen = false;
    
    // 사용자 드롭다운 상태
    let userDropdownOpen = false;
    
    // 현재 활성화된 탭
    let activeTab = 'dashboard';
    
    // 감정 목록
    const emotions = [
      { id: 'happy', name: '행복', emoji: '😊', color: 'bg-green-100 text-green-700', icon: Smile },
      { id: 'calm', name: '평온', emoji: '😌', color: 'bg-blue-100 text-blue-700', icon: Moon },
      { id: 'excited', name: '신남', emoji: '😃', color: 'bg-yellow-100 text-yellow-700', icon: Zap },
      { id: 'neutral', name: '보통', emoji: '😐', color: 'bg-gray-100 text-gray-700', icon: Meh },
      { id: 'tired', name: '피곤', emoji: '😫', color: 'bg-purple-100 text-purple-700', icon: Wind },
      { id: 'anxious', name: '불안', emoji: '😰', color: 'bg-orange-100 text-orange-700', icon: Activity },
      { id: 'sad', name: '슬픔', emoji: '😢', color: 'bg-indigo-100 text-indigo-700', icon: Frown },
      { id: 'angry', name: '분노', emoji: '😠', color: 'bg-red-100 text-red-700', icon: ThumbsDown }
    ];
    
    // 사고 왜곡 패턴
    const thoughtPatterns = [
      { id: 'all-or-nothing', name: '흑백논리', description: '모든 것을 성공 아니면 실패로 보는 사고방식' },
      { id: 'overgeneralization', name: '과도한 일반화', description: '한 가지 부정적 사건을 모든 상황의 패턴으로 보는 것' },
      { id: 'mental-filter', name: '정신적 필터', description: '긍정적인 면은 무시하고 부정적인 면만 집중하는 것' },
      { id: 'disqualifying-positive', name: '긍정 폄하', description: '긍정적인 경험을 무시하거나 "그건 중요하지 않아"라고 생각하는 것' },
      { id: 'jumping-to-conclusions', name: '성급한 결론', description: '부정적인 해석을 뒷받침할 증거가 거의 없거나 전혀 없는데도 결론을 내리는 것' },
      { id: 'catastrophizing', name: '재앙화', description: '최악의 결과를 예상하고 그것이 가장 가능성이 높다고 생각하는 것' },
      { id: 'emotional-reasoning', name: '감정적 추론', description: '"내가 그렇게 느끼니까 그것은 사실이다"라고 생각하는 것' },
      { id: 'should-statements', name: '당위적 진술', description: '"~해야 한다", "~했어야 한다"와 같은 생각으로 자신을 비난하는 것' },
      { id: 'labeling', name: '꼬리표 붙이기', description: '실수를 했을 때 "나는 실패자다"와 같이 자신에게 부정적인 꼬리표를 붙이는 것' },
      { id: 'personalization', name: '개인화', description: '자신과 관련 없는 부정적인 사건에 대해 책임을 느끼는 것' }
    ];
    
    // 정서 조절 기법
    const emotionRegulationTechniques = [
      { id: 'breathing', name: '호흡 명상', description: '3분 호흡 명상으로 현재에 집중하기', icon: Wind },
      { id: 'thought-challenge', name: '생각 도전하기', description: '부정적 생각에 도전하고 대안적 관점 찾기', icon: Brain },
      { id: 'grounding', name: '그라운딩 기법', description: '5-4-3-2-1 감각 인식으로 현재에 집중하기', icon: Bookmark },
      { id: 'behavioral-activation', name: '행동 활성화', description: '기분을 개선하는 활동 시작하기', icon: Play },
      { id: 'self-compassion', name: '자기 자비', description: '자신에게 친절하고 이해심 있게 대하기', icon: Heart }
    ];
    type Emotion={
        id:string,
        intensity:number
    }
    
    // 자동 사고 기록
    let thoughtRecords:ThoughtRecord[]  = [
      {
        id: 1,
        date: '2025-03-13',
        time: '14:30',
        situation: '프로젝트 마감일이 다가오는데 아직 많은 작업이 남아있음',
        emotions: [
          { id: 'anxious', intensity: 8 },
          { id: 'sad', intensity: 5 }
        ],
        automaticThoughts: '이 프로젝트를 절대 제시간에 끝낼 수 없을 거야. 실패하면 모든 사람들이 나를 무능하다고 생각할 거야.',
        thoughtPatterns: ['catastrophizing', 'jumping-to-conclusions'],
        evidenceFor: '아직 많은 작업이 남아있고 시간이 부족하다.',
        evidenceAgainst: '이전에도 비슷한 상황에서 마감일을 맞춘 적이 있다. 동료들에게 도움을 요청할 수 있다.',
        alternativeThought: '시간이 촉박하지만 우선순위를 정하고 집중하면 중요한 부분은 완료할 수 있다. 필요하다면 도움을 요청할 수 있다.',
        outcomeEmotions: [
          { id: 'anxious', intensity: 5 },
          { id: 'calm', intensity: 3 }
        ]
      },
      {
        id: 2,
        date: '2025-03-12',
        time: '19:15',
        situation: '친구와의 약속에 늦었고 메시지에 답장이 없음',
        emotions: [
          { id: 'anxious', intensity: 7 },
          { id: 'sad', intensity: 6 }
        ],
        automaticThoughts: '친구가 나에게 화가 났을 거야. 이제 나를 신뢰하지 않을 거야. 나는 형편없는 친구야.',
        thoughtPatterns: ['jumping-to-conclusions', 'labeling'],
        evidenceFor: '약속에 늦었고 친구가 메시지에 답장하지 않았다.',
        evidenceAgainst: '친구는 이전에도 내가 늦었을 때 이해해주었다. 메시지를 못 봤을 수도 있다.',
        alternativeThought: '친구가 메시지를 못 봤을 수도 있고, 다른 일로 바쁠 수도 있다. 만나면 사과하고 상황을 설명하면 이해해줄 것이다.',
        outcomeEmotions: [
          { id: 'anxious', intensity: 4 },
          { id: 'neutral', intensity: 5 }
        ]
      },
      {
        id: 3,
        date: '2025-03-10',
        time: '09:45',
        situation: '중요한 회의에서 의견을 말했는데 상사가 다른 의견을 채택함',
        emotions: [
          { id: 'sad', intensity: 6 },
          { id: 'angry', intensity: 5 }
        ],
        automaticThoughts: '내 의견은 가치가 없어. 상사는 내 능력을 인정하지 않아. 앞으로 의견을 말하지 말아야겠어.',
        thoughtPatterns: ['all-or-nothing', 'overgeneralization', 'disqualifying-positive'],
        evidenceFor: '상사가 내 의견 대신 다른 의견을 채택했다.',
        evidenceAgainst: '이전에는 내 의견이 채택된 적도 있다. 상사는 다른 상황에서 내 능력을 칭찬한 적이 있다.',
        alternativeThought: '모든 의견이 항상 채택될 수는 없다. 이것은 내 가치나 능력에 대한 평가가 아니라 특정 상황에 대한 결정일 뿐이다.',
        outcomeEmotions: [
          { id: 'neutral', intensity: 7 },
          { id: 'calm', intensity: 4 }
        ]
      }
    ];
    
    // 감정 기록
    let emotionLogs = [
      {
        id: 1,
        date: '2025-03-13',
        logs: [
          { time: '08:00', emotion: 'neutral', intensity: 5, note: '아침에 일어남' },
          { time: '10:30', emotion: 'anxious', intensity: 7, note: '회의 준비 중 불안감 느낌' },
          { time: '12:15', emotion: 'happy', intensity: 6, note: '동료와 점심 식사' },
          { time: '14:30', emotion: 'anxious', intensity: 8, note: '프로젝트 마감일 압박' },
          { time: '17:00', emotion: 'tired', intensity: 7, note: '하루 일과 마무리' },
          { time: '20:00', emotion: 'calm', intensity: 6, note: '저녁 식사 후 휴식' }
        ]
      },
      {
        id: 2,
        date: '2025-03-12',
        logs: [
          { time: '07:30', emotion: 'tired', intensity: 6, note: '충분히 자지 못함' },
          { time: '09:45', emotion: 'excited', intensity: 7, note: '새 프로젝트 시작' },
          { time: '13:00', emotion: 'neutral', intensity: 5, note: '일상적인 업무' },
          { time: '16:30', emotion: 'happy', intensity: 8, note: '업무 성과에 만족' },
          { time: '19:15', emotion: 'anxious', intensity: 7, note: '친구와의 약속에 늦음' },
          { time: '22:00', emotion: 'calm', intensity: 5, note: '취침 전 독서' }
        ]
      },
      {
        id: 3,
        date: '2025-03-11',
        logs: [
          { time: '08:15', emotion: 'excited', intensity: 6, note: '오늘 할 일 계획' },
          { time: '11:00', emotion: 'neutral', intensity: 5, note: '일상적인 업무' },
          { time: '14:00', emotion: 'tired', intensity: 7, note: '오후 슬럼프' },
          { time: '16:45', emotion: 'happy', intensity: 7, note: '업무 완료 후 성취감' },
          { time: '18:30', emotion: 'calm', intensity: 6, note: '저녁 운동' },
          { time: '21:30', emotion: 'neutral', intensity: 5, note: '하루 마무리' }
        ]
      }
    ];
    
    // 리플렉션 저널
    let reflectionJournals = [
      {
        id: 1,
        date: '2025-03-13',
        overallMood: 'neutral',
        moodRating: 6,
        positiveExperiences: '동료와 즐거운 점심 시간을 보냈다. 어려운 문제를 해결했다.',
        challenges: '프로젝트 마감일 압박으로 스트레스를 느꼈다. 집중하기 어려웠다.',
        thoughtPatterns: ['catastrophizing', 'jumping-to-conclusions'],
        copingStrategies: '호흡 명상을 통해 불안감을 줄였다. 우선순위를 정해 작업을 진행했다.',
        insights: '스트레스 상황에서 재앙화 사고 패턴이 자주 나타난다. 이를 인식하고 대안적 사고를 연습해야 한다.',
        tomorrowIntentions: '작업을 작은 단위로 나누어 진행하기. 불안감이 생길 때 5분 호흡 명상하기.'
      },
      {
        id: 2,
        date: '2025-03-12',
        overallMood: 'happy',
        moodRating: 7,
        positiveExperiences: '새 프로젝트를 시작하고 좋은 아이디어가 떠올랐다. 업무 성과에 만족했다.',
        challenges: '친구와의 약속에 늦어 걱정했다. 저녁에 집중력이 떨어졌다.',
        thoughtPatterns: ['jumping-to-conclusions', 'labeling'],
        copingStrategies: '친구에게 솔직하게 상황을 설명했다. 짧은 휴식을 취하고 다시 집중했다.',
        insights: '약속에 늦었을 때 최악의 상황을 가정하는 경향이 있다. 실제로는 대부분 이해해준다.',
        tomorrowIntentions: '일정을 여유있게 계획하기. 자신에게 더 관대해지기.'
      },
      {
        id: 3,
        date: '2025-03-11',
        overallMood: 'calm',
        moodRating: 7,
        positiveExperiences: '계획한 업무를 모두 완료했다. 저녁 운동으로 기분이 좋아졌다.',
        challenges: '오후에 에너지가 떨어져 집중하기 어려웠다.',
        thoughtPatterns: ['all-or-nothing'],
        copingStrategies: '짧은 산책으로 기분을 전환했다. 작업을 작은 단위로 나누어 진행했다.',
        insights: '신체 활동이 기분과 집중력 향상에 큰 도움이 된다.',
        tomorrowIntentions: '오후 슬럼프 시간에 짧은 운동 계획하기. 물을 충분히 마시기.'
      }
    ];
    
    // CBT 미션
    let cbtMissions = [
      {
        id: 1,
        title: '과도한 일반화 인식하기',
        description: '하루에 한 번 과도한 일반화 사고 패턴을 인식하고 기록하기',
        startDate: '2025-03-10',
        endDate: '2025-03-16',
        progress: 4,
        totalDays: 7,
        isCompleted: false
      },
      {
        id: 2,
        title: '하루 3번 감정 체크인',
        description: '하루 중 아침, 점심, 저녁에 현재 감정 상태 기록하기',
        startDate: '2025-03-12',
        endDate: '2025-03-18',
        progress: 2,
        totalDays: 7,
        isCompleted: false
      },
      {
        id: 3,
        title: '자기 자비 연습',
        description: '하루에 한 번 자신에게 친절한 말 해주기',
        startDate: '2025-03-08',
        endDate: '2025-03-14',
        progress: 6,
        totalDays: 7,
        isCompleted: false
      },
      {
        id: 4,
        title: '감사 일기 쓰기',
        description: '매일 감사한 일 3가지 기록하기',
        startDate: '2025-03-01',
        endDate: '2025-03-07',
        progress: 7,
        totalDays: 7,
        isCompleted: true
      }
    ];
    
    // 현재 날짜 및 선택된 날짜
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = new Date(today).toISOString().split('T')[0];

    type ThoughtRecord= {
    id: number | null;
    date: string;
    time: string;
    situation: string;
    emotions: Emotion[];
    automaticThoughts: string;
    thoughtPatterns: string[];
    evidenceFor: string;
    evidenceAgainst: string;
    alternativeThought: string;
    outcomeEmotions: Emotion[];
    }
        
    // 새 자동 사고 기록
    let newThoughtRecord:ThoughtRecord = {
      id: null,
      date: selectedDate,
      time: new Date().toTimeString().slice(0, 5),
      situation: '',
      emotions: [],
      automaticThoughts: '',
      thoughtPatterns: [],
      evidenceFor: '',
      evidenceAgainst: '',
      alternativeThought: '',
      outcomeEmotions: []
    };
    
    // 새 감정 기록
    let newEmotionLog = {
      emotion: 'neutral',
      intensity: 5,
      note: '',
      time: new Date().toTimeString().slice(0, 5)
    };

    type ReflectionJournal= {
        date: string;
        overallMood: string; // 원하는 감정들로 제한 가능
        moodRating: number; // 1~10 같은 범위라면 추가적으로 커스텀 타입도 가능
        positiveExperiences: string;
        challenges: string;
        thoughtPatterns: string[];
        copingStrategies: string;
        insights: string;
        tomorrowIntentions: string;
    }
    
    // 새 리플렉션 저널
    let newReflectionJournal:ReflectionJournal = {
      date: selectedDate,
      overallMood: 'neutral',
      moodRating: 5,
      positiveExperiences: '',
      challenges: '',
      thoughtPatterns: [],
      copingStrategies: '',
      insights: '',
      tomorrowIntentions: ''
    };
    
    // 새 CBT 미션
    let newCbtMission = {
      title: '',
      description: '',
      startDate: selectedDate,
      endDate: '',
      progress: 0,
      totalDays: 7,
      isCompleted: false
    };
    
    // 모달 상태
    let showThoughtRecordModal = false;
    let showEmotionLogModal = false;
    let showReflectionJournalModal = false;
    let showCbtMissionModal = false;
    let showTechniqueModal = false;
    let selectedTechnique:any = null;
    
    // 호흡 명상 상태
    let breathingExerciseActive = false;
    let breathingPhase = 'inhale'; // inhale, hold, exhale
    let breathingTimer:any = null;
    let breathingSeconds = 0;
    let totalBreathingTime = 180; // 3분
    
    // 모바일 메뉴 토글
    function toggleMobileMenu() {
      mobileMenuOpen = !mobileMenuOpen;
    }
    
    // 사용자 드롭다운 토글
    function toggleUserDropdown() {
      userDropdownOpen = !userDropdownOpen;
    }
    
    // 클릭 이벤트 핸들러
    function handleClickOutside(event:any) {
      const target = event.target;
      if (!target.closest('.user-dropdown') && userDropdownOpen) {
        userDropdownOpen = false;
      }
    }
    
    // 탭 변경
    function changeTab(tab:any) {
      activeTab = tab;
    }
    
    // 이전 달로 이동
    function prevMonth() {
      if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
      } else {
        currentMonth--;
      }
    }
    
    // 다음 달로 이동
    function nextMonth() {
      if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
      } else {
        currentMonth++;
      }
    }
    
    // 날짜 선택
    function selectDate(date:any) {
      selectedDate = date;
    }
    
    // 오늘로 이동
    function goToToday() {
      currentMonth = today.getMonth();
      currentYear = today.getFullYear();
      selectedDate = new Date(today).toISOString().split('T')[0];
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
          hasThoughtRecord: false,
          hasEmotionLog: false,
          hasReflectionJournal: false
        };
      });
      
      // 현재 달의 날짜들
      const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = date === new Date().toISOString().split('T')[0];
        
        // 기록 데이터 확인
        const hasThoughtRecord = thoughtRecords.some(record => record.date === date);
        const hasEmotionLog = emotionLogs.some(log => log.date === date);
        const hasReflectionJournal = reflectionJournals.some(journal => journal.date === date);
        
        return {
          date,
          day,
          isCurrentMonth: true,
          isToday,
          hasThoughtRecord,
          hasEmotionLog,
          hasReflectionJournal
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
          hasThoughtRecord: false,
          hasEmotionLog: false,
          hasReflectionJournal: false
        };
      });
      
      return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    }
    
    // 요일 이름
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    
    // 월 이름
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    
    // 자동 사고 기록 모달 열기
    function openThoughtRecordModal() {
      newThoughtRecord = {
        id: null,
        date: selectedDate,
        time: new Date().toTimeString().slice(0, 5),
        situation: '',
        emotions: [],
        automaticThoughts: '',
        thoughtPatterns: [],
        evidenceFor: '',
        evidenceAgainst: '',
        alternativeThought: '',
        outcomeEmotions: []
      };
      
      showThoughtRecordModal = true;
    }
    
    // 감정 기록 모달 열기
    function openEmotionLogModal() {
      newEmotionLog = {
        emotion: 'neutral',
        intensity: 5,
        note: '',
        time: new Date().toTimeString().slice(0, 5)
      };
      
      showEmotionLogModal = true;
    }
    
    // 리플렉션 저널 모달 열기
    function openReflectionJournalModal() {
      newReflectionJournal = {
        date: selectedDate,
        overallMood: 'neutral',
        moodRating: 5,
        positiveExperiences: '',
        challenges: '',
        thoughtPatterns: [],
        copingStrategies: '',
        insights: '',
        tomorrowIntentions: ''
      };
      
      showReflectionJournalModal = true;
    }
    
    // CBT 미션 모달 열기
    function openCbtMissionModal() {
      const endDate = new Date(selectedDate);
      endDate.setDate(endDate.getDate() + 6); // 7일 후
      
      newCbtMission = {
        title: '',
        description: '',
        startDate: selectedDate,
        endDate: endDate.toISOString().split('T')[0],
        progress: 0,
        totalDays: 7,
        isCompleted: false
      };
      
      showCbtMissionModal = true;
    }
    
    // 정서 조절 기법 모달 열기
    function openTechniqueModal(technique:any) {
      selectedTechnique = technique;
      showTechniqueModal = true;
    }
    
    // 자동 사고 기록 추가
    function addThoughtRecord() {
      if (!newThoughtRecord.situation || !newThoughtRecord.automaticThoughts) return;
      
      if (newThoughtRecord.id) {
        // 기존 기록 수정
        const index = thoughtRecords.findIndex(record => record.id === newThoughtRecord.id);
        if (index !== -1) {
          //thoughtRecords[index] = { ...newThoughtRecord };
          thoughtRecords = [...thoughtRecords];
        }
      } else {
        // 새 기록 추가
        const newId = Math.max(0, ...thoughtRecords.map(record => record.id!)) + 1;
        thoughtRecords = [
          {
            ...newThoughtRecord,
            id: newId
          },
          ...thoughtRecords
        ];
      }
      
      showThoughtRecordModal = false;
    }
    
    // 감정 기록 추가
    function addEmotionLog() {
      if (!newEmotionLog.emotion || !newEmotionLog.note) return;
      
      const existingLogIndex = emotionLogs.findIndex(log => log.date === selectedDate);
      
      if (existingLogIndex !== -1) {
        // 기존 날짜에 로그 추가
        emotionLogs[existingLogIndex].logs.push({
          time: newEmotionLog.time,
          emotion: newEmotionLog.emotion,
          intensity: newEmotionLog.intensity,
          note: newEmotionLog.note
        });
        
        // 시간순 정렬
        emotionLogs[existingLogIndex].logs.sort((a, b) => {
          return a.time.localeCompare(b.time);
        });
        
        emotionLogs = [...emotionLogs];
      } else {
        // 새 날짜에 로그 추가
        const newId = Math.max(0, ...emotionLogs.map(log => log.id)) + 1;
        emotionLogs = [
          {
            id: newId,
            date: selectedDate,
            logs: [{
              time: newEmotionLog.time,
              emotion: newEmotionLog.emotion,
              intensity: newEmotionLog.intensity,
              note: newEmotionLog.note
            }]
          },
          ...emotionLogs
        ];
      }
      
      showEmotionLogModal = false;
    }
    
    // 리플렉션 저널 추가
    function addReflectionJournal() {
      if (!newReflectionJournal.positiveExperiences || !newReflectionJournal.challenges) return;
      
      const existingJournalIndex = reflectionJournals.findIndex(journal => journal.date === selectedDate);
      
      if (existingJournalIndex !== -1) {
        // 기존 저널 수정
        //reflectionJournals[existingJournalIndex] = { ...newReflectionJournal };
        reflectionJournals = [...reflectionJournals];
      } else {
        // 새 저널 추가
        const newId = Math.max(0, ...reflectionJournals.map(journal => journal.id)) + 1;
        reflectionJournals = [
          {
            ...newReflectionJournal,
            id: newId
          },
          ...reflectionJournals
        ];
      }
      
      showReflectionJournalModal = false;
    }
    
    // CBT 미션 추가
    function addCbtMission() {
      if (!newCbtMission.title || !newCbtMission.description) return;
      
      const startDate = new Date(newCbtMission.startDate);
      const endDate = new Date(newCbtMission.endDate);
      const diffTime = Math.abs(endDate.getMilliseconds() - startDate.getMilliseconds());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      const newId = Math.max(0, ...cbtMissions.map(mission => mission.id)) + 1;
      cbtMissions = [
        {
          ...newCbtMission,
          id: newId,
          totalDays: diffDays
        },
        ...cbtMissions
      ];
      
      showCbtMissionModal = false;
    }
    
    // 미션 진행 상태 업데이트
    function updateMissionProgress(missionId:any, increment = true) {
      const missionIndex = cbtMissions.findIndex(mission => mission.id === missionId);
      
      if (missionIndex !== -1) {
        const mission = cbtMissions[missionIndex];
        
        if (increment) {
          if (mission.progress < mission.totalDays) {
            mission.progress += 1;
          }
        } else {
          if (mission.progress > 0) {
            mission.progress -= 1;
          }
        }
        
        // 완료 상태 업데이트
        mission.isCompleted = mission.progress >= mission.totalDays;
        
        cbtMissions = [...cbtMissions];
      }
    }
    
    // 감정 선택
    function selectEmotion(emotionId:any, array:any, intensity = 5) {
      const existingIndex = array.findIndex((e:any) => e.id === emotionId);
      
      if (existingIndex !== -1) {
        // 이미 선택된 감정 제거
        return array.filter((e:any) => e.id !== emotionId);
      } else {
        // 새 감정 추가
        return [...array, { id: emotionId, intensity }];
      }
    }
    
    // 사고 패턴 선택
    function selectThoughtPattern(patternId:any, array:any) {
      if (array.includes(patternId)) {
        // 이미 선택된 패턴 제거
        return array.filter((p:any) => p !== patternId);
      } else {
        // 새 패턴 추가
        return [...array, patternId];
      }
    }
    
    // 감정 강도 변경
    function changeEmotionIntensity(emotionId:any, intensity:any, array:any) {
      return array.map((e:any) => {
        if (e.id === emotionId) {
          return { ...e, intensity };
        }
        return e;
      });
    }
    
    // 호흡 명상 시작
    function startBreathingExercise() {
      breathingExerciseActive = true;
      breathingPhase = 'inhale';
      breathingSeconds = 0;
      
      if (breathingTimer) clearInterval(breathingTimer);
      
      breathingTimer = setInterval(() => {
        breathingSeconds++;
        
        // 호흡 단계 변경
        if (breathingPhase === 'inhale' && breathingSeconds % 4 === 0) {
          breathingPhase = 'hold';
        } else if (breathingPhase === 'hold' && breathingSeconds % 7 === 0) {
          breathingPhase = 'exhale';
        } else if (breathingPhase === 'exhale' && breathingSeconds % 15 === 0) {
          breathingPhase = 'inhale';
        }
        
        // 3분 후 종료
        if (breathingSeconds >= totalBreathingTime) {
          endBreathingExercise();
        }
      }, 1000);
    }
    
    // 호흡 명상 종료
    function endBreathingExercise() {
      if (breathingTimer) clearInterval(breathingTimer);
      breathingExerciseActive = false;
      breathingSeconds = 0;
    }
    
    // 감정 아이콘 가져오기
    function getEmotionIcon(emotionId:any) {
      const emotion = emotions.find(e => e.id === emotionId);
      return emotion ? emotion.icon : Meh;
    }
    
    // 감정 색상 가져오기
    function getEmotionColor(emotionId:any) {
      const emotion = emotions.find(e => e.id === emotionId);
      return emotion ? emotion.color : 'bg-gray-100 text-gray-700';
    }
    
    // 감정 이름 가져오기
    function getEmotionName(emotionId:any) {
      const emotion = emotions.find(e => e.id === emotionId);
      return emotion ? emotion.name : '보통';
    }
    
    // 감정 이모지 가져오기
    function getEmotionEmoji(emotionId:any) {
      const emotion = emotions.find(e => e.id === emotionId);
      return emotion ? emotion.emoji : '😐';
    }
    
    // 사고 패턴 이름 가져오기
    function getThoughtPatternName(patternId:any) {
      const pattern = thoughtPatterns.find(p => p.id === patternId);
      return pattern ? pattern.name : '';
    }
    
    // 날짜 포맷팅
    function formatDate(dateString:any) {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      return `${year}년 ${month}월 ${day}일`;
    }
    
    // 선택된 날짜의 데이터 가져오기
    $: selectedDateThoughtRecords = thoughtRecords.filter(record => record.date === selectedDate);
    $: selectedDateEmotionLog = emotionLogs.find(log => log.date === selectedDate);
    $: selectedDateReflectionJournal = reflectionJournals.find(journal => journal.date === selectedDate);
    
    // 캘린더 날짜 계산
    $: calendarDates = getCalendarDates(currentYear, currentMonth);
    
    // 활성 미션 필터링
    $: activeMissions = cbtMissions.filter(mission => !mission.isCompleted);
    $: completedMissions = cbtMissions.filter(mission => mission.isCompleted);
    
    // 컴포넌트 마운트 시 실행
    onMount(() => {
      // 필요한 초기화 작업
    });
  

    function deleteTask(id: number): any {
        throw new Error('Function not implemented.');
    }
</script>
  
  <svelte:window on:click={handleClickOutside} />
  
  <div class="min-h-screen bg-[#F8FAFE]">
    <!-- 헤더 -->
    <header class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <a href="#" class="text-blue-700 font-bold text-2xl">nudg</a>
            </div>
                        
            <nav class="hidden sm:ml-8 sm:flex sm:space-x-8">
              {#each menuItems as item}
                <a 
                  href={item.href} 
                  class="inline-flex items-center px-1 pt-1 border-b-2 {item.active ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} text-sm font-medium"
                >
                  {item.name}
                </a>
              {/each}
            </nav>
          </div>
          
          <div class="flex items-center">          
            <div class="sm:hidden -mr-2 flex items-center">
              <button 
                type="button" 
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
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
                  <span class="ml-2 text-gray-700">{user.name}</span>
                </div>
              </button>
              
              {#if userDropdownOpen}
                <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="px-4 py-2 border-b border-gray-100">
                    <p class="text-sm font-medium text-gray-900">{user.name}</p>
                    <p class="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <User size={16} class="mr-2" />
                    프로필
                  </a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
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
            {#each menuItems as item}
              <a 
                href={item.href} 
                class="block pl-3 pr-4 py-2 {item.active ? 'bg-blue-50 border-l-4 border-blue-700 text-blue-700' : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} text-base font-medium"
              >
                {item.name}
              </a>
            {/each}
          </div>
          <div class="pt-4 pb-3 border-t border-gray-200">
            <div class="flex items-center px-4">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" src={user.avatar || "/placeholder.svg?height=32&width=32"} alt={user.name} />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">{user.name}</div>
                <div class="text-sm font-medium text-gray-500">{user.email}</div>
              </div>
            </div>
            <div class="mt-3 space-y-1">
              <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                프로필
              </a>
              <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
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
        <div class="bg-white rounded-lg shadow-sm p-6">
          <!-- 헤더 -->
          <div class="flex items-center justify-between text-[#414141] text-lg mb-6">
            <div class="flex items-center">
              <span class="h-5 border-l-2 border-[#0056A5] mr-2"></span>
              <h1 class="font-semibold">CBT 마음 관리</h1>
            </div>
          </div>
          
          <!-- 탭 메뉴 -->
          <div class="border-b border-gray-200 mb-6">
            <div class="flex overflow-x-auto">
              <button 
                on:click={() => changeTab('dashboard')}
                class={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'dashboard' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                대시보드
              </button>
              <button 
                on:click={() => changeTab('thought-records')}
                class={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'thought-records' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                자동 사고 기록
              </button>
              <button 
                on:click={() => changeTab('emotion-tracker')}
                class={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'emotion-tracker' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                감정 트래커
              </button>
              <button 
                on:click={() => changeTab('reflection-journal')}
                class={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'reflection-journal' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                리플렉션 저널
              </button>
              <button 
                on:click={() => changeTab('emotion-toolkit')}
                class={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'emotion-toolkit' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                정서 조절 툴킷
              </button>
              <button 
                on:click={() => changeTab('cbt-missions')}
                class={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'cbt-missions' ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                CBT 미션
              </button>
            </div>
          </div>
          
          {#if activeTab === 'dashboard'}
            <!-- 대시보드 -->
            <div>
              <!-- 날짜 선택 -->
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
                        
                        {#if date.hasThoughtRecord || date.hasEmotionLog || date.hasReflectionJournal}
                          <div class="flex justify-center gap-1 mt-auto">
                            {#if date.hasThoughtRecord}
                              <span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                            {/if}
                            {#if date.hasEmotionLog}
                              <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            {/if}
                            {#if date.hasReflectionJournal}
                              <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            {/if}
                          </div>
                        {/if}
                      </div>
                    </button>
                  {/each}
                </div>
              </div>
              
              <!-- 오늘의 요약 -->
              <div class="mb-6">
                <h2 class="text-xl font-medium mb-4">{formatDate(selectedDate)} 요약</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <!-- 감정 요약 -->
                  <div class="bg-white border border-gray-100 rounded-lg p-4">
                    <h3 class="text-lg font-medium mb-3 flex items-center gap-2">
                      <Activity size={18} class="text-blue-600" />
                      감정 상태
                    </h3>
                    
                    {#if selectedDateEmotionLog && selectedDateEmotionLog.logs.length > 0}
                      <div class="space-y-3">
                        {#each selectedDateEmotionLog.logs.slice(0, 3) as log}
                          <div class="flex items-center gap-3">
                            <div class={`p-2 rounded-full ${getEmotionColor(log.emotion)}`}>
                              <svelte:component this={getEmotionIcon(log.emotion)} size={18} />
                            </div>
                            <div>
                              <div class="flex items-center gap-2">
                                <span class="font-medium">{getEmotionName(log.emotion)}</span>
                                <span class="text-sm text-gray-500">{log.time}</span>
                              </div>
                              <p class="text-sm text-gray-600">{log.note}</p>
                            </div>
                          </div>
                        {/each}
                        
                        {#if selectedDateEmotionLog.logs.length > 3}
                          <button 
                            on:click={() => changeTab('emotion-tracker')}
                            class="text-blue-600 text-sm hover:underline flex items-center gap-1"
                          >
                            더 보기 ({selectedDateEmotionLog.logs.length - 3}개 더)
                            <ArrowRight size={14} />
                          </button>
                        {/if}
                      </div>
                    {:else}
                      <div class="text-center py-4">
                        <p class="text-gray-500 mb-2">기록된 감정이 없습니다</p>
                        <button 
                          on:click={openEmotionLogModal}
                          class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 flex items-center gap-1 mx-auto"
                        >
                          <Plus size={14} />
                          감정 기록하기
                        </button>
                      </div>
                    {/if}
                  </div>
                  
                  <!-- 자동 사고 요약 -->
                  <div class="bg-white border border-gray-100 rounded-lg p-4">
                    <h3 class="text-lg font-medium mb-3 flex items-center gap-2">
                      <Brain size={18} class="text-purple-600" />
                      자동 사고
                    </h3>
                    
                    {#if selectedDateThoughtRecords.length > 0}
                      <div class="space-y-3">
                        {#each selectedDateThoughtRecords.slice(0, 2) as record}
                          <div class="border border-gray-100 rounded-lg p-3">
                            <div class="flex justify-between items-start mb-2">
                              <p class="font-medium">{record.situation}</p>
                              <span class="text-xs text-gray-500">{record.time}</span>
                            </div>
                            <p class="text-sm text-gray-600 mb-2 line-clamp-2">{record.automaticThoughts}</p>
                            <div class="flex flex-wrap gap-1">
                              {#each record.thoughtPatterns as pattern}
                                <span class="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                                  {getThoughtPatternName(pattern)}
                                </span>
                              {/each}
                            </div>
                          </div>
                        {/each}
                        
                        {#if selectedDateThoughtRecords.length > 2}
                          <button 
                            on:click={() => changeTab('thought-records')}
                            class="text-purple-600 text-sm hover:underline flex items-center gap-1"
                          >
                            더 보기 ({selectedDateThoughtRecords.length - 2}개 더)
                            <ArrowRight size={14} />
                          </button>
                        {/if}
                      </div>
                    {:else}
                      <div class="text-center py-4">
                        <p class="text-gray-500 mb-2">기록된 자동 사고가 없습니다</p>
                        <button 
                          on:click={openThoughtRecordModal}
                          class="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-200 flex items-center gap-1 mx-auto"
                        >
                          <Plus size={14} />
                          자동 사고 기록하기
                        </button>
                      </div>
                    {/if}
                  </div>
                  
                  <!-- 리플렉션 요약 -->
                  <div class="bg-white border border-gray-100 rounded-lg p-4">
                    <h3 class="text-lg font-medium mb-3 flex items-center gap-2">
                      <BookOpen size={18} class="text-green-600" />
                      리플렉션 저널
                    </h3>
                    
                    {#if selectedDateReflectionJournal}
                      <div class="space-y-3">
                        <div class="flex items-center gap-3 mb-3">
                          <div class={`p-2 rounded-full ${getEmotionColor(selectedDateReflectionJournal.overallMood)}`}>
                            <svelte:component this={getEmotionIcon(selectedDateReflectionJournal.overallMood)} size={18} />
                          </div>
                          <div>
                            <span class="font-medium">{getEmotionName(selectedDateReflectionJournal.overallMood)}</span>
                            <span class="text-sm text-gray-500 ml-2">{selectedDateReflectionJournal.moodRating}/10</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 class="text-sm font-medium text-gray-700 mb-1">긍정적 경험</h4>
                          <p class="text-sm text-gray-600 line-clamp-2">{selectedDateReflectionJournal.positiveExperiences}</p>
                        </div>
                        
                        <div>
                          <h4 class="text-sm font-medium text-gray-700 mb-1">도전과 어려움</h4>
                          <p class="text-sm text-gray-600 line-clamp-2">{selectedDateReflectionJournal.challenges}</p>
                        </div>
                        
                        <button 
                          on:click={() => changeTab('reflection-journal')}
                          class="text-green-600 text-sm hover:underline flex items-center gap-1"
                        >
                          전체 저널 보기
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    {:else}
                      <div class="text-center py-4">
                        <p class="text-gray-500 mb-2">기록된 리플렉션 저널이 없습니다</p>
                        <button 
                          on:click={openReflectionJournalModal}
                          class="px-3 py-1.5 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 flex items-center gap-1 mx-auto"
                        >
                          <Plus size={14} />
                          리플렉션 저널 작성하기
                        </button>
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
              
              <!-- 활성 미션 -->
              <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-xl font-medium">활성 CBT 미션</h2>
                  <button 
                    on:click={openCbtMissionModal}
                    class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 flex items-center gap-1"
                  >
                    <Plus size={14} />
                    새 미션 추가
                  </button>
                </div>
                
                {#if activeMissions.length > 0}
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each activeMissions.slice(0, 4) as mission}
                      <div class="bg-white border border-gray-100 rounded-lg p-4">
                        <h3 class="font-medium mb-2">{mission.title}</h3>
                        <p class="text-sm text-gray-600 mb-3">{mission.description}</p>
                        
                        <div class="flex justify-between items-center mb-2">
                          <span class="text-sm text-gray-500">{mission.progress}/{mission.totalDays}일 완료</span>
                          <span class="text-sm text-gray-500">{formatDate(mission.startDate)} ~ {formatDate(mission.endDate)}</span>
                        </div>
                        
                        <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                          <div 
                            class="h-full bg-blue-600 rounded-full" 
                            style="width: {(mission.progress / mission.totalDays) * 100}%"
                          ></div>
                        </div>
                        
                        <div class="flex justify-between">
                          <button 
                            on:click={() => updateMissionProgress(mission.id, true)}
                            class="px-3 py-1.5 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 flex items-center gap-1"
                          >
                            <Check size={14} />
                            오늘 완료
                          </button>
                          
                          <button 
                            on:click={() => updateMissionProgress(mission.id, false)}
                            class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 flex items-center gap-1"
                          >
                            <Undo size={14} />
                            되돌리기
                          </button>
                        </div>
                      </div>
                    {/each}
                  </div>
                  
                  {#if activeMissions.length > 4}
                    <div class="mt-4 text-center">
                      <button 
                        on:click={() => changeTab('cbt-missions')}
                        class="text-blue-600 text-sm hover:underline flex items-center gap-1 mx-auto"
                      >
                        모든 미션 보기 ({activeMissions.length}개)
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  {/if}
                {:else}
                  <div class="text-center py-6 bg-white border border-gray-100 rounded-lg">
                    <p class="text-gray-500 mb-3">활성화된 CBT 미션이 없습니다</p>
                    <button 
                      on:click={openCbtMissionModal}
                      class="px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 flex items-center gap-1 mx-auto"
                    >
                      <Plus size={14} />
                      새 미션 추가하기
                    </button>
                  </div>
                {/if}
              </div>
              
              <!-- 정서 조절 툴킷 -->
              <div>
                <h2 class="text-xl font-medium mb-4">정서 조절 툴킷</h2>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {#each emotionRegulationTechniques as technique}
                    <button 
                      on:click={() => openTechniqueModal(technique)}
                      class="bg-white border border-gray-100 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                    >
                      <div class="flex justify-center mb-3">
                        <div class="p-3 bg-blue-100 rounded-full text-blue-700">
                          <svelte:component this={technique.icon} size={24} />
                        </div>
                      </div>
                      <h3 class="font-medium mb-1">{technique.name}</h3>
                      <p class="text-sm text-gray-600">{technique.description}</p>
                    </button>
                  {/each}
                </div>
              </div>
            </div>
          {:else if activeTab === 'thought-records'}
            <!-- 자동 사고 기록 -->
            <div>
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-medium">{formatDate(selectedDate)} 자동 사고 기록</h2>
                <button 
                  on:click={openThoughtRecordModal}
                  class="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-200 flex items-center gap-1"
                >
                  <Plus size={14} />
                  새 기록 추가
                </button>
              </div>
              
              {#if selectedDateThoughtRecords.length > 0}
                <div class="space-y-6">
                  {#each selectedDateThoughtRecords as record}
                    <div class="bg-white border border-gray-100 rounded-lg p-5">
                      <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-medium">{record.situation}</h3>
                        <span class="text-sm text-gray-500">{record.time}</span>
                      </div>
                      
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <!-- 감정 및 자동 사고 -->
                        <div>
                          <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <Activity size={16} class="text-blue-600" />
                            감정
                          </h4>
                          <div class="flex flex-wrap gap-2 mb-4">
                            {#each record.emotions as emotion}
                              <div class={`px-3 py-1.5 rounded-full flex items-center gap-1 ${getEmotionColor(emotion.id)}`}>
                                <svelte:component this={getEmotionIcon(emotion.id)} size={14} />
                                <span>{getEmotionName(emotion.id)}</span>
                                <span class="text-xs bg-white bg-opacity-50 px-1.5 py-0.5 rounded-full">{emotion.intensity}/10</span>
                              </div>
                            {/each}
                          </div>
                          
                          <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <Brain size={16} class="text-purple-600" />
                            자동 사고
                          </h4>
                          <p class="text-gray-600 bg-gray-50 p-3 rounded-md mb-4">{record.automaticThoughts}</p>
                          
                          <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <AlertCircle size={16} class="text-red-600" />
                            사고 패턴
                          </h4>
                          <div class="flex flex-wrap gap-2">
                            {#each record.thoughtPatterns as pattern}
                              <span class="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                                {getThoughtPatternName(pattern)}
                              </span>
                            {/each}
                          </div>
                        </div>
                        
                        <!-- 증거 및 대안 사고 -->
                        <div>
                          <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <ThumbsUp size={16} class="text-green-600" />
                            지지하는 증거
                          </h4>
                          <p class="text-gray-600 bg-gray-50 p-3 rounded-md mb-4">{record.evidenceFor}</p>
                          
                          <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <ThumbsDown size={16} class="text-red-600" />
                            반박하는 증거
                          </h4>
                          <p class="text-gray-600 bg-gray-50 p-3 rounded-md mb-4">{record.evidenceAgainst}</p>
                          
                          <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <Lightbulb size={16} class="text-yellow-600" />
                            대안적 사고
                          </h4>
                          <p class="text-gray-600 bg-gray-50 p-3 rounded-md mb-4">{record.alternativeThought}</p>
                          
                          {#if record.outcomeEmotions.length > 0}
                            <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                              <RefreshCw size={16} class="text-blue-600" />
                              결과 감정
                            </h4>
                            <div class="flex flex-wrap gap-2">
                              {#each record.outcomeEmotions as emotion}
                                <div class={`px-3 py-1.5 rounded-full flex items-center gap-1 ${getEmotionColor(emotion.id)}`}>
                                  <svelte:component this={getEmotionIcon(emotion.id)} size={14} />
                                  <span>{getEmotionName(emotion.id)}</span>
                                  <span class="text-xs bg-white bg-opacity-50 px-1.5 py-0.5 rounded-full">{emotion.intensity}/10</span>
                                </div>
                              {/each}
                            </div>
                          {/if}
                        </div>
                      </div>
                    </div>
                  {/each}
                </div>
              {:else}
                <div class="text-center py-10 bg-white border border-gray-100 rounded-lg">
                  <p class="text-gray-500 mb-3">이 날짜에 기록된 자동 사고가 없습니다</p>
                  <button 
                    on:click={openThoughtRecordModal}
                    class="px-4 py-2 bg-purple-100 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-200 flex items-center gap-1 mx-auto"
                  >
                    <Plus size={14} />
                    자동 사고 기록하기
                  </button>
                </div>
              {/if}
            </div>
          {:else if activeTab === 'emotion-tracker'}
            <!-- 감정 트래커 -->
            <div>
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-medium">{formatDate(selectedDate)} 감정 기록</h2>
                <button 
                  on:click={openEmotionLogModal}
                  class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 flex items-center gap-1"
                >
                  <Plus size={14} />
                  감정 기록하기
                </button>
              </div>
              
              {#if selectedDateEmotionLog && selectedDateEmotionLog.logs.length > 0}
                <div class="bg-white border border-gray-100 rounded-lg p-5 mb-6">
                  <h3 class="text-lg font-medium mb-4">오늘의 감정 흐름</h3>
                  
                  <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                    <p class="text-gray-500">감정 그래프 영역 (실제 구현 시 차트 라이브러리 사용)</p>
                  </div>
                  
                  <div class="flex flex-wrap gap-3">
                    {#each emotions as emotion}
                      <div class={`px-3 py-1.5 rounded-full flex items-center gap-1 ${getEmotionColor(emotion.id)}`}>
                        <svelte:component this={emotion.icon} size={14} />
                        <span>{emotion.name}</span>
                      </div>
                    {/each}
                  </div>
                </div>
                
                <div class="bg-white border border-gray-100 rounded-lg p-5">
                  <h3 class="text-lg font-medium mb-4">감정 기록 목록</h3>
                  
                  <div class="space-y-4">
                    {#each selectedDateEmotionLog.logs as log}
                      <div class="border border-gray-100 rounded-lg p-4 flex items-start gap-4">
                        <div class={`p-3 rounded-full ${getEmotionColor(log.emotion)} flex-shrink-0`}>
                          <svelte:component this={getEmotionIcon(log.emotion)} size={20} />
                        </div>
                        
                        <div class="flex-1">
                          <div class="flex justify-between items-center mb-2">
                            <div class="flex items-center gap-2">
                              <span class="font-medium">{getEmotionName(log.emotion)}</span>
                              <span class="text-sm bg-gray-100 px-2 py-0.5 rounded-full">{log.intensity}/10</span>
                            </div>
                            <span class="text-sm text-gray-500">{log.time}</span>
                          </div>
                          
                          <p class="text-gray-600">{log.note}</p>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              {:else}
                <div class="text-center py-10 bg-white border border-gray-100 rounded-lg">
                  <p class="text-gray-500 mb-3">이 날짜에 기록된 감정이 없습니다</p>
                  <button 
                    on:click={openEmotionLogModal}
                    class="px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 flex items-center gap-1 mx-auto"
                  >
                    <Plus size={14} />
                    감정 기록하기
                  </button>
                </div>
              {/if}
            </div>
          {:else if activeTab === 'reflection-journal'}
            <!-- 리플렉션 저널 -->
            <div>
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-medium">{formatDate(selectedDate)} 리플렉션 저널</h2>
                <button 
                  on:click={openReflectionJournalModal}
                  class="px-3 py-1.5 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 flex items-center gap-1"
                >
                  <Plus size={14} />
                  저널 작성하기
                </button>
              </div>
              
              {#if selectedDateReflectionJournal}
                <div class="bg-white border border-gray-100 rounded-lg p-5">
                  <div class="flex items-center gap-3 mb-6">
                    <div class={`p-3 rounded-full ${getEmotionColor(selectedDateReflectionJournal.overallMood)}`}>
                      <svelte:component this={getEmotionIcon(selectedDateReflectionJournal.overallMood)} size={24} />
                    </div>
                    <div>
                      <h3 class="text-lg font-medium">오늘의 전반적인 기분</h3>
                      <div class="flex items-center gap-2">
                        <span class="font-medium">{getEmotionName(selectedDateReflectionJournal.overallMood)}</span>
                        <span class="text-sm bg-gray-100 px-2 py-0.5 rounded-full">{selectedDateReflectionJournal.moodRating}/10</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <ThumbsUp size={16} class="text-green-600" />
                        긍정적 경험
                      </h4>
                      <p class="text-gray-600 bg-gray-50 p-3 rounded-md">{selectedDateReflectionJournal.positiveExperiences}</p>
                    </div>
                    
                    <div>
                      <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <AlertCircle size={16} class="text-red-600" />
                        도전과 어려움
                      </h4>
                      <p class="text-gray-600 bg-gray-50 p-3 rounded-md">{selectedDateReflectionJournal.challenges}</p>
                    </div>
                  </div>
                  
                  <div class="mb-6">
                    <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <Brain size={16} class="text-purple-600" />
                      인식된 사고 패턴
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      {#each selectedDateReflectionJournal.thoughtPatterns as pattern}
                        <div class="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full">
                          <span>{getThoughtPatternName(pattern)}</span>
                          <HelpCircle size={14} class="cursor-help" />
                        </div>
                      {/each}
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Bookmark size={16} class="text-blue-600" />
                        대처 전략
                      </h4>
                      <p class="text-gray-600 bg-gray-50 p-3 rounded-md">{selectedDateReflectionJournal.copingStrategies}</p>
                    </div>
                    
                    <div>
                      <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Lightbulb size={16} class="text-yellow-600" />
                        인사이트
                      </h4>
                      <p class="text-gray-600 bg-gray-50 p-3 rounded-md">{selectedDateReflectionJournal.insights}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <Calendar size={16} class="text-green-600" />
                      내일을 위한 의도
                    </h4>
                    <p class="text-gray-600 bg-gray-50 p-3 rounded-md">{selectedDateReflectionJournal.tomorrowIntentions}</p>
                  </div>
                </div>
              {:else}
                <div class="text-center py-10 bg-white border border-gray-100 rounded-lg">
                  <p class="text-gray-500 mb-3">이 날짜에 작성된 리플렉션 저널이 없습니다</p>
                  <button 
                    on:click={openReflectionJournalModal}
                    class="px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 flex items-center gap-1 mx-auto"
                  >
                    <Plus size={14} />
                    리플렉션 저널 작성하기
                  </button>
                </div>
              {/if}
            </div>
          {:else if activeTab === 'emotion-toolkit'}
            <!-- 정서 조절 툴킷 -->
            <div>
              <h2 class="text-xl font-medium mb-6">정서 조절 툴킷</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <!-- 호흡 명상 -->
                <div class="bg-white border border-gray-100 rounded-lg p-5">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="p-3 bg-blue-100 rounded-full text-blue-700">
                      <Wind size={24} />
                    </div>
                    <h3 class="text-lg font-medium">호흡 명상</h3>
                  </div>
                  
                  <p class="text-gray-600 mb-4">3분 호흡 명상으로 현재에 집중하고 마음을 안정시키세요.</p>
                  
                  <button 
                    on:click={() => openTechniqueModal(emotionRegulationTechniques[0])}
                    class="w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 flex items-center justify-center gap-2"
                  >
                    <Play size={16} />
                    호흡 명상 시작하기
                  </button>
                </div>
                
                <!-- 생각 도전하기 -->
                <div class="bg-white border border-gray-100 rounded-lg p-5">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="p-3 bg-purple-100 rounded-full text-purple-700">
                      <Brain size={24} />
                    </div>
                    <h3 class="text-lg font-medium">생각 도전하기</h3>
                  </div>
                  
                  <p class="text-gray-600 mb-4">부정적 생각에 도전하고 대안적 관점을 찾아보세요.</p>
                  
                  <button 
                    on:click={() => openTechniqueModal(emotionRegulationTechniques[1])}
                    class="w-full py-2 px-4 bg-purple-100 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-200 flex items-center justify-center gap-2"
                  >
                    <Lightbulb size={16} />
                    생각 도전 워크시트
                  </button>
                </div>
                
                <!-- 그라운딩 기법 -->
                <div class="bg-white border border-gray-100 rounded-lg p-5">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="p-3 bg-green-100 rounded-full text-green-700">
                      <Bookmark size={24} />
                    </div>
                    <h3 class="text-lg font-medium">그라운딩 기법</h3>
                  </div>
                  
                  <p class="text-gray-600 mb-4">5-4-3-2-1 감각 인식으로 현재에 집중하세요.</p>
                  
                  <button 
                    on:click={() => openTechniqueModal(emotionRegulationTechniques[2])}
                    class="w-full py-2 px-4 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 flex items-center justify-center gap-2"
                  >
                    <Bookmark size={16} />
                    그라운딩 연습하기
                  </button>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- 행동 활성화 -->
                <div class="bg-white border border-gray-100 rounded-lg p-5">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="p-3 bg-yellow-100 rounded-full text-yellow-700">
                      <Play size={24} />
                    </div>
                    <h3 class="text-lg font-medium">행동 활성화</h3>
                  </div>
                  
                  <p class="text-gray-600 mb-4">기분을 개선하는 활동을 시작하세요. 작은 행동이 큰 변화를 만듭니다.</p>
                  
                  <button 
                    on:click={() => openTechniqueModal(emotionRegulationTechniques[3])}
                    class="w-full py-2 px-4 bg-yellow-100 text-yellow-700 rounded-md text-sm font-medium hover:bg-yellow-200 flex items-center justify-center gap-2"
                  >
                    <Play size={16} />
                    행동 활성화 시작하기
                  </button>
                </div>
                
                <!-- 자기 자비 -->
                <div class="bg-white border border-gray-100 rounded-lg p-5">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="p-3 bg-red-100 rounded-full text-red-700">
                      <Heart size={24} />
                    </div>
                    <h3 class="text-lg font-medium">자기 자비</h3>
                  </div>
                  
                  <p class="text-gray-600 mb-4">자신에게 친절하고 이해심 있게 대하는 연습을 해보세요.</p>
                  
                  <button 
                    on:click={() => openTechniqueModal(emotionRegulationTechniques[4])}
                    class="w-full py-2 px-4 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 flex items-center justify-center gap-2"
                  >
                    <Heart size={16} />
                    자기 자비 연습하기
                  </button>
                </div>
              </div>
            </div>
          {:else if activeTab === 'cbt-missions'}
            <!-- CBT 미션 -->
            <div>
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-medium">CBT 미션</h2>
                <button 
                  on:click={openCbtMissionModal}
                  class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 flex items-center gap-1"
                >
                  <Plus size={14} />
                  새 미션 추가
                </button>
              </div>
              
              <!-- 활성 미션 -->
              {#if activeMissions.length > 0}
                <div class="mb-8">
                  <h3 class="text-lg font-medium mb-4 flex items-center gap-2">
                    <Play size={18} class="text-blue-600" />
                    진행 중인 미션
                  </h3>
                  
                  <div class="space-y-4">
                    {#each activeMissions as mission}
                      <div class="bg-white border border-gray-100 rounded-lg p-4">
                        <div class="flex justify-between items-start mb-3">
                          <h4 class="font-medium text-lg">{mission.title}</h4>
                          <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-500">{formatDate(mission.startDate)} ~ {formatDate(mission.endDate)}</span>
                          </div>
                        </div>
                        
                        <p class="text-gray-600 mb-4">{mission.description}</p>
                        
                        <div class="flex justify-between items-center mb-2">
                          <span class="text-sm text-gray-500">{mission.progress}/{mission.totalDays}일 완료</span>
                          <span class="text-sm font-medium text-blue-700">{Math.round((mission.progress / mission.totalDays) * 100)}% 달성</span>
                        </div>
                        
                        <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                          <div 
                            class="h-full bg-blue-600 rounded-full" 
                            style="width: {(mission.progress / mission.totalDays) * 100}%"
                          ></div>
                        </div>
                        
                        <div class="flex justify-between">
                          <button 
                            on:click={() => updateMissionProgress(mission.id, true)}
                            class="px-3 py-1.5 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 flex items-center gap-1"
                          >
                            <Check size={14} />
                            오늘 완료
                          </button>
                          
                          <div class="flex gap-2">
                            <button 
                              on:click={() => updateMissionProgress(mission.id, false)}
                              class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 flex items-center gap-1"
                            >
                              <Undo size={14} />
                              되돌리기
                            </button>
                            
                            <button 
                              on:click={() => deleteTask(mission.id)}
                              class="px-3 py-1.5 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 flex items-center gap-1"
                            >
                              <Trash size={14} />
                              삭제
                            </button>
                          </div>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              {:else}
                <div class="text-center py-6 bg-white border border-gray-100 rounded-lg mb-8">
                  <p class="text-gray-500 mb-3">진행 중인 CBT 미션이 없습니다</p>
                  <button 
                    on:click={openCbtMissionModal}
                    class="px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 flex items-center gap-1 mx-auto"
                  >
                    <Plus size={14} />
                    새 미션 추가하기
                  </button>
                </div>
              {/if}
              
              <!-- 완료된 미션 -->
              {#if completedMissions.length > 0}
                <div>
                  <h3 class="text-lg font-medium mb-4 flex items-center gap-2">
                    <CheckCircle size={18} class="text-green-600" />
                    완료된 미션
                  </h3>
                  
                  <div class="space-y-4">
                    {#each completedMissions as mission}
                      <div class="bg-white border border-gray-100 rounded-lg p-4">
                        <div class="flex justify-between items-start mb-3">
                          <div class="flex items-center gap-2">
                            <h4 class="font-medium text-lg">{mission.title}</h4>
                            <span class="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">완료됨</span>
                          </div>
                          <span class="text-sm text-gray-500">{formatDate(mission.startDate)} ~ {formatDate(mission.endDate)}</span>
                        </div>
                        
                        <p class="text-gray-600 mb-4">{mission.description}</p>
                        
                        <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div class="h-full bg-green-600 rounded-full w-full"></div>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </main>
  </div>
  
  <!-- 자동 사고 기록 모달 -->
  {#if showThoughtRecordModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-900">자동 사고 기록</h2>
            <button 
              on:click={() => showThoughtRecordModal = false}
              class="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
          
          <form on:submit|preventDefault={addThoughtRecord} class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="thought-date" class="block text-sm font-medium text-gray-700">날짜</label>
                <input 
                  id="thought-date" 
                  type="date" 
                  bind:value={newThoughtRecord.date}
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label for="thought-time" class="block text-sm font-medium text-gray-700">시간</label>
                <input 
                  id="thought-time" 
                  type="time" 
                  bind:value={newThoughtRecord.time}
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label for="thought-situation" class="block text-sm font-medium text-gray-700">상황</label>
              <input 
                id="thought-situation" 
                type="text" 
                bind:value={newThoughtRecord.situation}
                required
                placeholder="어떤 상황이었나요?"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">감정</label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {#each emotions as emotion}
                  <button 
                    type="button"
                    on:click={() => newThoughtRecord.emotions = selectEmotion(emotion.id, newThoughtRecord.emotions)}
                    class={`flex items-center gap-2 p-2 rounded-md border ${newThoughtRecord.emotions.some(e => e.id === emotion.id) ? `${getEmotionColor(emotion.id)} border-transparent` : 'border-gray-300 hover:bg-gray-50'}`}
                  >
                    <span class="text-xl">{emotion.emoji}</span>
                    <span>{emotion.name}</span>
                  </button>
                {/each}
              </div>
              
              {#if newThoughtRecord.emotions.length > 0}
                <div class="space-y-3">
                  {#each newThoughtRecord.emotions as emotion}
                    <div class="flex items-center gap-3">
                      <span class="text-sm font-medium">{getEmotionName(emotion.id)}</span>
                      <div class="flex-1">
                        <input 
                          type="range" 
                          min="1" 
                          max="10" 
                          bind:value={emotion.intensity}
                          on:input={() => newThoughtRecord.emotions = changeEmotionIntensity(emotion.id, emotion.intensity, newThoughtRecord.emotions)}
                          class="w-full"
                        />
                      </div>
                      <span class="text-sm">{emotion.intensity}/10</span>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
            
            <div>
              <label for="thought-automatic" class="block text-sm font-medium text-gray-700">자동적 사고</label>
              <textarea 
                id="thought-automatic" 
                bind:value={newThoughtRecord.automaticThoughts}
                required
                placeholder="어떤 생각이 떠올랐나요?"
                rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">사고 패턴</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {#each thoughtPatterns as pattern}
                  <button 
                    type="button"
                    on:click={() => newThoughtRecord.thoughtPatterns = selectThoughtPattern(pattern.id, newThoughtRecord.thoughtPatterns)}
                    class={`flex items-center justify-between p-2 rounded-md border text-left ${newThoughtRecord.thoughtPatterns.includes(pattern.id) ? 'bg-purple-100 text-purple-700 border-purple-300' : 'border-gray-300 hover:bg-gray-50'}`}
                  >
                    <span>{pattern.name}</span>
                    {#if newThoughtRecord.thoughtPatterns.includes(pattern.id)}
                      <Check size={16} />
                    {/if}
                  </button>
                {/each}
              </div>
            </div>
            
            <div>
              <label for="thought-evidence-for" class="block text-sm font-medium text-gray-700">지지하는 증거</label>
              <textarea 
                id="thought-evidence-for" 
                bind:value={newThoughtRecord.evidenceFor}
                placeholder="이 생각을 지지하는 증거는 무엇인가요?"
                rows="2"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div>
              <label for="thought-evidence-against" class="block text-sm font-medium text-gray-700">반박하는 증거</label>
              <textarea 
                id="thought-evidence-against" 
                bind:value={newThoughtRecord.evidenceAgainst}
                placeholder="이 생각을 반박하는 증거는 무엇인가요?"
                rows="2"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div>
              <label for="thought-alternative" class="block text-sm font-medium text-gray-700">대안적 사고</label>
              <textarea 
                id="thought-alternative" 
                bind:value={newThoughtRecord.alternativeThought}
                placeholder="더 균형 잡힌 생각은 무엇일까요?"
                rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">결과 감정</label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {#each emotions as emotion}
                  <button 
                    type="button"
                    on:click={() => newThoughtRecord.outcomeEmotions = selectEmotion(emotion.id, newThoughtRecord.outcomeEmotions)}
                    class={`flex items-center gap-2 p-2 rounded-md border ${newThoughtRecord.outcomeEmotions.some(e => e.id === emotion.id) ? `${getEmotionColor(emotion.id)} border-transparent` : 'border-gray-300 hover:bg-gray-50'}`}
                  >
                    <span class="text-xl">{emotion.emoji}</span>
                    <span>{emotion.name}</span>
                  </button>
                {/each}
              </div>
              
              {#if newThoughtRecord.outcomeEmotions.length > 0}
                <div class="space-y-3">
                  {#each newThoughtRecord.outcomeEmotions as emotion}
                    <div class="flex items-center gap-3">
                      <span class="text-sm font-medium">{getEmotionName(emotion.id)}</span>
                      <div class="flex-1">
                        <input 
                          type="range" 
                          min="1" 
                          max="10" 
                          bind:value={emotion.intensity}
                          on:input={() => newThoughtRecord.outcomeEmotions = changeEmotionIntensity(emotion.id, emotion.intensity, newThoughtRecord.outcomeEmotions)}
                          class="w-full"
                        />
                      </div>
                      <span class="text-sm">{emotion.intensity}/10</span>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
            
            <div class="flex justify-end gap-3 pt-4">
              <button 
                type="button"
                on:click={() => showThoughtRecordModal = false}
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
  
  <!-- 감정 기록 모달 -->
  {#if showEmotionLogModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-900">감정 기록하기</h2>
            <button 
              on:click={() => showEmotionLogModal = false}
              class="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
          
          <form on:submit|preventDefault={addEmotionLog} class="space-y-4">
            <div>
              <label for="emotion-time" class="block text-sm font-medium text-gray-700">시간</label>
              <input 
                id="emotion-time" 
                type="time" 
                bind:value={newEmotionLog.time}
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">감정</label>
              <div class="grid grid-cols-4 gap-2">
                {#each emotions as emotion}
                  <button 
                    type="button"
                    on:click={() => newEmotionLog.emotion = emotion.id}
                    class={`flex flex-col items-center p-2 rounded-md border ${newEmotionLog.emotion === emotion.id ? `${getEmotionColor(emotion.id)} border-transparent` : 'border-gray-300 hover:bg-gray-50'}`}
                  >
                    <span class="text-2xl">{emotion.emoji}</span>
                    <span class="text-xs mt-1">{emotion.name}</span>
                  </button>
                {/each}
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">강도</label>
              <div class="flex items-center gap-3">
                <span class="text-sm">약함</span>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  bind:value={newEmotionLog.intensity}
                  class="flex-1"
                />
                <span class="text-sm">강함</span>
                <span class="ml-2 font-medium">{newEmotionLog.intensity}</span>
              </div>
            </div>
            
            <div>
              <label for="emotion-note" class="block text-sm font-medium text-gray-700">메모</label>
              <textarea 
                id="emotion-note" 
                bind:value={newEmotionLog.note}
                required
                placeholder="어떤 상황에서 이 감정을 느꼈나요?"
                rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div class="flex justify-end gap-3 pt-4">
              <button 
                type="button"
                on:click={() => showEmotionLogModal = false}
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
  
  <!-- 리플렉션 저널 모달 -->
  {#if showReflectionJournalModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-900">리플렉션 저널 작성</h2>
            <button 
              on:click={() => showReflectionJournalModal = false}
              class="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
          
          <form on:submit|preventDefault={addReflectionJournal} class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">오늘의 전반적인 기분</label>
              <div class="grid grid-cols-4 gap-2 mb-3">
                {#each emotions as emotion}
                  <button 
                    type="button"
                    on:click={() => newReflectionJournal.overallMood = emotion.id}
                    class={`flex flex-col items-center p-2 rounded-md border ${newReflectionJournal.overallMood === emotion.id ? `${getEmotionColor(emotion.id)} border-transparent` : 'border-gray-300 hover:bg-gray-50'}`}
                  >
                    <span class="text-2xl">{emotion.emoji}</span>
                    <span class="text-xs mt-1">{emotion.name}</span>
                  </button>
                {/each}
              </div>
              
              <div class="flex items-center gap-3">
                <span class="text-sm">1</span>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  bind:value={newReflectionJournal.moodRating}
                  class="flex-1"
                />
                <span class="text-sm">10</span>
                <span class="ml-2 font-medium">{newReflectionJournal.moodRating}</span>
              </div>
            </div>
            
            <div>
              <label for="journal-positive" class="block text-sm font-medium text-gray-700">긍정적 경험</label>
              <textarea 
                id="journal-positive" 
                bind:value={newReflectionJournal.positiveExperiences}
                required
                placeholder="오늘 있었던 긍정적인 경험은 무엇인가요?"
                rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div>
              <label for="journal-challenges" class="block text-sm font-medium text-gray-700">도전과 어려움</label>
              <textarea 
                id="journal-challenges" 
                bind:value={newReflectionJournal.challenges}
                required
                placeholder="오늘 겪은 어려움이나 도전은 무엇인가요?"
                rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">인식된 사고 패턴</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {#each thoughtPatterns as pattern}
                  <button 
                    type="button"
                    on:click={() => newReflectionJournal.thoughtPatterns = selectThoughtPattern(pattern.id, newReflectionJournal.thoughtPatterns)}
                    class={`flex items-center justify-between p-2 rounded-md border text-left ${newReflectionJournal.thoughtPatterns.includes(pattern.id) ? 'bg-purple-100 text-purple-700 border-purple-300' : 'border-gray-300 hover:bg-gray-50'}`}
                  >
                    <span>{pattern.name}</span>
                    {#if newReflectionJournal.thoughtPatterns.includes(pattern.id)}
                      <Check size={16} />
                    {/if}
                  </button>
                {/each}
              </div>
            </div>
            
            <div>
              <label for="journal-coping" class="block text-sm font-medium text-gray-700">대처 전략</label>
              <textarea 
                id="journal-coping" 
                bind:value={newReflectionJournal.copingStrategies}
                placeholder="어려움에 어떻게 대처했나요?"
                rows="2"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div>
              <label for="journal-insights" class="block text-sm font-medium text-gray-700">인사이트</label>
              <textarea 
                id="journal-insights" 
                bind:value={newReflectionJournal.insights}
                placeholder="오늘 깨달은 점이 있다면 무엇인가요?"
                rows="2"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div>
              <label for="journal-tomorrow" class="block text-sm font-medium text-gray-700">내일을 위한 의도</label>
              <textarea 
                id="journal-tomorrow" 
                bind:value={newReflectionJournal.tomorrowIntentions}
                placeholder="내일은 어떻게 하고 싶나요?"
                rows="2"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div class="flex justify-end gap-3 pt-4">
              <button 
                type="button"
                on:click={() => showReflectionJournalModal = false}
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
  
  <!-- CBT 미션 모달 -->
  {#if showCbtMissionModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-900">CBT 미션 추가</h2>
            <button 
              on:click={() => showCbtMissionModal = false}
              class="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
          
          <form on:submit|preventDefault={addCbtMission} class="space-y-4">
            <div>
              <label for="mission-title" class="block text-sm font-medium text-gray-700">미션 제목</label>
              <input 
                id="mission-title" 
                type="text" 
                bind:value={newCbtMission.title}
                required
                placeholder="예: 과도한 일반화 인식하기"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label for="mission-description" class="block text-sm font-medium text-gray-700">미션 설명</label>
              <textarea 
                id="mission-description" 
                bind:value={newCbtMission.description}
                required
                placeholder="예: 하루에 한 번 과도한 일반화 사고 패턴을 인식하고 기록하기"
                rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="mission-start-date" class="block text-sm font-medium text-gray-700">시작일</label>
                <input 
                  id="mission-start-date" 
                  type="date" 
                  bind:value={newCbtMission.startDate}
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label for="mission-end-date" class="block text-sm font-medium text-gray-700">종료일</label>
                <input 
                  id="mission-end-date" 
                  type="date" 
                  bind:value={newCbtMission.endDate}
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div class="flex justify-end gap-3 pt-4">
              <button 
                type="button"
                on:click={() => showCbtMissionModal = false}
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
  
  <!-- 정서 조절 기법 모달 -->
  {#if showTechniqueModal && selectedTechnique}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-blue-100 rounded-full text-blue-700">
                <svelte:component this={selectedTechnique.icon} size={24} />
              </div>
              <h2 class="text-lg font-medium text-gray-900">{selectedTechnique.name}</h2>
            </div>
            <button 
              on:click={() => showTechniqueModal = false}
              class="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
          
          {#if selectedTechnique.id === 'breathing'}
            <!-- 호흡 명상 -->
            <div class="text-center">
              <p class="text-gray-600 mb-6">{selectedTechnique.description}</p>
              
              {#if breathingExerciseActive}
                <div class="mb-6">
                  <div class="w-48 h-48 mx-auto rounded-full border-4 border-blue-500 flex items-center justify-center relative">
                    <div class="absolute inset-0 rounded-full bg-blue-100 opacity-50" style="transform: scale({breathingPhase === 'inhale' ? 0.8 + (breathingSeconds % 4) * 0.05 : breathingPhase === 'hold' ? 1 : 1 - (breathingSeconds % 8) * 0.05})"></div>
                    <div class="text-2xl font-bold text-blue-700">
                      {#if breathingPhase === 'inhale'}
                        들이쉬기
                      {:else if breathingPhase === 'hold'}
                        참기
                      {:else}
                        내쉬기
                      {/if}
                    </div>
                  </div>
                  
                  <div class="mt-4 text-lg font-medium">
                    {Math.floor((totalBreathingTime - breathingSeconds) / 60)}:{String((totalBreathingTime - breathingSeconds) % 60).padStart(2, '0')}
                  </div>
                </div>
                
                <button 
                  on:click={endBreathingExercise}
                  class="py-2 px-4 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 flex items-center gap-2 mx-auto"
                >
                  <XCircle size={16} />
                  종료하기
                </button>
              {:else}
                <div class="space-y-4 mb-6">
                  <div class="bg-gray-50 p-4 rounded-lg text-left">
                    <h3 class="font-medium mb-2">호흡 명상 방법</h3>
                    <ol class="list-decimal pl-5 space-y-2 text-gray-600">
                      <li>편안한 자세로 앉거나 누워서 눈을 감습니다.</li>
                      <li>4초 동안 코로 천천히 숨을 들이마십니다.</li>
                      <li>3초 동안 숨을 참습니다.</li>
                      <li>8초 동안 입으로 천천히 숨을 내쉽니다.</li>
                      <li>이 과정을 3분 동안 반복합니다.</li>
                    </ol>
                  </div>
                  
                  <div class="bg-blue-50 p-4 rounded-lg text-left">
                    <h3 class="font-medium mb-2 text-blue-700">효과</h3>
                    <ul class="list-disc pl-5 space-y-2 text-gray-600">
                      <li>불안감 감소</li>
                      <li>스트레스 호르몬 감소</li>
                      <li>현재에 집중하는 능력 향상</li>
                      <li>마음 안정</li>
                    </ul>
                  </div>
                </div>
                
                <button 
                  on:click={startBreathingExercise}
                  class="py-2 px-4 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 flex items-center gap-2 mx-auto"
                >
                  <Play size={16} />
                  호흡 명상 시작하기 (3분)
                </button>
              {/if}
            </div>
          {:else if selectedTechnique.id === 'thought-challenge'}
            <!-- 생각 도전하기 -->
            <div>
              <p class="text-gray-600 mb-6">{selectedTechnique.description}</p>
              
              <div class="space-y-4 mb-6">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="font-medium mb-3">생각 도전 워크시트</h3>
                  
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">부정적인 생각</label>
                      <textarea 
                        placeholder="어떤 부정적인 생각이 떠오르나요?"
                        rows="2"
                        class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">이 생각이 사실인 증거</label>
                      <textarea 
                        placeholder="이 생각을 지지하는 증거는 무엇인가요?"
                        rows="2"
                        class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">이 생각이 사실이 아닌 증거</label>
                      <textarea 
                        placeholder="이 생각을 반박하는 증거는 무엇인가요?"
                        rows="2"
                        class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">대안적 관점</label>
                      <textarea 
                        placeholder="더 균형 잡힌 관점은 무엇일까요?"
                        rows="2"
                        class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div class="bg-purple-50 p-4 rounded-lg">
                  <h3 class="font-medium mb-2 text-purple-700">자주 나타나는 사고 왜곡</h3>
                  <div class="space-y-2 text-sm text-gray-600">
                    <p><span class="font-medium">흑백논리:</span> 모든 것을 성공 아니면 실패로 보는 사고방식</p>
                    <p><span class="font-medium">과도한 일반화:</span> 한 가지 부정적 사건을 모든 상황의 패턴으로 보는 것</p>
                    <p><span class="font-medium">재앙화:</span> 최악의 결과를 예상하고 그것이 가장 가능성이 높다고 생각하는 것</p>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end">
                <button 
                  class="py-2 px-4 bg-purple-100 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-200 flex items-center gap-2"
                >
                  <Save size={16} />
                  저장하기
                </button>
              </div>
            </div>
          {:else if selectedTechnique.id === 'grounding'}
            <!-- 그라운딩 기법 -->
            <div>
              <p class="text-gray-600 mb-6">{selectedTechnique.description}</p>
              
              <div class="space-y-4 mb-6">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="font-medium mb-3">5-4-3-2-1 그라운딩 기법</h3>
                  
                  <div class="space-y-3 text-gray-600">
                    <p class="flex items-start gap-2">
                      <span class="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">5</span>
                      <span><strong>볼 수 있는 것 5가지</strong>를 찾아보세요. 주변에서 볼 수 있는 다섯 가지 물건을 찾아 자세히 관찰하세요.</span>
                    </p>
                    
                    <p class="flex items-start gap-2">
                      <span class="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">4</span>
                      <span><strong>만질 수 있는 것 4가지</strong>를 찾아보세요. 손으로 만질 수 있는 네 가지 물건이나 질감을 느껴보세요.</span>
                    </p>
                    
                    <p class="flex items-start gap-2">
                      <span class="bg-purple-100 text-purple-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">3</span>
                      <span><strong>들을 수 있는 것 3가지</strong>를 찾아보세요. 주변에서 들리는 세 가지 소리에 집중해보세요.</span>
                    </p>
                    
                    <p class="flex items-start gap-2">
                      <span class="bg-yellow-100 text-yellow-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">2</span>
                      <span><strong>맡을 수 있는 것 2가지</strong>를 찾아보세요. 주변에서 맡을 수 있는 두 가지 냄새에 집중해보세요.</span>
                    </p>
                    
                    <p class="flex items-start gap-2">
                      <span class="bg-red-100 text-red-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">1</span>
                      <span><strong>맛볼 수 있는 것 1가지</strong>를 찾아보세요. 입 안의 맛이나 마실 수 있는 것에 집중해보세요.</span>
                    </p>
                  </div>
                </div>
                
                <div class="bg-green-50 p-4 rounded-lg">
                  <h3 class="font-medium mb-2 text-green-700">효과</h3>
                  <ul class="list-disc pl-5 space-y-2 text-gray-600">
                    <li>불안이나 공황 상태에서 벗어나는 데 도움</li>
                    <li>현재 순간에 집중하도록 도움</li>
                    <li>부정적인 생각의 순환을 끊는 데 효과적</li>
                    <li>스트레스 반응 감소</li>
                  </ul>
                </div>
              </div>
              
              <div class="flex justify-end">
                <button 
                  on:click={() => showTechniqueModal = false}
                  class="py-2 px-4 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200"
                >
                  확인
                </button>
              </div>
            </div>
          {:else if selectedTechnique.id === 'behavioral-activation'}
            <!-- 행동 활성화 -->
            <div>
              <p class="text-gray-600 mb-6">{selectedTechnique.description}</p>
              
              <div class="space-y-4 mb-6">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="font-medium mb-3">행동 활성화 단계</h3>
                  
                  <ol class="list-decimal pl-5 space-y-3 text-gray-600">
                    <li>
                      <strong>기분 좋아지는 활동 목록 만들기</strong>
                      <p class="text-sm mt-1">과거에 즐겼던 활동, 성취감을 주는 활동, 의미 있는 활동 등을 적어보세요.</p>
                    </li>
                    
                    <li>
                      <strong>작은 목표 설정하기</strong>
                      <p class="text-sm mt-1">달성 가능한 작은 목표부터 시작하세요. 예: "10분 동안 산책하기"</p>
                    </li>
                    
                    <li>
                      <strong>일정에 활동 추가하기</strong>
                      <p class="text-sm mt-1">선택한 활동을 언제 할지 구체적인 시간을 정해 일정에 추가하세요.</p>
                    </li>
                    
                    <li>
                      <strong>활동 실행하기</strong>
                      <p class="text-sm mt-1">계획한 활동을 실행하세요. 기분이 좋지 않더라도 계획대로 해보세요.</p>
                    </li>
                    
                    <li>
                      <strong>활동 전후 기분 기록하기</strong>
                      <p class="text-sm mt-1">활동 전후의 기분을 1-10점으로 평가하고 기록해보세요.</p>
                    </li>
                  </ol>
                </div>
                
                <div class="bg-yellow-50 p-4 rounded-lg">
                  <h3 class="font-medium mb-2 text-yellow-700">기분 좋아지는 활동 예시</h3>
                  <div class="grid grid-cols-2 gap-2 text-gray-600">
                    <div class="flex items-center gap-2">
                      <Check size={16} class="text-green-500" />
                      <span>가벼운 산책하기</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Check size={16} class="text-green-500" />
                      <span>좋아하는 음악 듣기</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Check size={16} class="text-green-500" />
                      <span>친구에게 연락하기</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Check size={16} class="text-green-500" />
                      <span>간단한 스트레칭</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Check size={16} class="text-green-500" />
                      <span>맛있는 음식 먹기</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Check size={16} class="text-green-500" />
                      <span>창작 활동하기</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Check size={16} class="text-green-500" />
                      <span>반려동물과 놀기</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Check size={16} class="text-green-500" />
                      <span>정원 가꾸기</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end">
                <button 
                  on:click={() => showTechniqueModal = false}
                  class="py-2 px-4 bg-yellow-100 text-yellow-700 rounded-md text-sm font-medium hover:bg-yellow-200"
                >
                  확인
                </button>
              </div>
            </div>
          {:else if selectedTechnique.id === 'self-compassion'}
            <!-- 자기 자비 -->
            <div>
              <p class="text-gray-600 mb-6">{selectedTechnique.description}</p>
              
              <div class="space-y-4 mb-6">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="font-medium mb-3">자기 자비의 세 가지 요소</h3>
                  
                  <div class="space-y-3 text-gray-600">
                    <div class="bg-red-50 p-3 rounded-md">
                      <h4 class="font-medium text-red-700 mb-1">1. 자기 친절</h4>
                      <p>자신에게 비판적이기보다 이해하고 친절하게 대하기</p>
                    </div>
                    
                    <div class="bg-blue-50 p-3 rounded-md">
                      <h4 class="font-medium text-blue-700 mb-1">2. 보편적 인간성</h4>
                      <p>고통과 실패는 모든 사람이 경험하는 공통된 인간 경험임을 인식하기</p>
                    </div>
                    
                    <div class="bg-green-50 p-3 rounded-md">
                      <h4 class="font-medium text-green-700 mb-1">3. 마음챙김</h4>
                      <p>부정적인 감정에 압도되거나 회피하지 않고 균형 있게 인식하기</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-red-50 p-4 rounded-lg">
                  <h3 class="font-medium mb-3 text-red-700">자기 자비 연습</h3>
                  
                  <div class="space-y-4">
                    <div>
                      <h4 class="text-sm font-medium text-gray-700 mb-1">자기 친절 문구 작성하기</h4>
                      <textarea 
                        placeholder="어려운 상황에서 친구에게 해줄 법한 따뜻한 말을 자신에게 해보세요."
                        rows="2"
                        class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      ></textarea>
                    </div>
                    
                    <div>
                      <h4 class="text-sm font-medium text-gray-700 mb-1">자비로운 손길</h4>
                      <p class="text-sm text-gray-600 mb-2">가슴이나 뺨에 손을 대고 따뜻함을 느껴보세요. 이것은 자기 위로의 방법입니다.</p>
                    </div>
                    
                    <div>
                      <h4 class="text-sm font-medium text-gray-700 mb-1">자비 명상</h4>
                      <p class="text-sm text-gray-600">다음 문구를 천천히 반복해보세요:</p>
                      <div class="bg-white p-3 rounded-md mt-2 text-center italic">
                        "내가 안전하기를"<br>
                        "내가 평화롭기를"<br>
                        "내가 건강하기를"<br>
                        "내가 행복하기를"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end">
                <button 
                  on:click={() => showTechniqueModal = false}
                  class="py-2 px-4 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200"
                >
                  확인
                </button>
              </div>
            </div>
          {/if}
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
    
    .bg-purple-50 {
      background-color: #F5F3FF;
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
    
    .text-yellow-700 {
      color: #B45309;
    }
    
    .bg-red-50 {
      background-color: #FEF2F2;
    }
    
    .bg-red-100 {
      background-color: #FEE2E2;
    }
    
    .text-red-700 {
      color: #B91C1C;
    }
    
    .bg-orange-100 {
      background-color: #FFEDD5;
    }
    
    .text-orange-700 {
      color: #C2410C;
    }
    
    .bg-indigo-100 {
      background-color: #E0E7FF;
    }
    
    .text-indigo-700 {
      color: #4338CA;
    }
    
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  </style>
  
  