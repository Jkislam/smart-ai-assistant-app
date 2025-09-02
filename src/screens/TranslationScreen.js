import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Picker } from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiService } from '../services/api';
import Toast from 'react-native-toast-message';

const TranslationScreen = () => {
  const [text, setText] = useState('');
  const [fromLang, setFromLang] = useState('english');
  const [toLang, setToLang] = useState('bangla');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const languages = [
    'english', 'bangla', 'hindi', 'spanish', 'french', 
    'german', 'chinese', 'japanese', 'arabic', 'russian'
  ];

  const handleSubmit = async () => {
    if (!text) {
      Alert.alert('Error', 'Please enter text to translate');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.translate({
        text,
        from_lang: fromLang,
        to_lang: toLang
      });
      
      if (response.error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.error,
        });
      } else {
        setResult(response.translated_text);
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
        <Text style={styles.label}>Text to Translate:</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          placeholder="Enter text to translate..."
          value={text}
          onChangeText={setText}
        />

        <Text style={styles.label}>Translate from:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={fromLang}
            style={styles.picker}
            onValueChange={(itemValue) => setFromLang(itemValue)}
          >
            {languages.map((lang) => (
              <Picker.Item 
                key={lang} 
                label={lang.charAt(0).toUpperCase() + lang.slice(1)} 
                value={lang} 
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Translate to:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={toLang}
            style={styles.picker}
            onValueChange={(itemValue) => setToLang(itemValue)}
          >
            {languages.map((lang) => (
              <Picker.Item 
                key={lang} 
                label={lang.charAt(0).toUpperCase() + lang.slice(1)} 
                value={lang} 
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>Translate</Text>
        </TouchableOpacity>

        {loading && <LoadingSpinner />}

        {result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Translation:</Text>
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

export default TranslationScreen;