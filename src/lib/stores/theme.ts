import { writable, get } from 'svelte/store';
import { storage } from '$lib/utils/utils';

// 테마 타입 정의
type Theme = 'light' | 'dark' | 'system';

// 테마 스토어 생성
function createThemeStore() {
  // 로컬 스토리지에서 테마 설정 가져오기
  const savedTheme = storage.get<Theme>('theme', 'system');
  
  // 초기 테마 설정
  const { subscribe, set, update } = writable<Theme>(savedTheme);
  
  // 테마 적용 함수
  function applyTheme(theme: Theme) {
    if (theme === 'system') {
      // 시스템 테마 감지
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
    
    // 로컬 스토리지에 테마 설정 저장
    storage.set('theme', theme);
  }
  
  // 초기 테마 적용
  if (typeof window !== 'undefined') {
    applyTheme(savedTheme);
    
    // 시스템 테마 변경 감지
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const currentTheme = get(themeStore);
      if (currentTheme === 'system') {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    });
  }
  
  return {
    subscribe,
    setTheme: (theme: Theme) => {
      set(theme);
      applyTheme(theme);
    },
    toggleTheme: () => {
      update(theme => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        return newTheme;
      });
    }
  };
}

// 테마 스토어 내보내기
export const themeStore = createThemeStore(); 