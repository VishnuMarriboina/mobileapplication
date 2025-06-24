import React, {useState, useEffect} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CustomCalendar = ({onDateSelect, initialRange, onMonthChange}) => {
  const today = new Date().toISOString().split('T')[0];

  // Initialize selectedRange with the provided initialRange prop
  const [selectedRange, setSelectedRange] = useState(
    initialRange || {
      startDate: today,
      endDate: today,
    },
  );

  // Derive the initial selected month from startDate of selectedRange
  const [currentMonth, setCurrentMonth] = useState(
    selectedRange.startDate.slice(0, 7), // Format: YYYY-MM
  );

  useEffect(() => {
    if (selectedRange.startDate && selectedRange.endDate) {
      onDateSelect && onDateSelect(selectedRange);
    }
  }, [selectedRange]);

  const handleDayPress = day => {
    const {dateString} = day;
    const selectedDate = new Date(dateString);

    if (selectedDate > new Date(today)) {
      return; // Prevent selecting future dates
    }

    if (selectedRange.startDate && !selectedRange.endDate) {
      const startDate = new Date(selectedRange.startDate);
      const daysDifference = (selectedDate - startDate) / (1000 * 60 * 60 * 24);

      if (daysDifference > 31) {
        Alert.alert('Invalid Selection', 'You can only select up to 31 days.');
        return;
      }

      setSelectedRange({
        startDate: selectedRange.startDate,
        endDate: dateString,
      });
      onDateSelect &&
        onDateSelect({startDate: selectedRange.startDate, endDate: dateString});

      // Update the currentMonth to reflect the month of the selected date
      setCurrentMonth(dateString.slice(0, 7)); // Format as YYYY-MM
    } else {
      setSelectedRange({startDate: dateString, endDate: null});
      setCurrentMonth(dateString.slice(0, 7)); // Update currentMonth on date selection
    }
  };

  const getMarkedDates = () => {
    let marked = {};
    if (selectedRange.startDate) {
      let startDate = selectedRange.startDate;
      let endDate = selectedRange.endDate || selectedRange.startDate;

      let date = new Date(startDate);
      while (date <= new Date(endDate)) {
        const formattedDate = date.toISOString().split('T')[0];

        marked[formattedDate] = {
          customStyles: {
            container: {
              backgroundColor:
                formattedDate === startDate || formattedDate === endDate
                  ? '#128C7E'
                  : '#9dcec6',
              borderRadius: 15, // Add borderRadius
            },
            text: {
              color: '#fff',
              fontWeight: 'bold',
            },
          },
        };
        date.setDate(date.getDate() + 1);
      }
    }
    return marked;
  };

  const handleMonthChange = month => {
    const monthYear = month.dateString; // month.dateString is in format 'YYYY-MM-DD'
    const formattedMonth = monthYear.slice(0, 7); // Extract 'YYYY-MM' format

    // Notify the parent component of the new month
    if (onMonthChange) {
      onMonthChange(formattedMonth); // Send the formatted month
    }

    // Update the currentMonth when month is changed
    setCurrentMonth(formattedMonth);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={getMarkedDates()}
        markingType={'custom'} // Use "custom" for borderRadius
        maxDate={today} // Prevents future selection
        current={currentMonth} // Ensure calendar starts at the selected month
        theme={{
          arrowColor: '#128C7E', // Change arrow color
          todayTextColor: '#128C7E', // Highlight today's date
          selectedDayBackgroundColor: '#128C7E', // Selected date background
          textSectionTitleColor: '#128C7E', // Month and day titles
        }}
        onMonthChange={handleMonthChange} // Update the month when changed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default CustomCalendar;
