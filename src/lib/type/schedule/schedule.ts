export type Step = {
    id: number;
    title: string;
    startTime: string;
    status: "completed" | "in-progress" | "not-started";
    elapsedTime?: string;
    estimatedMinutes: number; 
    completedTime?: string; 
    timePercentage?: number;
    elapsedMinutes?: number;
    isPaused: boolean; 
    pausedTime?: string;
    totalPausedMinutes?: number;
};

export type Task = {
    title: string;
    progress: number;
    steps: Step[];
    isOpen: boolean;
};