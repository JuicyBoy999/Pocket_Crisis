import React, { createContext, useContext, useState, useEffect } from 'react';
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
  setJournalEntries: 
  React.Dispatch<React.SetStateAction<JournalEntry[]>>;

}

const defaultCrisisPlanData: CrisisPlanData = {
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


  // Load saved plan from localStorage
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem('crisisPlanData');
      const savedJournal = localStorage.getItem('journalEntries');
      
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
  }, []);

  // Save plan to localStorage when it changes
  useEffect(() => {
    try {
      if (Object.values(crisisPlanData).some(value => value !== '')) {
        localStorage.setItem('crisisPlanData', JSON.stringify(crisisPlanData));
        setHasSavedPlan(true);
      }
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  }, [crisisPlanData]);

  // Save journal entries when they change
  useEffect(() => {
    try {
      localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    } catch (error) {
      console.error('Error saving journal entries:', error);
    }
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};