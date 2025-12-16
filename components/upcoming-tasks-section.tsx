import { AppDispatch } from '@/store';
import { Task, deleteTask } from '@/store/tasksSlice';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface UpcomingTasksSectionProps {
  tasks: Task[];
}

export default function UpcomingTasksSection({ tasks }: UpcomingTasksSectionProps) {
  if (!tasks || tasks.length === 0) return null;

  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <FontAwesome5 name="clock" size={16} color="#F59E0B" />
        <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
        <View style={[styles.countBadge, { backgroundColor: '#F59E0B' }]}>
          <Text style={styles.countBadgeText}>{tasks.length}</Text>
        </View>
      </View>

      {tasks.map((task) => (
        <View key={task.id} style={styles.taskCard}>
          <View style={styles.taskContent}>
            <View style={[styles.taskDot, { backgroundColor: '#F59E0B' }]} />
            <Text
              style={[styles.taskText, styles.mutedTask]}
              numberOfLines={2}
            >
              {task.title}
            </Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => handleDelete(task.id)}
              style={styles.iconBtn}
              activeOpacity={0.7}
            >
              <FontAwesome5 name="trash-alt" size={14} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
    letterSpacing: 0.2,
  },

  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  countBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  taskCard: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    opacity: 0.65,
  },

  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  taskDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    opacity: 0.6,
  },

  taskText: {
    fontSize: 15,
    color: '#1F2937',
    flex: 1,
    fontWeight: '500',
    lineHeight: 20,
  },

  mutedTask: {
    opacity: 0.65,
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
  },

  iconBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
});
