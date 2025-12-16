import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width, height } = Dimensions.get('window');

export default function Welcome() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const features = [
    { icon: 'check-circle', label: 'Organize Tasks' },
    { icon: 'schedule', label: 'Set Reminders' },
    { icon: 'trending-up', label: 'Track Progress' },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>

          {/* Hero Section */}
          <Animated.View
            style={styles.heroSection}
            entering={ZoomIn.duration(800)}
          >
            <Animated.View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.tint + '15' },
              ]}
              entering={ZoomIn.duration(600).delay(200)}
            >
              <MaterialIcons name="done-all" size={56} color={theme.tint} />
            </Animated.View>

            <Animated.Text
              style={[styles.title, { color: theme.text }]}
              entering={ZoomIn.duration(800).delay(400)}
            >
              Welcome to Todo-Oodles
            </Animated.Text>

            <Animated.Text
              style={[styles.subtitle, { color: theme.icon }]}
              entering={ZoomIn.duration(800).delay(600)}
            >
              Stay organized and boost your productivity with our intuitive task
              management app
            </Animated.Text>
          </Animated.View>

          {/* Features */}
          <Animated.View
            style={styles.featuresSection}
            entering={ZoomIn.duration(700).delay(800)}
          >
            {features.map((feature, index) => (
              <Animated.View
                key={index}
                style={styles.featureItem}
                entering={ZoomIn.duration(600).delay(1000 + index * 100)}
              >
                <MaterialIcons
                  name={feature.icon}
                  size={24}
                  color={theme.tint}
                  style={styles.featureIcon}
                />
                <Text style={[styles.featureText, { color: theme.text }]}>
                  {feature.label}
                </Text>
              </Animated.View>
            ))}
          </Animated.View>

          {/* <Link href="/signup" asChild>
          <Animated.View
            style={styles.buttonSection}
            entering={ZoomIn.duration(700).delay(1300)}
          >
            
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.primaryButton,
                  { backgroundColor: theme.tint },
                ]}
              >
                <Text style={styles.primaryButtonText}>Start Now</Text>
              </TouchableOpacity>
            
          </Animated.View>
          </Link> */}
          <Link href="/signup" asChild style={styles.buttonSection}>
            <View style={styles.primaryButton} >
                <Text style={styles.primaryButtonText}>Start Now</Text>
            </View>
          </Link>


         

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  featuresSection: {
    gap: 16,
    marginBottom: 48,
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: {
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonSection: {
    width: '80%',
    alignItems: 'center',
    padding : 10,
    marginBottom: 24,
    backgroundColor: '#0a7ea4',
    borderRadius: 14,

  },
  primaryButton: {
    paddingVertical: 20,
    paddingHorizontal: 64,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    
   
  },
  primaryButtonText: {
    color: '#ffffffff',
    fontSize: 18,
    fontWeight: '800',
    
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
