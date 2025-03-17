<script lang="ts">
    import type { Category, Habit } from "$lib/type/habits/habits";
    import { Plus, X } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";

    export let showRecommendedModal:boolean;
    export let recommendedHabits:Habit[];
    export let categories:Category[];

    const dispatch = createEventDispatcher();

    const getCategoryName=(categoryId:number)=> {
      const category = categories.find(c => c.id  === categoryId);
      return category ? category.name : '';
    }  

    const getCategoryColor=(categoryId:number)=> {
      const category = categories.find(c => c.id === categoryId);
      return category ? category.color : 'bg-gray-100 text-gray-700';
    }

    const addRecommendedHabit=(habit:Habit)=>{
        dispatch('addRecommendedHabit',{habit})                        
    }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
            <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-900">추천 습관</h2>
            <button 
                on:click={() => showRecommendedModal = false}
                class="text-gray-400 hover:text-gray-500"
            >
                <X size={20} />
            </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each recommendedHabits as habit}
                <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div class="flex items-start gap-3">
                    <span class="text-2xl">{habit.icon}</span>
                    <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <div>
                        <h3 class="font-medium text-gray-900">{habit.name}</h3>
                        <span class={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(habit.category)}`}>
                            {getCategoryName(habit.category)}
                        </span>
                        </div>
                        <button 
                        on:click={() => addRecommendedHabit(habit)}
                        class="p-1 rounded-full text-blue-700 hover:bg-blue-100"
                        title="습관 추가"
                        >
                        <Plus size={18} />
                        </button>
                    </div>
                    <p class="mt-2 text-sm text-gray-600">{habit.name}</p>
                    </div>
                </div>
                </div>
            {/each}
            </div>
        </div>
    </div>
</div>