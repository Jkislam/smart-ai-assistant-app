import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
// Import screens
import HomeScreen from './src/screens/HomeScreen';
import SummaryScreen from './src/screens/SummaryScreen';
import McqScreen from './src/screens/McqScreen';
import ImageProcessingScreen from './src/screens/ImageProcessingScreen';
import RoutineScreen from './src/screens/RoutineScreen';
import ChapterScreen from './src/screens/ChapterScreen';
import MathSolverScreen from './src/screens/MathSolverScreen';
import ChatScreen from './src/screens/ChatScreen';
import EssayScreen from './src/screens/EssayScreen';
import GrammarScreen from './src/screens/GrammarScreen';
import TranslationScreen from './src/screens/TranslationScreen';
import FlashcardScreen from './src/screens/FlashcardScreen';
import HomeworkScreen from './src/screens/HomeworkScreen';
import StudyTipsScreen from './src/screens/StudyTipsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#4f46e5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Smart AI Assistant' }}
          />
          <Stack.Screen 
            name="Summary" 
            component={SummaryScreen} 
            options={{ title: 'Video/Text Summary' }}
          />
          <Stack.Screen 
            name="MCQ" 
            component={McqScreen} 
            options={{ title: 'Generate MCQs' }}
          />
          <Stack.Screen 
            name="ImageProcessing" 
            component={ImageProcessingScreen} 
            options={{ title: 'Image Processing' }}
          />
          <Stack.Screen 
            name="Routine" 
            component={RoutineScreen} 
            options={{ title: 'Study Routine' }}
          />
          <Stack.Screen 
            name="Chapter" 
            component={ChapterScreen} 
            options={{ title: 'Chapter Questions' }}
          />
          <Stack.Screen 
            name="MathSolver" 
            component={MathSolverScreen} 
            options={{ title: 'Math Solver' }}
          />
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen} 
            options={{ title: 'AI Chat' }}
          />
          <Stack.Screen 
            name="Essay" 
            component={EssayScreen} 
            options={{ title: 'Essay Generator' }}
          />
          <Stack.Screen 
            name="Grammar" 
            component={GrammarScreen} 
            options={{ title: 'Grammar Check' }}
          />
          <Stack.Screen 
            name="Translation" 
            component={TranslationScreen} 
            options={{ title: 'Translation' }}
          />
          <Stack.Screen 
            name="Flashcard" 
            component={FlashcardScreen} 
            options={{ title: 'Flashcards' }}
          />
          <Stack.Screen 
            name="Homework" 
            component={HomeworkScreen} 
            options={{ title: 'Homework Help' }}
          />
          <Stack.Screen 
            name="StudyTips" 
            component={StudyTipsScreen} 
            options={{ title: 'Study Tips' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
      <StatusBar style="auto" />
    </>
  );
}