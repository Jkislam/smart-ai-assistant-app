import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Picker } from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiService } from '../services/api';
import Toast from 'react-native-toast-message';

const ChapterScreen = () => {
  const [classLevel, setClassLevel] = useState('9');
  const [subject, setSubject] = useState('math');
  const [chapter, setChapter] = useState('');
  const [count, setCount] = useState('5');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionType, setQuestionType] = useState('mcq');

  const subjects = {
    '9': ['math', 'science', 'english', 'history', 'geography'],
    '10': ['math', 'science', 'english', 'history', 'geography'],
    '11': ['physics', 'chemistry', 'biology', 'math', 'english'],
    '12': ['physics', 'chemistry', 'biology', 'math', 'english']
  };

  const handleSubmit = async () => {
    if (!chapter) {
      Alert.alert('Error', 'Please enter chapter name');
      return;
    }

    setLoading(true);
    try {
      let response;
      if (questionType === 'mcq') {
        response = await apiService.chapterToMCQ({
          class: classLevel,
          subject,
          chapter,
          count: parseInt(count)
        });
      } else {
        response = await apiService.chapterToCQ({
          class: classLevel,
          subject,
          chapter,
          count: parseInt(count)
        });
      }
      
      if (response.error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.error,
        });
      } else {
        setResult(questionType === 'mcq' ? response.mcqs : response.cqs);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Class:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={classLevel}
            style={styles.picker}
            onValueChange={(itemValue) => setClassLevel(itemValue)}
          >
            <Picker.Item label="Class 9" value="9" />
            <Picker.Item label="Class 10" value="10" />
            <Picker.Item label="Class 11" value="11" />
            <Picker.Item label="Class 12" value="12" />
          </Picker>
        </View>

        <Text style={styles.label}>Subject:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={subject}
            style={styles.picker}
            onValueChange={(itemValue) => setSubject(itemValue)}
          >
            {subjects[classLevel].map((sub) => (
              <Picker.Item 
                key={sub} 
                label={sub.charAt(0).toUpperCase() + sub.slice(1)} 
                value={sub} 
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Chapter Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter chapter name"
          value={chapter}
          onChangeText={setChapter}
        />

        <Text style={styles.label}>Number of Questions:</Text>
        <TextInput
          style={styles.input}
          placeholder="5"
          value={count}
          onChangeText={setCount}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Question Type:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity 
            style={[styles.radioButton, questionType === 'mcq' && styles.radioSelected]} 
            onPress={() => setQuestionType('mcq')}
          >
            <Text style={styles.radioText}>MCQ</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.radioButton, questionType === 'cq' && styles.radioSelected]} 
            onPress={() => setQuestionType('cq')}
          >
            <Text style={styles.radioText}>Creative Questions</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>Generate Questions</Text>
        </TouchableOpacity>

        {loading && <LoadingSpinner />}

        {result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>
              {questionType === 'mcq' ? 'MCQs:' : 'Creative Questions:'}
            </Text>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#374151',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  radioButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  radioText: {
    fontSize: 14,
    color: '#374151',
  },
  button: {
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#374151',
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4b5563',
  },
});

export default ChapterScreen;