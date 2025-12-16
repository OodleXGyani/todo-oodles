import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.monthYear}>
          {monthNames[currentMonth]} {currentYear}
        </Text>
        <FontAwesome5 name="calendar-alt" size={20} color="#667EEA" />
      </View>

      <View style={styles.weekDays}>
        {dayNames.map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {calendarDays.map((day, index) => (
          <View
            key={index}
            style={[
              styles.dayCell,
              {
                backgroundColor:
                  day === selectedDate
                    ? '#667EEA'
                    : day === currentDate.getDate()
                    ? '#E0E7FF'
                    : 'transparent',
              },
            ]}
          >
            {day && (
              <Text
                style={[
                  styles.dayText,
                  {
                    color:
                      day === selectedDate
                        ? '#fff'
                        : day === currentDate.getDate()
                        ? '#667EEA'
                        : '#1F2937',
                    fontWeight:
                      day === currentDate.getDate() ? '700' : '500',
                  },
                ]}
                onPress={() => setSelectedDate(day)}
              >
                {day}
              </Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.selectedDateBox}>
        <FontAwesome5 name="check-circle" size={16} color="#667EEA" />
        <View style={styles.selectedDateContent}>
          <Text style={styles.selectedDateLabel}>Selected</Text>
          <Text style={styles.selectedDateValue}>
            {monthNames[currentMonth].substring(0, 3)} {selectedDate}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    width: '14.28%',
    textAlign: 'center',
    color: '#6B7280',
    letterSpacing: 0.2,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedDateBox: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectedDateContent: {
    flex: 1,
  },
  selectedDateLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  selectedDateValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 2,
  },
});
