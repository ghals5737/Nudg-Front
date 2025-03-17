import type { Habit } from "../habits/habits"
import type { Goal } from "../schedule/schedule"
import type { Task } from "../tasks/tasks"

export type GoalRecord={
    date: string,
    goals: Goal[],
    completionRate: number,
    totalTime: number,
    plannedTime: number
}

export type TaskRecord={
    date: string,
    tasks: Task[],
    completionRate: number,    
}

export type HabitRecord={
    date: string,
    habits: Habit[],
    completionRate: number,    
}