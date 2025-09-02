import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiService } from '../services/api';
import Toast from 'react-native-toast-message';

const StudyTipsScreen = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject && !topic) {
      Alert.alert('Error', 'Please enter at least a subject or topic');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.getStudyTips({
        subject,
        topic
      });
      
      if (response.error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.error,
        });
      } else {
        setResult(response.study_tips);
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
        <Text style={styles.label}>Subject (optional):</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Math, Science, History"
          value={subject}
          onChangeText={setSubject}
        />

        <Text style={styles.label}>Topic (optional):</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Calculus, Photosynthesis, World War II"
          value={topic}
          onChangeText={setTopic}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>Get Study Tips</Text>
        </TouchableOpacity>

        {loading && <LoadingSpinner />}

        {result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Study Tips:</Text>
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
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
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

export default StudyTipsScreen;