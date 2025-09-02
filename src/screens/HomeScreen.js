import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import FeatureCard from '../components/FeatureCard';

const HomeScreen = ({ navigation }) => {
  const features = [
    { title: 'Video/Text Summary', icon: 'document-text-outline', screen: 'Summary' },
    { title: 'Generate MCQs', icon: 'list-outline', screen: 'MCQ' },
    { title: 'Image Processing', icon: 'image-outline', screen: 'ImageProcessing' },
    { title: 'Study Routine', icon: 'calendar-outline', screen: 'Routine' },
    { title: 'Chapter Questions', icon: 'book-outline', screen: 'Chapter' },
    { title: 'Math Solver', icon: 'calculator-outline', screen: 'MathSolver' },
    { title: 'AI Chat', icon: 'chatbubbles-outline', screen: 'Chat' },
    { title: 'Essay Generator', icon: 'create-outline', screen: 'Essay' },
    { title: 'Grammar Check', icon: 'checkmark-circle-outline', screen: 'Grammar' },
    { title: 'Translation', icon: 'language-outline', screen: 'Translation' },
    { title: 'Flashcards', icon: 'albums-outline', screen: 'Flashcard' },
    { title: 'Homework Help', icon: 'school-outline', screen: 'Homework' },
    { title: 'Study Tips', icon: 'bulb-outline', screen: 'StudyTips' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome to Smart AI Assistant</Text>
        <Text style={styles.subtitle}>Your personal learning companion</Text>
      </View>
      
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            icon={feature.icon}
            onPress={() => navigation.navigate(feature.screen)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 20,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
});

export default HomeScreen;