import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiService } from '../services/api';
import Toast from 'react-native-toast-message';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [conversation]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    setConversation(prev => [...prev, userMessage]);
    setLoading(true);
    
    const tempMessage = message;
    setMessage('');

    try {
      const response = await apiService.chat({ 
        message: tempMessage, 
        user_id: 'mobile_user' 
      });
      
      if (response.error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.error,
        });
        setConversation(prev => prev.filter(msg => msg.content !== tempMessage));
      } else {
        const aiMessage = { role: 'assistant', content: response.response };
        setConversation(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
      setConversation(prev => prev.filter(msg => msg.content !== tempMessage));
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setConversation([]);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Text style={styles.title}>AI Chat Assistant</Text>
        <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear Chat</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
      >
        {conversation.length === 0 ? (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Hello! I'm your AI assistant. How can I help you with your studies today?
            </Text>
          </View>
        ) : (
          conversation.map((msg, index) => (
            <View 
              key={index} 
              style={[
                styles.messageBubble, 
                msg.role === 'user' ? styles.userBubble : styles.aiBubble
              ]}
            >
              <Text style={[
                styles.messageText,
                msg.role === 'user' ? styles.userText : styles.aiText
              ]}>
                {msg.content}
              </Text>
            </View>
          ))
        )}
        
        {loading && (
          <View style={[styles.messageBubble, styles.aiBubble]}>
            <LoadingSpinner size="small" />
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleSend}
          disabled={loading || !message.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4f46e5',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 12,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  chatContent: {
    paddingBottom: 20,
  },
  welcomeContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4f46e5',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: 'white',
  },
  aiText: {
    color: '#374151',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;