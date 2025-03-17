import type { Goal } from "$lib/type/schedule/schedule";
import type { RepeatOption, Task, TaskCategory, TaskStatus } from "$lib/type/tasks/tasks";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, url }) => {    
    const categories:TaskCategory[] = [
        { id: 0, name: '업무', color: 'bg-blue-100 text-blue-700' },
        { id: 1, name: '공부', color: 'bg-purple-100 text-purple-700' },
        { id: 2, name: '개인', color: 'bg-green-100 text-green-700' },
        { id: 3, name: '건강', color: 'bg-red-100 text-red-700' },
        { id: 4, name: '재정', color: 'bg-yellow-100 text-yellow-700' },
        { id: 5, name: '사회', color: 'bg-pink-100 text-pink-700' }
      ];
   
    const statuses:TaskStatus[] = [
        { id: 'todo', name: '예정', color: 'bg-gray-100 text-gray-700' },
        { id: 'in-progress', name: '진행 중', color: 'bg-blue-100 text-blue-700' },
        { id: 'completed', name: '완료', color: 'bg-green-100 text-green-700' }
    ];

    const repeatOptions:RepeatOption[] = [
        { id: 'none', name: '반복 안함' },
        { id: 'daily', name: '매일' },
        { id: 'weekdays', name: '평일마다' },
        { id: 'weekly', name: '매주' },
        { id: 'monthly', name: '매월' }
    ];

    const tasks:Task[] = [
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
    ];

    return {
        context: {
            categories,
            statuses,
            repeatOptions,
            tasks
        }        
    };
}) satisfies PageServerLoad;