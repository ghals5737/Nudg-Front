<script lang="ts">
    import { Eye, EyeOff } from 'lucide-svelte';
    import "../app.css";
    
    let email = "";
    let password = "";
    let rememberMe = false;
    let showPassword = false;
    let isLoading = false;
    
    function togglePasswordVisibility() {
      showPassword = !showPassword;      
    }
    
    function handleLogin() {
      if (!email || !password) {
        alert("이메일과 비밀번호를 입력해주세요.");
        return;
      }
      
      isLoading = true;
      
      // 실제 구현에서는 여기에 로그인 API 호출 코드가 들어갑니다
      setTimeout(() => {
        isLoading = false;
        // 로그인 성공 시 메인 페이지로 이동
        window.location.href = "/";
      }, 1500);
    }
  </script>
  
  <div class="min-h-screen bg-[#F8FAFE] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h2 class="text-blue-700 text-4xl font-bold">nudg</h2>
        <p class="mt-2 text-gray-600">일정 관리를 더 효율적으로</p>
      </div>
      
      <div class="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" on:submit|preventDefault={handleLogin}>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
            <div class="mt-1">
              <input 
                id="email" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                bind:value={email}
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="example@email.com"
              />
            </div>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
            <div class="mt-1 relative">
                {#if showPassword}
                    <input 
                        id="password" 
                        name="password" 
                        type="text"
                        autocomplete="current-password" 
                        required 
                        bind:value={password}
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="비밀번호를 입력하세요"
                    />
                {:else}
                    <input 
                        id="password" 
                        name="password" 
                        type="password"
                        autocomplete="current-password" 
                        required 
                        bind:value={password}
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="비밀번호를 입력하세요"
                    />
                {/if}
             
              <button 
                type="button" 
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                on:click={togglePasswordVisibility}
              >
                {#if showPassword}
                  <EyeOff size={18} />
                {:else}
                  <Eye size={18} />
                {/if}
              </button>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                bind:checked={rememberMe}
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                로그인 상태 유지
              </label>
            </div>
            
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-700 hover:text-blue-500">
                비밀번호를 잊으셨나요?
              </a>
            </div>
          </div>
          
          <div>
            <button 
              type="submit" 
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {#if isLoading}
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                로그인 중...
              {:else}
                로그인
              {/if}
            </button>
          </div>
        </form>
        
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>
          
          <div class="mt-6 grid grid-cols-2 gap-3">
            <div>
              <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <img class="h-5 w-5" src="/placeholder.svg?height=20&width=20" alt="Google 로고" />
                <span class="ml-2">Google</span>
              </a>
            </div>
            <div>
              <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <img class="h-5 w-5" src="/placeholder.svg?height=20&width=20" alt="Kakao 로고" />
                <span class="ml-2">Kakao</span>
              </a>
            </div>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            계정이 없으신가요? 
            <a href="#" class="font-medium text-blue-700 hover:text-blue-500">
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
  
  <style lang="postcss">
    :global(body) {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    .text-blue-700 {
      color: #0056A5;
    }
    
    .bg-blue-700 {
      background-color: #0056A5;
    }
    
    .hover\:bg-blue-800:hover {
      background-color: #004080;
    }
    
    .focus\:ring-blue-500:focus {
      --tw-ring-color: #3B82F6;
    }
    
    .focus\:border-blue-500:focus {
      border-color: #3B82F6;
    }
    
    .hover\:text-blue-500:hover {
      color: #3B82F6;
    }
    
    .animate-spin {
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  </style>
  
  