
import useRequireAuth from '@/hooks/useRequireAuth';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Colors } from '@/constants/theme';
import { logout as firebaseLogout } from '@/firebase/auth';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { RootState } from '@/store';
import { logout as logoutAction } from '@/store/authSlice';

export default function Profile() {
  useRequireAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    try {
      await firebaseLogout();
      dispatch(logoutAction());
      router.replace('/welcome');
    } catch (err: any) {
      Alert.alert('Logout failed', err?.message || 'Please try again');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.text }]}>Profile</Text>

      <Text style={[styles.status, { color: theme.icon }]}>
        {user ? `Signed in as ${user.email ?? user.uid}` : 'Not signed in'}
      </Text>

      {user && (
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.tint }]} onPress={handleLogout} activeOpacity={0.85}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
