import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { addTask } from '@/store/tasksSlice';
import { useDispatch } from 'react-redux';



import CompletedTasksSection from '@/components/completed-tasks-section';
import CurrentTasksSection from '@/components/current-tasks-section';
import UpcomingTasksSection from '@/components/upcoming-tasks-section';
import useRequireAuth from '@/hooks/useRequireAuth';
import useTasks from '@/hooks/useTask';




export default function Tasks() {
  useRequireAuth();
  const { currentTasks, upcomingTasks, completedTasks } = useTasks();
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const dispatch = useDispatch();

  const handleAddTask = () => {
  if (taskTitle.trim()) {
    dispatch(addTask(taskTitle));
    setTaskTitle('');
    setShowAddModal(false);
  }
};

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
          <CurrentTasksSection tasks={currentTasks} />

          {/* Upcoming Tasks */}
          <UpcomingTasksSection tasks={upcomingTasks} />

          {/* Completed Tasks */}
          <CompletedTasksSection tasks={completedTasks} />

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
        <KeyboardAvoidingView style={styles.modalOverlay} behavior="padding">
          <KeyboardAvoidingView style={styles.modalContent}>
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
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
      </Modal>
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
