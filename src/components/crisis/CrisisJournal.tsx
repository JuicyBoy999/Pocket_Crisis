import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import TextArea from '../ui/TextArea';

const CrisisJournal: React.FC = () => {
  const { addJournalEntry, setCurrentScreen } = useAppContext();
  const [entry, setEntry] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');

  const emotions = ['😊', '😔', '😡', '😨', '😌', '😐'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (entry.trim()) {
      addJournalEntry(entry.trim(), selectedEmotion); // Save emotion too
    }
    setCurrentScreen('welcome');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Journal Entry
      </h1>
      
      <Card>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          ✍️ Reflect on This Moment
        </h2>
        
        <form onSubmit={handleSubmit}>
          <TextArea
            label="How are you feeling now?"
            hint="Writing about your feelings can help process them. This is a safe space."
            id="journal-entry"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Share your thoughts..."
            rows={6}
          />

          {/* Emotion Picker */}
          <div className="my-4">
            <label className="block text-sm text-gray-600 mb-1">Tag your emotion (optional):</label>
            <div className="flex gap-3 text-2xl">
              {emotions.map((emo) => (
                <button
                  key={emo}
                  type="button"
                  className={`transition-all rounded-full ${
                    selectedEmotion === emo ? 'scale-125' : 'opacity-60'
                  }`}
                  onClick={() => setSelectedEmotion(emo)}
                >
                  {emo}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button 
              type="button"
              variant="text" 
              onClick={() => setCurrentScreen('welcome')}
            >
              Skip
            </Button>
            <Button 
              type="submit"
              disabled={!entry.trim()}
            >
              Save & Return Home
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CrisisJournal;
