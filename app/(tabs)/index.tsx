import useRequireAuth from '@/hooks/useRequireAuth';
import useTasks from '@/hooks/useTask';


import Calendar from '@/components/calendar';
import CurrentTasksSection from '@/components/current-tasks-section';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';




export default function Home() {
  useRequireAuth();
  const { currentTasks } = useTasks();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Calendar on top */}
        <View style={styles.calendarWrapper}>
          <Calendar />
        </View>

        {/* Current Tasks */}
        {currentTasks.length > 0 && (
          <View style={styles.taskWrapper}>
            <CurrentTasksSection tasks={currentTasks} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 32,
  },
  calendarWrapper: {
    marginBottom: 20,
  },
  taskWrapper: {
    marginBottom: 12,
  },
});
