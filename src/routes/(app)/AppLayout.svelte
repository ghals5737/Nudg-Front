<script lang="ts">
    import { ArrowUp, ArrowDown, CheckCircle, Clock, Circle, Menu, X, User, LogOut, Edit, Undo, Check, AlertTriangle, MoreVertical, Plus, Play, Pause } from 'lucide-svelte';    
    import "../../app.css"
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    
    const user = {
      name: "김누지",
      email: "user@example.com",
      avatar: "/src/lib/static/login-logo.svg?height=32&width=32"
    };

    let mobileMenuOpen = false;
  
    let menuItems = [
      { name: "하루일정관리", href: "/schedule", active: true },
      { name: "작업관리", href: "/tasks", active: false },      
      { name: "습관", href: "/habits", active: false },
      { name: "기록 보기", href: "/records", active: false },      
    ];   
    
    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }
      
    let userDropdownOpen = false;
    
    function toggleUserDropdown() {
        userDropdownOpen = !userDropdownOpen;
    }
    
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.closest('.user-dropdown') && userDropdownOpen) {
        userDropdownOpen = false;
        }
    }

    const movePage=(url:string)=>{
      menuItems = menuItems.map(el => ({
        ...el,
        active: el.href === url
      }));
      
      goto(url)
    }

  </script> 

  <svelte:window on:click={handleClickOutside} />
  
  <div class="min-h-screen bg-[#F8FAFE]">    
    <header class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <a href="#" class="text-blue-700 font-bold text-2xl">nudg</a>
            </div>
                        
            <nav class="hidden sm:ml-8 sm:flex sm:space-x-8">
              {#each menuItems as item}
                <button                   
                  on:click={()=>movePage(item.href)}
                  class="inline-flex items-center px-1 pt-1 border-b-2 {item.active ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} text-sm font-medium"
                >
                  {item.name}
                </button>
              {/each}
            </nav>
          </div>
          
          <div class="flex items-center">          
            <div class="sm:hidden -mr-2 flex items-center">
              <button 
                type="button" 
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                on:click={toggleMobileMenu}
              >
                {#if mobileMenuOpen}
                  <X size={24} />
                {:else}
                  <Menu size={24} />
                {/if}
              </button>
            </div>
            
            <div class="hidden sm:ml-6 sm:flex sm:items-center user-dropdown relative">
              <button 
                type="button" 
                class="flex text-sm rounded-full focus:outline-none"
                on:click={toggleUserDropdown}
              >
                <div class="flex items-center">
                  <img 
                    class="h-8 w-8 rounded-full" 
                    src={user.avatar || "/placeholder.svg"} 
                    alt={user.name} 
                  />
                  <span class="ml-2 text-gray-700">{user.name}</span>
                </div>
              </button>
              
              {#if userDropdownOpen}
                <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="px-4 py-2 border-b border-gray-100">
                    <p class="text-sm font-medium text-gray-900">{user.name}</p>
                    <p class="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <User size={16} class="mr-2" />
                    프로필
                  </a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <LogOut size={16} class="mr-2" />
                    로그아웃
                  </a>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
      
      {#if mobileMenuOpen}
        <div class="sm:hidden">
          <div class="pt-2 pb-3 space-y-1">
            {#each menuItems as item}
              <a 
                href={item.href} 
                class="block pl-3 pr-4 py-2 {item.active ? 'bg-blue-50 border-l-4 border-blue-700 text-blue-700' : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} text-base font-medium"
              >
                {item.name}
              </a>
            {/each}
          </div>
          <div class="pt-4 pb-3 border-t border-gray-200">
            <div class="flex items-center px-4">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" src={user.avatar || "/placeholder.svg"} alt={user.name} />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">{user.name}</div>
                <div class="text-sm font-medium text-gray-500">{user.email}</div>
              </div>
            </div>
            <div class="mt-3 space-y-1">
              <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                프로필
              </a>
              <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                로그아웃
              </a>
            </div>
          </div>
        </div>
      {/if}
    </header>      
    <main class="flex items-center flex-col py-6">
        <slot/>
    </main>
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
  
  