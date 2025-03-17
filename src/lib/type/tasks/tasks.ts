export type TaskCategory = {
    id: number;
    name: string;
    color: string;
};
  
  
export type Priority = {
    id: string;
    name: string;
    color: string;
    icon: any; 
};

export type TaskStatus = {
    id: string;
    name: string;
    color: string;
};

export type RepeatOption = {
    id: string;
    name: string;
};

export type Task = {
    id: number;
    title: string;
    description: string;
    category: number;
    priority: string;
    status: string; 
    dueDate: string;
    reminder: boolean;
    reminderTime: string;
    repeat: string;
    tags: string[];
    createdAt: string;
    completedAt: string | null; 
    isStarred: boolean;
    estimatedMinutes: number; 
    actualMinutes: number; 
    notes: string; 
};
  