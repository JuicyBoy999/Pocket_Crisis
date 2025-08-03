import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import TextArea from '../ui/TextArea';

const SetupTrustedContacts: React.FC = () => {
  const { crisisPlanData, updateCrisisPlanData, setCurrentScreen } = useAppContext();
  const [contacts, setContacts] = useState(crisisPlanData.trustedContacts);

  const handleSubmit = () => {
    updateCrisisPlanData('trustedContacts', contacts);
    setCurrentScreen('setup-reasons');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Building Your Support Network</Text>
        
        <Card>
          <Text style={styles.cardTitle}>👥 Trusted People</Text>
          
          <TextArea
            label="Who can you reach out to when you feel alone?"
            hint="Include names and contact info of trusted friends, family, or professionals"
            value={contacts}
            onChangeText={setContacts}
            placeholder="List people you can call or message..."
            required
          />
          
          <View style={styles.buttonRow}>
            <Button
              onPress={() => setCurrentScreen('setup-calm')}
              variant="text"
              style={styles.backButton}
            >
              Back
            </Button>
            <Button
              onPress={handleSubmit}
              disabled={!contacts.trim()}
              style={styles.nextButton}
            >
              Next
            </Button>
          </View>
        </Card>
        
        <Text style={styles.stepText}>Step 2 of 5</Text>
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

export default SetupTrustedContacts;