import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Provider, useDispatch } from 'react-redux';

import { auth } from '@/firebase/firebaseConfig';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '@/store';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const [user, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setCurrentUser(currentUser);
      if (currentUser) {
        dispatch({ type: 'auth/setUser', payload: { uid: currentUser.uid, email: currentUser.email } } as any);
      } else {
        dispatch({ type: 'auth/logout' } as any);
      }
      setAuthLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  if (authLoading) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="(auth)" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutContent />
    </Provider>
  );
}
