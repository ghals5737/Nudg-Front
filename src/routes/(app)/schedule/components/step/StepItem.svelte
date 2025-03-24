<script lang="ts">
    import type { Step } from "$lib/type/schedule/schedule";
    import { AlertTriangle, Check, CheckCircle, Circle, Clock, Edit, Pause, Play, Undo } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";

    export let step:Step
    export let stepIndex:number

    const dispatch = createEventDispatcher();

    const getTimeProgressColor=(percentage: number): string=>{
      if (percentage <= 70) return 'bg-blue-600'; 
      if (percentage <= 90) return 'bg-yellow-500';
      return 'bg-red-500';
    }

    const updateElapsedTimes=()=> {
        dispatch('updateElapsedTimes')
    }

    const undoStep=()=>{
        if (step.status === "completed") {
            step.status = "in-progress";
            step.completedTime = undefined;
            step.isPaused = false;
        } else if (step.status === "in-progress") {
            step.status = "not-started";
            step.startTime = "";
            step.elapsedTime = "";
            step.isPaused = false;
            step.totalPausedMinutes = 0;
        }
        updateElapsedTimes();
    }

    const resumeStep=()=>{
        if (step.status === "in-progress" && step.isPaused && step.pausedTime) {      
            const pausedStart = new Date(step.pausedTime);
            const now = new Date();
            const pausedMinutes = Math.floor((now.getTime() - pausedStart.getTime()) / (1000 * 60));      
            
            step.totalPausedMinutes = (step.totalPausedMinutes || 0) + pausedMinutes;
            step.isPaused = false;
            step.pausedTime = undefined;
        }
        
        updateElapsedTimes();
    }

    const pauseStep=()=>{
        if (step.status === "in-progress" && !step.isPaused) {
            step.isPaused = true;
            step.pausedTime = new Date().toISOString();
        }
        
        updateElapsedTimes();
    }

    const completeStep=()=>{
        step.status = "completed";
        step.completedTime = new Date().toISOString();
        step.isPaused = false;        
             
        //dispatch('moveNextStep',{stepIndex})        
        updateElapsedTimes();
    }

    const startStep=async()=>{
        dispatch('inProgressStep',{stepIndex}) 
    }

</script>

<div class="p-4 flex items-center justify-between bg-white {step.status === 'in-progress' && !step.isPaused ? 'bg-gray-50' : ''} {step.status === 'completed' ? 'bg-gray-50' : ''}">
<div class="flex items-center gap-3">
    {#if step.status === "completed"}
    <CheckCircle class="text-green-500" size={18} />
    {:else if step.status === "in-progress"}
    <Circle class="text-blue-500 fill-blue-100" size={18} />
    {:else}
    <Circle class="text-gray-300" size={18} />
    {/if}
    
    <div class="flex gap-2">
    <div class="flex items-center gap-2">                              
        <span class="font-medium {step.status === 'completed' ? 'line-through text-gray-500' : ''}">{step.title}</span>
        <button                       
        class="text-blue-700 hover:bg-blue-100 p-1 rounded-full"
        >
        <Edit size={14} />
        </button>
    </div>
    <div class="flex items-center gap-2">
        {#if step.status === "completed"}
        <span class="px-3 py-1.5 bg-green-100 text-green-700 rounded-md text-sm font-medium">
            완료
        </span>
        {:else if step.status === "in-progress"}
        <span class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
            {step.isPaused ? '일시정지' : '진행중'}
        </span>
        {:else}
        <span class="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-md text-sm font-medium">
            미실시
        </span>
        {/if}
    </div>
    </div>

</div>

<div class="flex items-center gap-3">
    {#if step.elapsedTime || step.status === "in-progress"}
    <div class="flex flex-col gap-2 px-3 py-2 rounded-md bg-white border border-gray-200 w-64">                  
        <div class="flex items-center justify-between text-xs">
        <div class="flex items-center gap-2">
            <Clock size={12} />
            <span class="text-gray-500">
            {step.elapsedMinutes || 0}분 / {step.estimatedMinutes}분
            </span>
        </div>
        
        <span class="{step.timePercentage && step.timePercentage > 100 ? 'text-red-500 font-bold' : 'text-gray-600'}">
            {step.timePercentage || 0}%
            {#if step.timePercentage && step.timePercentage > 100}
            <AlertTriangle size={12} class="inline ml-1 text-red-500" />
            {/if}
        </span>
        </div>
        
        <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
            class="h-full rounded-full {step.timePercentage ? getTimeProgressColor(step.timePercentage) : 'bg-blue-600'}" 
            style="width: {Math.min(step.timePercentage || 0, 100)}%"
        ></div>                            
        </div>
    </div>
    {/if}
    
    <div class="flex items-center gap-2">
    {#if step.status === "completed"}
        <button 
        on:click={() => undoStep()}
        class="p-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        title="되돌리기"
        > 
        <Undo size={16} />                              
        </button>
    {:else if step.status === "in-progress"}
        <div class="flex gap-2">
        {#if step.isPaused}
            <button 
            on:click={() => resumeStep()}
            class="p-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            title="재개"
            >
            <Play size={16} />
            </button>
        {:else}
            <button 
            on:click={() => pauseStep()}
            class="p-1.5 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200"
            title="일시정지"
            >
            <Pause size={16} />
            </button>
        {/if}
        <button 
            on:click={() => completeStep()}
            class="p-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
            title="완료"
        >   
            <Check size={16} />                              
        </button>
        </div>
    {:else}
        <button 
        on:click={() => startStep()}
        class="p-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
        title="시작"
        >
        <Play size={16} />
        </button>
    {/if}
    </div>
</div>
</div>

<style>
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