<script lang="ts">
    import type { Goal } from "$lib/type/schedule/schedule";
    import { ArrowUp, ArrowDown, CheckCircle, Clock, Circle, Menu, X, User, LogOut, Edit, Undo, Check, AlertTriangle, MoreVertical, Plus, Play, Pause } from 'lucide-svelte';    
    import { createEventDispatcher } from "svelte";
    import StepItem from "../step/StepItem.svelte";

    export let goal:Goal;

    const dispatch = createEventDispatcher();

    const toggleAccordion=()=>{
      goal.isOpen=!goal.isOpen
    }

    const openTaskEditMenu=()=>{
        
    }   
    const updateElapsedTimes=()=>{
      dispatch('updateElapsedTimes')          
    }
    const moveNextStep=(event:CustomEvent)=> {            
      if (event.detail.stepIndex < goal.steps.length - 1) {          
          if (goal.steps[event.detail.stepIndex + 1].status === "not-started") {
            goal.steps[event.detail.stepIndex + 1].status = "in-progress";
            goal.steps[event.detail.stepIndex + 1].startTime = new Date().toISOString();
            goal.steps[event.detail.stepIndex + 1].isPaused = false;
          }
      }   
    }

    const inProgressStep=(event:CustomEvent)=>{
      event.detail.stepIndex      
      const inProgressStep=goal.steps.find(s => s.status === "in-progress" && !s.isPaused);
      if (inProgressStep && inProgressStep.id !== goal.steps[event.detail.stepIndex].id) {
            alert("이미 진행 중인 스텝이 있습니다. 먼저 완료하거나 일시정지해주세요.");
            return;
        }
      goal.steps[event.detail.stepIndex].status = "in-progress";
      goal.steps[event.detail.stepIndex].startTime = new Date().toISOString();
      goal.steps[event.detail.stepIndex].isPaused = false;
      updateElapsedTimes();
    }
</script>

<div class="bg-blue-50 rounded-lg overflow-hidden mb-4 {goal.progress === 100 ? 'opacity-75' : ''}">              
    <div class=" text-blue-700 p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
            <button on:click={() => toggleAccordion()} class="focus:outline-none">
            {#if goal.isOpen}
                <ArrowUp size={16} />
            {:else}
                <ArrowDown size={16} />
            {/if}
            </button>                     
            <span class="font-medium text-lg">{goal.title}</span>
            <button 
                on:click={() => openTaskEditMenu()}
                class="text-blue-700 hover:bg-blue-100 p-1 rounded-full"
            >
            <Edit size={14} />
        </button>
         
        </div>
        
        <div class="flex items-center gap-4">                    
          {#if goal.progress > 0}
            <div class="flex items-center gap-2">
              <span>진행률: <span class="font-bold text-blue-700">{goal.progress}%</span></span>
              <div class="w-24 h-2 bg-blue-100 rounded-full overflow-hidden">
                <div 
                  class="h-full {goal.progress === 100 ? 'bg-green-600' : 'bg-blue-600'} rounded-full" 
                  style="width: {goal.progress}%"
                ></div>
              </div>
            </div>
          {:else}
            <span class="text-gray-100">
              <span class="font-medium text-gray-700">0</span>/{goal.steps.length}
            </span>
          {/if}
        </div>
      </div>
    </div>
    
    {#if goal.isOpen}
      <div class="divide-y-1 border-gray-60">
        {#each goal.steps as step, stepIndex}
          <StepItem
            {step}
            {stepIndex}
            on:updateElapsedTimes={updateElapsedTimes}
            on:moveNextStep={moveNextStep}
            on:inProgressStep={inProgressStep}
          ></StepItem>
        {/each}
        
        <div class="p-3 flex justify-center">
          <button class="text-blue-700 text-sm font-medium flex items-center gap-1 hover:underline">
            <Plus size={16} />
            새 단계 추가
          </button>
        </div>
      </div>
    {/if}
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