import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAHvAaavOXkZNR3dscvxQHWCywUpl6-5aI",
  authDomain: "todo-app-oodles.firebaseapp.com",
  projectId: "todo-app-oodles",
  storageBucket: "todo-app-oodles.firebasestorage.app",
  messagingSenderId: "84657763910",
  appId: "1:84657763910:web:897bc87d7acaead2d6fc47",
  measurementId: "G-1SR8SQM7WL"
};


const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
