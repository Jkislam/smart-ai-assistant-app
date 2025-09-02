import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiService } from '../services/api';
import Toast from 'react-native-toast-message';

const McqScreen = () => {
  const [chapter, setChapter] = useState('');
  const [count, setCount] = useState('5');
  const [difficulty, setDifficulty] = useState('medium');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!chapter) {
      Alert.alert('Error', 'Please enter chapter text');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.getMCQs({
        chapter,
        count: parseInt(count),
        difficulty
      });
      
      if (response.error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.error,
        });
      } else {
        setResult(response.mcqs);
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
        <Text style={styles.label}>Chapter Text:</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={6}
          placeholder="Enter chapter text here..."
          value={chapter}
          onChangeText={setChapter}
        />

        <Text style={styles.label}>Number of MCQs:</Text>
        <TextInput
          style={styles.input}
          placeholder="5"
          value={count}
          onChangeText={setCount}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Difficulty Level:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity 
            style={[styles.radioButton, difficulty === 'easy' && styles.radioSelected]} 
            onPress={() => setDifficulty('easy')}
          >
            <Text style={styles.radioText}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.radioButton, difficulty === 'medium' && styles.radioSelected]} 
            onPress={() => setDifficulty('medium')}
          >
            <Text style={styles.radioText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.radioButton, difficulty === 'hard' && styles.radioSelected]} 
            onPress={() => setDifficulty('hard')}
          >
            <Text style={styles.radioText}>Hard</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>Generate MCQs</Text>
        </TouchableOpacity>

        {loading && <LoadingSpinner />}

        {result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Generated MCQs:</Text>
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
  textArea: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
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

export default McqScreen;