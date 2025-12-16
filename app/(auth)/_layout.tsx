import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
  return (
    <>
      <Stack > 
           {/* Welcome (choose login/signup) */}
           <Stack.Screen
             name="welcome"
             options={{ headerShown: false }}
           />
        <Stack.Screen 
          name="login" 
          options={{ 
            headerShown: false,
            title: 'Login'
          }} 
        />
        <Stack.Screen 
          name="signup" 
          options={{ 
            headerShown: false,
            title: 'Sign Up'
          }} 
        />
        <Stack.Screen 
          name="forgot-password" 
          options={{ 
            headerShown: true,
            title: 'Reset Password',
            presentation: 'card'
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}