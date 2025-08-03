import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppScreen, CrisisPlanData, JournalEntry } from '../types';

interface AppContextType {
  currentScreen: AppScreen;
  setCurrentScreen: (screen: AppScreen) => void;
  crisisPlanData: CrisisPlanData;
  updateCrisisPlanData: <K extends keyof CrisisPlanData>(key: K, value: CrisisPlanData[K]) => void;
  hasSavedPlan: boolean;
  journalEntries: JournalEntry[];
  addJournalEntry: (content: string, emotion?: string) => void;
  editJournalEntry: (index: number, content: string, emotion?: string) => void;
  deleteJournalEntry: (index: number) => void;
  setJournalEntries: React.Dispatch<React.SetStateAction<JournalEntry[]>>;
}

const defaultCrisisPlanData: CrisisPlanData = {
  }
  calmingTechniques: '',
  trustedContacts: '',
  reasonsToStay: '',
  selfCompassion: '',
  comfortContent: {
    link: '',
    files: []
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [crisisPlanData, setCrisisPlanData] = useState<CrisisPlanData>(defaultCrisisPlanData);
  const [hasSavedPlan, setHasSavedPlan] = useState<boolean>(false);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  const editJournalEntry = (index: number, newContent: string, newEmotion?: string) => {
    setJournalEntries(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        content: newContent,
        emotion: newEmotion
      };
      return updated;
    });
  };

  const deleteJournalEntry = (index: number) => {
    setJournalEntries(prev => prev.filter((_, i) => i !== index));
  };

  // Load saved plan from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedPlan = await AsyncStorage.getItem('crisisPlanData');
        const savedJournal = await AsyncStorage.getItem('journalEntries');
        
        if (savedPlan) {
          setCrisisPlanData(JSON.parse(savedPlan));
          setHasSavedPlan(true);
        }
        
        if (savedJournal) {
          setJournalEntries(JSON.parse(savedJournal));
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };
    
    loadData();
  }, []);

  // Save plan to AsyncStorage when it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        if (Object.values(crisisPlanData).some(value => 
          typeof value === 'string' ? value !== '' : 
          value.link !== '' || value.files.length > 0
        )) {
          await AsyncStorage.setItem('crisisPlanData', JSON.stringify(crisisPlanData));
          setHasSavedPlan(true);
        }
      } catch (error) {
        console.error('Error saving plan:', error);
      }
    };
    
    saveData();
  }, [crisisPlanData]);

  // Save journal entries when they change
  useEffect(() => {
    const saveJournal = async () => {
      try {
        await AsyncStorage.setItem('journalEntries', JSON.stringify(journalEntries));
      } catch (error) {
        console.error('Error saving journal entries:', error);
      }
    };
    
    saveJournal();
  }, [journalEntries]);

  const updateCrisisPlanData = <K extends keyof CrisisPlanData>(
    key: K,
    value: CrisisPlanData[K]
  ) => {
    setCrisisPlanData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const addJournalEntry = (content: string, emotion?: string) => {
    const newEntry: JournalEntry = {
      date: new Date().toISOString(),
      content,
      emotion
    };
    setJournalEntries(prev => [...prev, newEntry]);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        crisisPlanData,
        updateCrisisPlanData,
        hasSavedPlan,
        journalEntries,
        addJournalEntry,
        editJournalEntry,
        deleteJournalEntry,
        setJournalEntries,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
    }
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};