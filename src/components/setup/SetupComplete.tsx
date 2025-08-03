import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const SetupComplete: React.FC = () => {
  const { setCurrentScreen } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <View style={styles.content}>
            <Text style={styles.checkmark}>✅</Text>
            
            <Text style={styles.title}>Setup Complete</Text>
            
            <Text style={styles.description}>
              Your personal crisis plan has been saved. You can access it anytime 
              you need support by entering Crisis Mode from the welcome screen.
            </Text>
            
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => setCurrentScreen('welcome')}
                variant="primary"
                size="lg"
                fullWidth
                style={styles.button}
              >
                Return to Home
              </Button>
              
              <Button
                onPress={() => setCurrentScreen('setup-calm')}
                variant="text"
                style={styles.button}
              >
                Edit My Plan
              </Button>
            </View>
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
  content: {
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    marginBottom: 8,
  },
});

export default SetupComplete;