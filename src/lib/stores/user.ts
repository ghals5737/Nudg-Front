import { writable } from 'svelte/store';
import { storage } from '$lib/utils/utils';

// 사용자 타입 정의
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
  };
}

// 초기 사용자 데이터
const initialUser: User = {
  id: '1',
  name: '김누지',
  email: 'user@example.com',
  avatar: '/src/lib/static/login-logo.svg?height=32&width=32',
  preferences: {
    notifications: true,
    theme: 'system'
  }
};

// 사용자 스토어 생성
function createUserStore() {
  // 로컬 스토리지에서 사용자 데이터 가져오기
  const savedUser = storage.get<User>('user', initialUser);
  
  // 초기 사용자 설정
  const { subscribe, set, update } = writable<User>(savedUser);
  
  return {
    subscribe,
    setUser: (user: User) => {
      set(user);
      storage.set('user', user);
    },
    updateUser: (updates: Partial<User>) => {
      update(user => {
        const updatedUser = { ...user, ...updates };
        storage.set('user', updatedUser);
        return updatedUser;
      });
    },
    updatePreferences: (preferences: Partial<User['preferences']>) => {
      update(user => {
        const updatedPreferences = { 
          ...user.preferences, 
          ...preferences 
        };
        const updatedUser = { 
          ...user, 
          preferences: updatedPreferences 
        };
        storage.set('user', updatedUser);
        return updatedUser;
      });
    },
    logout: () => {
      set(initialUser);
      storage.remove('user');
    }
  };
}

// 사용자 스토어 내보내기
export const userStore = createUserStore(); 