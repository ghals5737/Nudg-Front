import type { Goal } from "$lib/type/schedule/schedule";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, url }) => {    
    let goals: Goal[] = [
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
    ];

    return {
        context: {
            goals
        }        
    };
}) satisfies PageServerLoad;