import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiService } from '../services/api';
import { imageUtils } from '../utils/imageUtils';
import Toast from 'react-native-toast-message';

const MathSolverScreen = () => {
  const [problem, setProblem] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [solverType, setSolverType] = useState('text');

  const takePhoto = async () => {
    try {
      const imageData = await imageUtils.takePhoto();
      if (imageData) {
        setImageBase64(imageData);
        setSolverType('image');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  const pickImage = async () => {
    try {
      const imageData = await imageUtils.pickImage();
      if (imageData) {
        setImageBase64(imageData);
        setSolverType('image');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  const handleSubmit = async () => {
    if (solverType === 'text' && !problem) {
      Alert.alert('Error', 'Please enter a math problem');
      return;
    }

    if (solverType === 'image' && !imageBase64) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setLoading(true);
    try {
      let response;
      if (solverType === 'text') {
        response = await apiService.mathSolver({ problem });
      } else {
        response = await apiService.imageToMathSolver({ image_base64: imageBase64 });
      }
      
      if (response.error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.error,
        });
      } else {
        setResult(solverType === 'text' ? response.solution : response.solution);
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
        <Text style={styles.label}>Solve using:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity 
            style={[styles.radioButton, solverType === 'text' && styles.radioSelected]} 
            onPress={() => setSolverType('text')}
          >
            <Text style={styles.radioText}>Text</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.radioButton, solverType === 'image' && styles.radioSelected]} 
            onPress={() => setSolverType('image')}
          >
            <Text style={styles.radioText}>Image</Text>
          </TouchableOpacity>
        </View>

        {solverType === 'text' ? (
          <>
            <Text style={styles.label}>Math Problem:</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder="Enter your math problem here..."
              value={problem}
              onChangeText={setProblem}
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>Select Math Problem Image:</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
                <Text style={styles.buttonText}>Take Photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick from Gallery</Text>
              </TouchableOpacity>
            </View>

            {imageBase64 ? (
              <View style={styles.imagePreview}>
                <Text style={styles.imageLabel}>Selected Image:</Text>
              </View>
            ) : null}
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>Solve Problem</Text>
        </TouchableOpacity>

        {loading && <LoadingSpinner />}

        {result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Solution:</Text>
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
  textArea: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    height: 100,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  imageButton: {
    flex: 1,
    backgroundColor: '#4f46e5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  imagePreview: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imageLabel: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
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

export default MathSolverScreen;