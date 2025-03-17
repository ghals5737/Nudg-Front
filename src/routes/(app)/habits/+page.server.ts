import type { Category, Habit } from "$lib/type/habits/habits";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, url }) => {    
    const categories: Category[] = [
        { id:0, name: "건강", color: "bg-green-100 text-green-700" },
        { id:1, name: "생산성", color: "bg-blue-100 text-blue-700" },
        { id:2, name: "마음챙김", color: "bg-purple-100 text-purple-700" },
        { id:3, name: "학습", color: "bg-yellow-100 text-yellow-700" },
        { id:4, name: "사회성", color: "bg-pink-100 text-pink-700" }
    ];    

    const recommendedHabits: Habit[] = [
        { id: 0, name: "하루 8잔의 물 마시기", category: 0, icon: "💧", streak: 0, frequency: "daily", reminder: false, reminderTime: "", completedDates: [], completed: false },
        { id: 0, name: "10분 명상으로 마음 챙기기", category: 2, icon: "🧘", streak: 0, frequency: "daily", reminder: false, reminderTime: "", completedDates: [], completed: false },
        { id: 0, name: "하루 20페이지 책 읽기", category: 3, icon: "📚", streak: 0, frequency: "daily", reminder: false, reminderTime: "", completedDates: [], completed: false },
        { id: 0, name: "30분 걷기 또는 가벼운 운동", category: 0, icon: "🏃", streak: 0, frequency: "daily", reminder: false, reminderTime: "", completedDates: [], completed: false },
        { id: 0, name: "아침에 오늘의 할 일 계획하기", category: 1, icon: "📝", streak: 0, frequency: "daily", reminder: false, reminderTime: "", completedDates: [], completed: false },
        { id: 0, name: "오늘 감사한 일 3가지 적기", category: 2, icon: "🙏", streak: 0, frequency: "daily", reminder: false, reminderTime: "", completedDates: [], completed: false },
        { id: 0, name: "주 1회 가족에게 안부 전화하기", category: 4, icon: "📞", streak: 0, frequency: "weekly", reminder: false, reminderTime: "", completedDates: [], completed: false },
        { id: 0, name: "매일 아침 비타민 복용하기", category: 0, icon: "💊", streak: 0, frequency: "daily", reminder: false, reminderTime: "", completedDates: [], completed: false }
    ];
      

    const userHabits: Habit[] = [
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
    ];

    return {
        context: {
            categories,
            recommendedHabits,
            userHabits
        }        
    };

}) satisfies PageServerLoad;