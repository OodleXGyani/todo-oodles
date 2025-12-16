import type { RootState } from '@/store';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useRequireAuth() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      const t = setTimeout(() => {
        try {
          router.replace('/welcome');
        } catch (e) {
          // ignore navigation-before-mount errors; will redirect on next render
        }
      }, 80);
      return () => clearTimeout(t);
    }
  }, [user, router]);

  return user;
}
