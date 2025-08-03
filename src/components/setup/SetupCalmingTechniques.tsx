import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import TextArea from '../ui/TextArea';

const SetupCalmingTechniques: React.FC = () => {
  const { crisisPlanData, updateCrisisPlanData, setCurrentScreen } = useAppContext();
  const [techniques, setTechniques] = useState(crisisPlanData.calmingTechniques);

  const handleSubmit = () => {
    updateCrisisPlanData('calmingTechniques', techniques);
    setCurrentScreen('setup-contacts');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Let's Build Your Personal Crisis Plan</Text>
        
        <Card>
          <Text style={styles.cardTitle}>🌬️ Calming Techniques</Text>
          
          <TextArea
            label="What helps you calm down when you're overwhelmed?"
            hint="Examples: Deep breathing, walking outside, splashing cold water on your face, listening to a specific song, counting objects around you"
            value={techniques}
            onChangeText={setTechniques}
            placeholder="List your personal calming techniques here..."
            required
          />
          
          <View style={styles.buttonRow}>
            <Button
              onPress={() => setCurrentScreen('welcome')}
              variant="text"
              style={styles.backButton}
            >
              Back
            </Button>
            <Button
              onPress={handleSubmit}
              disabled={!techniques.trim()}
              style={styles.nextButton}
            >
              Next
            </Button>
          </View>
        </Card>
        
        <Text style={styles.stepText}>Step 1 of 5</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  backButton: {
    flex: 0,
  },
  nextButton: {
    flex: 0,
    paddingHorizontal: 32,
  },
  stepText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default SetupCalmingTechniques;