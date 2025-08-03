import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const WelcomeScreen: React.FC = () => {
  const { setCurrentScreen, hasSavedPlan } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.heartIcon}>❤️</Text>
          <Text style={styles.title}>Welcome to Pocket Crisis Plan</Text>
          <Text style={styles.subtitle}>
            This app helps you create your own personal mental health first-aid kit — 
            something you can turn to when things feel too heavy to carry alone.
          </Text>
        </View>

        <Card>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => setCurrentScreen('setup-calm')}
              variant="primary"
              size="lg"
              fullWidth
              style={styles.button}
            >
              I'm okay, take me to setup
            </Button>

            <Button
              onPress={() => setCurrentScreen('viewJournal')}
              variant="secondary"
              size="lg"
              fullWidth
              style={styles.button}
            >
              View My Journal
            </Button>

            <Button
              onPress={() => setCurrentScreen('crisis-intro')}
              variant="danger"
              size="lg"
              fullWidth
              disabled={!hasSavedPlan}
              style={styles.button}
            >
              I need help right now
            </Button>

            <Button
              onPress={() => setCurrentScreen('chat-assistant')}
              variant="secondary"
              size="lg"
              fullWidth
              style={styles.button}
            >
              💬 Chat with MindEase
            </Button>

            {!hasSavedPlan && (
              <Text style={styles.disabledText}>
                Crisis mode will be available after you complete setup
              </Text>
            )}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heartIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    marginBottom: 8,
  },
  disabledText: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default WelcomeScreen;