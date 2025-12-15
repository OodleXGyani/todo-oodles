import { FontAwesome5 } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  addTask,
  deleteTask,
  getTasksByStatus,
  markTaskDone,
  Task,
} from '@/store/tasks.store';

function useTasks() {
  const [, setRefresh] = useState(0);

  const refresh = useCallback(() => {
    setRefresh(prev => prev + 1);
  }, []);

  const currentTasks = getTasksByStatus('current');
  const upcomingTasks = getTasksByStatus('upcoming');
  const completedTasks = getTasksByStatus('completed');

  return {
    currentTasks,
    upcomingTasks,
    completedTasks,
    refresh,
  };
}

export default function Tasks() {
  const { currentTasks, upcomingTasks, completedTasks, refresh } = useTasks();
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = useCallback(() => {
    if (taskTitle.trim()) {
      addTask(taskTitle, 'current');
      setTaskTitle('');
      setShowAddModal(false);
      refresh();
    }
  }, [taskTitle, refresh]);

  const totalPending = currentTasks.length + upcomingTasks.length;
  const totalCompleted = completedTasks.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with Gradient Background */}
        <View style={styles.headerGradient}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>My Tasks</Text>
              <Text style={styles.taskSummary}>
                {totalPending} pending • {totalCompleted} done
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
              activeOpacity={0.85}
            >
              <FontAwesome5 name="plus" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Current Tasks */}
          <Section
            title="Current Tasks"
            items={currentTasks}
            icon="circle"
            color="#3B82F6"
            count={currentTasks.length}
          >
            {currentTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDone={() => {
                  markTaskDone(task.id);
                  refresh();
                }}
                onDelete={() => {
                  deleteTask(task.id);
                  refresh();
                }}
              />
            ))}
          </Section>

          {/* Upcoming Tasks */}
          <Section
            title="Upcoming Tasks"
            items={upcomingTasks}
            icon="clock"
            color="#F59E0B"
            count={upcomingTasks.length}
          >
            {upcomingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                muted
                onDelete={() => {
                  deleteTask(task.id);
                  refresh();
                }}
              />
            ))}
          </Section>

          {/* Completed Tasks */}
          <Section
            title="Completed Tasks"
            items={completedTasks}
            icon="check-circle"
            color="#10B981"
            count={completedTasks.length}
          >
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                completed
                onDelete={() => {
                  deleteTask(task.id);
                  refresh();
                }}
              />
            ))}
          </Section>

          {/* Empty State */}
          {totalPending === 0 && totalCompleted === 0 && (
            <View style={styles.emptyState}>
              <FontAwesome5 name="inbox" size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>No tasks yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Tap the + button to create your first task
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Add Task Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Task</Text>
              <TouchableOpacity
                onPress={() => {
                  setTaskTitle('');
                  setShowAddModal(false);
                }}
              >
                <FontAwesome5 name="times" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.modalInput}
              placeholder="What needs to be done?"
              placeholderTextColor="#9CA3AF"
              value={taskTitle}
              onChangeText={setTaskTitle}
              autoFocus
              onSubmitEditing={handleAddTask}
              maxLength={100}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setTaskTitle('');
                  setShowAddModal(false);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.addButtonModal]}
                onPress={handleAddTask}
                activeOpacity={0.85}
              >
                <FontAwesome5 name="plus" size={14} color="#fff" />
                <Text style={styles.addButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ---------- Components ---------- */

function Section({
  title,
  items,
  children,
  icon,
  color,
  count,
}: {
  title: string;
  items: any[];
  children: React.ReactNode;
  icon?: string;
  color?: string;
  count?: number;
}) {
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        {icon && <FontAwesome5 name={icon} size={16} color={color} />}
        <Text style={styles.sectionTitle}>{title}</Text>
        {count !== undefined && (
          <View style={[styles.countBadge, { backgroundColor: color }]}>
            <Text style={styles.countBadgeText}>{count}</Text>
          </View>
        )}
      </View>
      {children}
    </View>
  );
}

function TaskItem({
  task,
  completed,
  muted,
  onDone,
  onDelete,
}: {
  task: Task;
  completed?: boolean;
  muted?: boolean;
  onDone?: () => void;
  onDelete: () => void;
}) {
  return (
    <View
      style={[
        styles.taskCard,
        completed && styles.completedTask,
        muted && styles.mutedTask,
      ]}
    >
      <View style={styles.taskContent}>
        <View style={[styles.taskDot, completed && styles.completedDot]} />
        <Text
          style={[styles.taskText, completed && styles.completedText]}
          numberOfLines={2}
        >
          {task.title}
        </Text>
      </View>

      <View style={styles.actions}>
        {!completed && onDone && (
          <TouchableOpacity
            onPress={onDone}
            style={styles.iconBtn}
            activeOpacity={0.7}
          >
            <FontAwesome5 name="check" size={16} color="#10B981" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={onDelete}
          style={styles.iconBtn}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="trash-alt" size={14} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  headerGradient: {
    backgroundColor: '#667EEA',
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingTop: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerContent: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },

  taskSummary: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
  },

  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },

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
    borderLeftColor: '#3B82F6',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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
    backgroundColor: '#3B82F6',
    opacity: 0.6,
  },

  completedDot: {
    backgroundColor: '#10B981',
    opacity: 1,
  },

  taskText: {
    fontSize: 15,
    color: '#1F2937',
    flex: 1,
    fontWeight: '500',
    lineHeight: 20,
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

  completedTask: {
    backgroundColor: '#F0FDF4',
    borderLeftColor: '#10B981',
    opacity: 0.85,
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
    fontWeight: '400',
  },

  mutedTask: {
    opacity: 0.65,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },

  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
  },

  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '88%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },

  modalInput: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 22,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    fontWeight: '500',
  },

  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },

  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  cancelButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },

  addButtonModal: {
    backgroundColor: '#667EEA',
  },

  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
