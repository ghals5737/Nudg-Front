import { writable, derived, type Readable } from 'svelte/store';
import { storage } from '$lib/utils/utils';
import { generateId } from '$lib/utils/utils';

// 작업 타입 정의
export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  steps?: TaskStep[];
}

// 작업 단계 타입 정의
export interface TaskStep {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  duration?: number; // 분 단위
  order: number;
}

// 초기 작업 데이터
const initialTasks: Task[] = [
  {
    id: '1',
    title: '프로젝트 기획안 작성',
    description: '새로운 프로젝트 기획안을 작성하고 팀원들과 검토합니다.',
    category: 'work',
    priority: 'high',
    status: 'todo',
    dueDate: '2025-03-20',
    createdAt: '2025-03-15T09:00:00Z',
    updatedAt: '2025-03-15T09:00:00Z',
    steps: [
      {
        id: '1-1',
        title: '시장 조사',
        description: '경쟁사 분석 및 시장 트렌드 조사',
        status: 'todo',
        duration: 120,
        order: 1
      },
      {
        id: '1-2',
        title: '기획안 초안 작성',
        description: '기획안 초안을 작성합니다.',
        status: 'todo',
        duration: 180,
        order: 2
      },
      {
        id: '1-3',
        title: '팀원 검토',
        description: '팀원들과 기획안을 검토하고 피드백을 받습니다.',
        status: 'todo',
        duration: 60,
        order: 3
      }
    ]
  },
  {
    id: '2',
    title: '운동하기',
    description: '30분 이상 운동하기',
    category: 'health',
    priority: 'medium',
    status: 'todo',
    dueDate: '2025-03-16',
    createdAt: '2025-03-15T10:00:00Z',
    updatedAt: '2025-03-15T10:00:00Z',
    steps: [
      {
        id: '2-1',
        title: '스트레칭',
        description: '10분 스트레칭',
        status: 'todo',
        duration: 10,
        order: 1
      },
      {
        id: '2-2',
        title: '유산소 운동',
        description: '20분 유산소 운동',
        status: 'todo',
        duration: 20,
        order: 2
      }
    ]
  }
];

// 작업 스토어 생성
function createTaskStore() {
  // 로컬 스토리지에서 작업 데이터 가져오기
  const savedTasks = storage.get<Task[]>('tasks', initialTasks);
  
  // 초기 작업 설정
  const { subscribe, set, update } = writable<Task[]>(savedTasks);
  
  // 카테고리별 작업 필터링
  const tasksByCategory: Readable<Record<string, Task[]>> = derived(
    { subscribe },
    ($tasks) => {
      const categories: Record<string, Task[]> = {};
      $tasks.forEach((task: Task) => {
        if (!categories[task.category]) {
          categories[task.category] = [];
        }
        categories[task.category].push(task);
      });
      return categories;
    }
  );
  
  // 상태별 작업 필터링
  const tasksByStatus: Readable<Record<string, Task[]>> = derived(
    { subscribe },
    ($tasks) => {
      const statuses: Record<string, Task[]> = {};
      $tasks.forEach((task: Task) => {
        if (!statuses[task.status]) {
          statuses[task.status] = [];
        }
        statuses[task.status].push(task);
      });
      return statuses;
    }
  );
  
  return {
    subscribe,
    tasksByCategory,
    tasksByStatus,
    
    // 작업 추가
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      const newTask: Task = {
        ...task,
        id: generateId(),
        createdAt: now,
        updatedAt: now
      };
      
      update(tasks => {
        const updatedTasks = [...tasks, newTask];
        storage.set('tasks', updatedTasks);
        return updatedTasks;
      });
      
      return newTask;
    },
    
    // 작업 업데이트
    updateTask: (id: string, updates: Partial<Task>) => {
      update(tasks => {
        const updatedTasks = tasks.map(task => 
          task.id === id 
            ? { ...task, ...updates, updatedAt: new Date().toISOString() } 
            : task
        );
        storage.set('tasks', updatedTasks);
        return updatedTasks;
      });
    },
    
    // 작업 삭제
    deleteTask: (id: string) => {
      update(tasks => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        storage.set('tasks', updatedTasks);
        return updatedTasks;
      });
    },
    
    // 작업 단계 추가
    addTaskStep: (taskId: string, step: Omit<TaskStep, 'id'>) => {
      update(tasks => {
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            const newStep: TaskStep = {
              ...step,
              id: `${taskId}-${generateId()}`
            };
            return {
              ...task,
              steps: [...(task.steps || []), newStep],
              updatedAt: new Date().toISOString()
            };
          }
          return task;
        });
        storage.set('tasks', updatedTasks);
        return updatedTasks;
      });
    },
    
    // 작업 단계 업데이트
    updateTaskStep: (taskId: string, stepId: string, updates: Partial<TaskStep>) => {
      update(tasks => {
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId && task.steps) {
            const updatedSteps = task.steps.map(step => 
              step.id === stepId ? { ...step, ...updates } : step
            );
            return {
              ...task,
              steps: updatedSteps,
              updatedAt: new Date().toISOString()
            };
          }
          return task;
        });
        storage.set('tasks', updatedTasks);
        return updatedTasks;
      });
    },
    
    // 작업 단계 삭제
    deleteTaskStep: (taskId: string, stepId: string) => {
      update(tasks => {
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId && task.steps) {
            return {
              ...task,
              steps: task.steps.filter(step => step.id !== stepId),
              updatedAt: new Date().toISOString()
            };
          }
          return task;
        });
        storage.set('tasks', updatedTasks);
        return updatedTasks;
      });
    },
    
    // 작업 단계 순서 변경
    reorderTaskSteps: (taskId: string, stepIds: string[]) => {
      update(tasks => {
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId && task.steps) {
            const reorderedSteps = stepIds.map((id, index) => {
              const step = task.steps!.find(s => s.id === id);
              return step ? { ...step, order: index + 1 } : step;
            }).filter(Boolean) as TaskStep[];
            
            return {
              ...task,
              steps: reorderedSteps,
              updatedAt: new Date().toISOString()
            };
          }
          return task;
        });
        storage.set('tasks', updatedTasks);
        return updatedTasks;
      });
    }
  };
}

// 작업 스토어 내보내기
export const taskStore = createTaskStore(); 