import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiService } from '../services/api';
import { imageUtils } from '../utils/imageUtils';
import Toast from 'react-native-toast-message';

const ImageProcessingScreen = () => {
  const [imageBase64, setImageBase64] = useState('');
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [processType, setProcessType] = useState('');

  const takePhoto = async () => {
    try {
      const imageData = await imageUtils.takePhoto();
      if (imageData) {
        setImageBase64(imageData);
        setResult({});
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
        setResult({});
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  const processImage = async (type) => {
    if (!imageBase64) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setLoading(true);
    setProcessType(type);
    
    try {
      let response;
      switch (type) {
        case 'notes':
          response = await apiService.imageToNotes({ image_base64: imageBase64 });
          break;
        case 'mcq':
          response = await apiService.imageToMCQ({ image_base64: imageBase64, count: 5 });
          break;
        case 'cq':
          response = await apiService.imageToCQ({ image_base64: imageBase64 });
          break;
        case 'answer':
          response = await apiService.imageToAnswer({ image_base64: imageBase64 });
          break;
        case 'math':
          response = await apiService.imageToMathSolver({ image_base64: imageBase64 });
          break;
        default:
          throw new Error('Invalid process type');
      }
      
      if (response.error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.error,
        });
      } else {
        setResult(response);
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
        <Text style={styles.label}>Select Image:</Text>
        
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
            <Image 
              source={{ uri: imageBase64 }} 
              style={styles.image} 
              resizeMode="contain"
            />
          </View>
        ) : null}

        <Text style={styles.label}>Process Image:</Text>
        <View style={styles.processButtons}>
          <TouchableOpacity 
            style={styles.processButton} 
            onPress={() => processImage('notes')}
            disabled={!imageBase64 || loading}
          >
            <Text style={styles.buttonText}>To Notes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.processButton} 
            onPress={() => processImage('mcq')}
            disabled={!imageBase64 || loading}
          >
            <Text style={styles.buttonText}>To MCQ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.processButton} 
            onPress={() => processImage('cq')}
            disabled={!imageBase64 || loading}
          >
            <Text style={styles.buttonText}>To CQ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.processButton} 
            onPress={() => processImage('answer')}
            disabled={!imageBase64 || loading}
          >
            <Text style={styles.buttonText}>To Answer</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.processButton} 
            onPress={() => processImage('math')}
            disabled={!imageBase64 || loading}
          >
            <Text style={styles.buttonText}>Math Solver</Text>
          </TouchableOpacity>
        </View>

        {loading && <LoadingSpinner />}

        {result.extracted_text ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Extracted Text:</Text>
            <Text style={styles.resultText}>{result.extracted_text}</Text>
          </View>
        ) : null}

        {result.summary ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Notes:</Text>
            <Text style={styles.resultText}>{result.summary}</Text>
          </View>
        ) : null}

        {result.mcqs ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>MCQs:</Text>
            <Text style={styles.resultText}>{result.mcqs}</Text>
          </View>
        ) : null}

        {result.cq ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Creative Question:</Text>
            <Text style={styles.resultText}>{result.cq}</Text>
          </View>
        ) : null}

        {result.answer ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Answer:</Text>
            <Text style={styles.resultText}>{result.answer}</Text>
          </View>
        ) : null}

        {result.solution ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Solution:</Text>
            <Text style={styles.resultText}>{result.solution}</Text>
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
  processButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  processButton: {
    width: '48%',
    backgroundColor: '#4f46e5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imagePreview: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
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

export default ImageProcessingScreen;