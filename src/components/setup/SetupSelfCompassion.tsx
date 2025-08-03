import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import TextArea from '../ui/TextArea';

const SetupSelfCompassion: React.FC = () => {
  const { crisisPlanData, updateCrisisPlanData, setCurrentScreen } = useAppContext();
  const [compassion, setCompassion] = useState(crisisPlanData.selfCompassion);

  const handleSubmit = () => {
    updateCrisisPlanData('selfCompassion', compassion);
    setCurrentScreen('setup-content');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Words of Comfort</Text>
        
        <Card>
          <Text style={styles.cardTitle}>💬 Self-Compassion</Text>
          
          <TextArea
            label="What would you say to yourself in a moment of pain?"
            hint="Write affirmations or reminders that would comfort you in a difficult moment"
            value={compassion}
            onChangeText={setCompassion}
            placeholder="This will pass. I've gotten through difficult times before..."
            required
          />
          
          <View style={styles.buttonRow}>
            <Button
              onPress={() => setCurrentScreen('setup-reasons')}
              variant="text"
              style={styles.backButton}
            >
              Back
            </Button>
            <Button
              onPress={handleSubmit}
              disabled={!compassion.trim()}
              style={styles.nextButton}
            >
              Next
            </Button>
          </View>
        </Card>
        
        <Text style={styles.stepText}>Step 4 of 5</Text>
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

export default SetupSelfCompassion;