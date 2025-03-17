export type Category = {
    id: number;
    name: string;
    color: string;
};
export type HabitFrequencyEnum = "daily" | "weekly";
export type Habit = {
    id: number;
    name: string;
    category: number; // Category의 id 값 (참조)
    icon: string;
    streak: number; // 연속 성공 횟수
    frequency:HabitFrequencyEnum; // 빈도 설정
    reminder: boolean; // 리마인더 설정 여부
    reminderTime: string; // 알람 시간 (24시간 형식)
    completedDates: string[]; // 완료된 날짜 리스트 (YYYY-MM-DD 형식)
    completed: boolean; // 현재 완료 여부
};

export type CreateHabit = {
    name: string;
    category: number;
    icon: string;    
    frequency:HabitFrequencyEnum;
    reminder: boolean;
    reminderTime: string;
}
  