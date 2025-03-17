import type { Category, Habit } from "$lib/type/habits/habits";
import type { GoalRecord, HabitRecord, TaskRecord } from "$lib/type/record/Record";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, url }) => {

    const goalRecords:GoalRecord[]=[
        {
            date: '2025-03-13',
            goals: [
                {
                    id:0,
                    title: "저녁만들기",
                    progress: 33,
                    isOpen: true,
                    steps: [
                    { 
                        id: 1, 
                        title: "재료 준비하기", 
                        startTime: "2025-03-13 09:50:43.406", 
                        status: "in-progress",
                        estimatedMinutes: 100,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 2, 
                        title: "요리 시작하기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 45,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 3, 
                        title: "식탁 차리기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 10,
                        isPaused: false,
                        totalPausedMinutes: 0
                    }
                    ]
                },
                {
                    id:1,
                    title: "집가기",
                    progress: 0,
                    isOpen: false,
                    steps: [
                    { 
                        id: 1, 
                        title: "짐 챙기기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 15,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 2, 
                        title: "문 잠그기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 5,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 3, 
                        title: "버스 타기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 30,
                        isPaused: false,
                        totalPausedMinutes: 0
                    }
                    ]
                }
            ],
            completionRate: 16.7,
            totalTime: 120,
            plannedTime: 205
          },
          {
            date: '2025-03-12',
            goals: [
                {
                    id:2,
                    title: "회의준비",
                    progress: 33,
                    isOpen: true,
                    steps: [
                    { 
                        id: 1, 
                        title: "재료 준비하기", 
                        startTime: "2025-03-13 09:50:43.406", 
                        status: "in-progress",
                        estimatedMinutes: 100,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 2, 
                        title: "요리 시작하기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 45,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 3, 
                        title: "식탁 차리기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 10,
                        isPaused: false,
                        totalPausedMinutes: 0
                    }
                    ]
                },
                {
                    id:3,
                    title: "보고서작성",
                    progress: 0,
                    isOpen: false,
                    steps: [
                    { 
                        id: 1, 
                        title: "짐 챙기기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 15,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 2, 
                        title: "문 잠그기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 5,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 3, 
                        title: "버스 타기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 30,
                        isPaused: false,
                        totalPausedMinutes: 0
                    }
                    ]
                }
            ],
            completionRate: 87.5,
            totalTime: 240,
            plannedTime: 210
          },
          {
            date: '2025-03-11',
            goals: [
                {
                    id:4,
                    title: "회의준비",
                    progress: 33,
                    isOpen: true,
                    steps: [
                    { 
                        id: 1, 
                        title: "재료 준비하기", 
                        startTime: "2025-03-13 09:50:43.406", 
                        status: "in-progress",
                        estimatedMinutes: 100,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 2, 
                        title: "요리 시작하기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 45,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 3, 
                        title: "식탁 차리기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 10,
                        isPaused: false,
                        totalPausedMinutes: 0
                    }
                    ]
                },
                {
                    id:5,
                    title: "보고서작성",
                    progress: 0,
                    isOpen: false,
                    steps: [
                    { 
                        id: 1, 
                        title: "짐 챙기기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 15,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 2, 
                        title: "문 잠그기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 5,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 3, 
                        title: "버스 타기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 30,
                        isPaused: false,
                        totalPausedMinutes: 0
                    }
                    ]
                }
            ],
            completionRate: 100,
            totalTime: 180,
            plannedTime: 200
          },
          {
            date: '2025-03-10',
            goals: [
                {
                    id:6,
                    title: "회의준비",
                    progress: 33,
                    isOpen: true,
                    steps: [
                    { 
                        id: 1, 
                        title: "재료 준비하기", 
                        startTime: "2025-03-13 09:50:43.406", 
                        status: "in-progress",
                        estimatedMinutes: 100,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 2, 
                        title: "요리 시작하기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 45,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 3, 
                        title: "식탁 차리기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 10,
                        isPaused: false,
                        totalPausedMinutes: 0
                    }
                    ]
                },
                {
                    id:7,
                    title: "보고서작성",
                    progress: 0,
                    isOpen: false,
                    steps: [
                    { 
                        id: 1, 
                        title: "짐 챙기기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 15,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 2, 
                        title: "문 잠그기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 5,
                        isPaused: false,
                        totalPausedMinutes: 0
                    },
                    { 
                        id: 3, 
                        title: "버스 타기", 
                        startTime: "", 
                        status: "not-started",
                        estimatedMinutes: 30,
                        isPaused: false,
                        totalPausedMinutes: 0
                    }
                    ]
                }
            ],
            completionRate: 100,
            totalTime: 150,
            plannedTime: 180
          }                
    ]

    const taskRecords:TaskRecord[]=[
        {
            date: '2025-03-13',
            tasks: [
                {
                    id: 1,
                    title: '프로젝트 계획서 작성',
                    description: '다음 분기 프로젝트 계획서 초안 작성하기',
                    category: 0,
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
                    category: 1,
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
                    category: 3,
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
                    category: 4,
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
                    category: 5,
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
            ],
            completionRate: 50
        },
        {
            date: '2025-03-12',
            tasks: [
                {
                    id: 1,
                    title: '프로젝트 계획서 작성',
                    description: '다음 분기 프로젝트 계획서 초안 작성하기',
                    category: 0,
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
                    category: 1,
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
                    category: 3,
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
                    category: 4,
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
                    category: 5,
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
            ],
            completionRate: 100
        },
        {
            date: '2025-03-11',
            tasks: [
                {
                    id: 1,
                    title: '프로젝트 계획서 작성',
                    description: '다음 분기 프로젝트 계획서 초안 작성하기',
                    category: 0,
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
                    category: 1,
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
                    category: 3,
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
                    category: 4,
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
                    category: 5,
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
            ],
            completionRate: 100
        }        
    ]

    const habitRecords:HabitRecord[]=[
        {
            date: '2025-03-13',
            habits: [
                { 
                  id: 1, 
                  name: "물 마시기", 
                  category: 0, 
                  icon: "💧", 
                  streak: 5, 
                  frequency: "daily", 
                  reminder: true, 
                  reminderTime: "09:00",
                  completedDates: [
                    "2025-03-07", "2025-03-08", "2025-03-09", 
                    "2025-03-10", "2025-03-11", "2025-03-12"
                  ],
                  completed: false
                },
                { 
                  id: 2, 
                  name: "명상하기", 
                  category: 2, 
                  icon: "🧘", 
                  streak: 3, 
                  frequency: "daily", 
                  reminder: true, 
                  reminderTime: "07:30",
                  completedDates: [
                    "2025-03-10", "2025-03-11", "2025-03-12"
                  ],
                  completed: false
                },
                { 
                  id: 3, 
                  name: "독서하기", 
                  category: 3, 
                  icon: "📚", 
                  streak: 7, 
                  frequency: "daily", 
                  reminder: false, 
                  reminderTime: "",
                  completedDates: [
                    "2025-03-06", "2025-03-07", "2025-03-08", 
                    "2025-03-09", "2025-03-10", "2025-03-11", "2025-03-12"
                  ],
                  completed: true
                },
                { 
                  id: 4, 
                  name: "가족에게 전화하기", 
                  category: 4, 
                  icon: "📞", 
                  streak: 2, 
                  frequency: "weekly", 
                  reminder: true, 
                  reminderTime: "19:00",
                  completedDates: [
                    "2025-03-05", "2025-03-12"
                  ],
                  completed: false
                }
            ],
            completionRate: 25
          },
          {
            date: '2025-03-12',
            habits: [
                { 
                  id: 1, 
                  name: "물 마시기", 
                  category: 0, 
                  icon: "💧", 
                  streak: 5, 
                  frequency: "daily", 
                  reminder: true, 
                  reminderTime: "09:00",
                  completedDates: [
                    "2025-03-07", "2025-03-08", "2025-03-09", 
                    "2025-03-10", "2025-03-11", "2025-03-12"
                  ],
                  completed: false
                },
                { 
                  id: 2, 
                  name: "명상하기", 
                  category: 2, 
                  icon: "🧘", 
                  streak: 3, 
                  frequency: "daily", 
                  reminder: true, 
                  reminderTime: "07:30",
                  completedDates: [
                    "2025-03-10", "2025-03-11", "2025-03-12"
                  ],
                  completed: false
                },
                { 
                  id: 3, 
                  name: "독서하기", 
                  category: 3, 
                  icon: "📚", 
                  streak: 7, 
                  frequency: "daily", 
                  reminder: false, 
                  reminderTime: "",
                  completedDates: [
                    "2025-03-06", "2025-03-07", "2025-03-08", 
                    "2025-03-09", "2025-03-10", "2025-03-11", "2025-03-12"
                  ],
                  completed: true
                },
                { 
                  id: 4, 
                  name: "가족에게 전화하기", 
                  category: 4, 
                  icon: "📞", 
                  streak: 2, 
                  frequency: "weekly", 
                  reminder: true, 
                  reminderTime: "19:00",
                  completedDates: [
                    "2025-03-05", "2025-03-12"
                  ],
                  completed: false
                }
            ],
            completionRate: 100
          },
          {
            date: '2025-03-11',
            habits: [
                { 
                  id: 1, 
                  name: "물 마시기", 
                  category: 0, 
                  icon: "💧", 
                  streak: 5, 
                  frequency: "daily", 
                  reminder: true, 
                  reminderTime: "09:00",
                  completedDates: [
                    "2025-03-07", "2025-03-08", "2025-03-09", 
                    "2025-03-10", "2025-03-11", "2025-03-12"
                  ],
                  completed: false
                },
                { 
                  id: 2, 
                  name: "명상하기", 
                  category: 2, 
                  icon: "🧘", 
                  streak: 3, 
                  frequency: "daily", 
                  reminder: true, 
                  reminderTime: "07:30",
                  completedDates: [
                    "2025-03-10", "2025-03-11", "2025-03-12"
                  ],
                  completed: false
                },
                { 
                  id: 3, 
                  name: "독서하기", 
                  category: 3, 
                  icon: "📚", 
                  streak: 7, 
                  frequency: "daily", 
                  reminder: false, 
                  reminderTime: "",
                  completedDates: [
                    "2025-03-06", "2025-03-07", "2025-03-08", 
                    "2025-03-09", "2025-03-10", "2025-03-11", "2025-03-12"
                  ],
                  completed: true
                },
                { 
                  id: 4, 
                  name: "가족에게 전화하기", 
                  category: 4, 
                  icon: "📞", 
                  streak: 2, 
                  frequency: "weekly", 
                  reminder: true, 
                  reminderTime: "19:00",
                  completedDates: [
                    "2025-03-05", "2025-03-12"
                  ],
                  completed: false
                }
            ],
            completionRate: 75
          }
    ]

    return {
        context: {
            goalRecords,
            taskRecords,
            habitRecords
        }        
    };

}) satisfies PageServerLoad;