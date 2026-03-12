import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.action';

type AuthState = 'authenticated' | 'not-authenticated' | 'checking';

type AuthStore = {
    user: User | null,
    token: string | null,
    authStatus: AuthState,

    isAdmin: () => boolean,

    login: (email: string, password: string) => Promise<boolean>,
    logout: () => void,
    checkAuthState: () => Promise<boolean>,
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',


    isAdmin: () => {
        const roles = get().user?.roles || [];

        return roles.includes('admin');
    },

    login: async (email: string, password: string) => {
        console.log({ email, password });
        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            return false;
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-authenticated' });
    },
    checkAuthState: async () => {
        try {
            const { user, token } = await checkAuthAction();
            set({
                user: user, 
                token: token,
                authStatus: 'authenticated'
            }); 
            return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            localStorage.removeItem('token');
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated'
            });
            return false;
        }
    },
}));

