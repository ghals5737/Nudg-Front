<script lang="ts">
    import { ArrowUp, ArrowDown, CheckCircle, Clock, Circle, Menu, X, User, LogOut, Edit, Undo, Check, AlertTriangle, MoreVertical, Plus, Play, Pause } from 'lucide-svelte';    
    import { onMount } from 'svelte';      
    import TaskAccordion from './components/task/TaskAccordion.svelte';      
    import type { Task } from '$lib/type/schedule/schedule';
    export let tasks:Task[]
    
    function calculateElapsedTime(startTime: string, isPaused: boolean, totalPausedMinutes: number = 0): { text: string, minutes: number } {
      if (!startTime) return { text: "", minutes: 0 };
      
      const start = new Date(startTime);
      const now = new Date();
      let diffMs = now.getTime() - start.getTime();
      
      // 일시 정지된 시간 제외
      diffMs -= totalPausedMinutes * 60 * 1000;
      
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      
      let text = "";
      if (hours > 0) {
        text = `${hours}시간 ${minutes}분 경과`;
      } else {
        text = `${minutes}분 경과`;
      }
      
      return { text, minutes: diffMinutes };
    }
    
    const updateElapsedTimes=()=> {
      tasks.forEach(task => {
        task.steps.forEach(step => {
          if (step.status === "in-progress" && !step.isPaused) {
            const elapsed = calculateElapsedTime(step.startTime, step.isPaused, step.totalPausedMinutes || 0);
            step.elapsedTime = elapsed.text;
            step.elapsedMinutes = elapsed.minutes;
            
            // 예상 시간 대비 실제 소요 시간 비율 계산
            step.timePercentage = Math.round((elapsed.minutes / step.estimatedMinutes) * 100);
          } else if (step.status === "completed" && step.completedTime && step.startTime) {
            const start = new Date(step.startTime);
            const end = new Date(step.completedTime);
            const diffMinutes = Math.floor((end.getTime() - start.getTime()) / (1000 * 60)) - (step.totalPausedMinutes || 0);
            step.elapsedMinutes = diffMinutes;
            const hours = Math.floor(diffMinutes / 60);
            const minutes = diffMinutes % 60;
            
            if (hours > 0) {
              step.elapsedTime = `${hours}시간 ${minutes}분 소요`;
            } else {
              step.elapsedTime = `${minutes}분 소요`;
            }
            
            
            step.timePercentage = Math.round((diffMinutes / step.estimatedMinutes) * 100);
          }
        });
      });
      
      
      tasks.forEach(task => {
        const totalSteps = task.steps.length;
        const completedSteps = task.steps.filter(step => step.status === "completed").length;
        task.progress = Math.round((completedSteps / totalSteps) * 100);
      });
      
      tasks = [...tasks];
    }
    
      
    
    onMount(() => {
      updateElapsedTimes();
      const interval = setInterval(updateElapsedTimes, 10000); 
      return () => {
        clearInterval(interval);
      };
    });
  </script>
  
  <div class="w-full max-w-[1200px] px-4">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex items-center justify-between text-[#414141] text-lg mb-6">
        <div class="flex items-center">
          <span class="h-5 border-l-2 border-[#0056A5] mr-2"></span>
          <h1 class="font-semibold">하루 일정 관리</h1>
        </div>
        <button class="text-blue-700 text-sm font-medium flex items-center gap-1 hover:underline">
          <Plus size={16} />
          새 일정 추가
        </button>
      </div>
      
      {#each tasks as task, taskIndex}
        <TaskAccordion 
          {task}
          on:updateElapsedTimes={updateElapsedTimes}
        >            
        </TaskAccordion>
      {/each}
    </div>
  </div>
  
  <style lang="postcss">
    :global(body) {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    .bg-blue-50 {
      background-color: #EFF6FF;
    }
    
    .bg-blue-100 {
      background-color: #DBEAFE;
    }
    
    .bg-blue-600 {
      background-color: #2563EB;
    }
    
    .text-blue-700 {
      color: #0056A5;
    }
    
    .bg-green-100 {
      background-color: #D1FAE5;
    }
    
    .bg-green-600 {
      background-color: #10B981;
    }
    
    .text-green-500 {
      color: #10B981;
    }
    
    .text-green-700 {
      color: #047857;
    }
    
    .bg-gray-50 {
      background-color: #F9FAFB;
    }
    
    .bg-gray-100 {
      background-color: #F3F4F6;
    }
    
    .text-gray-300 {
      color: #D1D5DB;
    }
    
    .text-gray-500 {
      color: #6B7280;
    }
    
    .bg-gray-800 {
      background-color: #1F2937;
    }
    
    .border-gray-100 {
      border-color: #F3F4F6;
    }
    
    .border-gray-200 {
      border-color: #E5E7EB;
    }
    
    .fill-blue-100 {
      fill: #DBEAFE;
    }
    
    .bg-red-100 {
      background-color: #FEE2E2;
    }
    
    .text-red-500 {
      color: #EF4444;
    }
    
    .text-red-700 {
      color: #B91C1C;
    }
    
    .bg-yellow-100 {
      background-color: #FEF3C7;
    }
    
    .bg-yellow-500 {
      background-color: #F59E0B;
    }
    
    .text-yellow-500 {
      color: #F59E0B;
    }
    
    .text-yellow-700 {
      color: #B45309;
    }
    
    /* 진행 중인 스텝 강조 */
    .bg-blue-50 {
      background-color: #EFF6FF;
    }
    
    /* 완료된 스텝 스타일 */
    .line-through {
      text-decoration: line-through;
    }
  </style>
  
  