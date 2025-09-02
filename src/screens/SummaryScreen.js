import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiService } from '../services/api';
import Toast from 'react-native-toast-message';

const SummaryScreen = () => {
  const [text, setText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text && !videoUrl) {
      Alert.alert('Error', 'Please enter text or video URL');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.getSummary({ text, video_url: videoUrl });
      
      if (response.error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.error,
        });
      } else {
        setResult(response.summary);
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
        <Text style={styles.label}>Enter Text to Summarize:</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={6}
          placeholder="Paste your text here..."
          value={text}
          onChangeText={setText}
        />

        <Text style={styles.label}>Or YouTube Video URL:</Text>
        <TextInput
          style={styles.input}
          placeholder="https://www.youtube.com/watch?v=..."
          value={videoUrl}
          onChangeText={setVideoUrl}
          keyboardType="url"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>Generate Summary</Text>
        </TouchableOpacity>

        {loading && <LoadingSpinner />}

        {result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Summary:</Text>
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

export default SummaryScreen;