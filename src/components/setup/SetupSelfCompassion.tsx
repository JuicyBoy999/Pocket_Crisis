import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import TextArea from '../ui/TextArea';

const SetupSelfCompassion: React.FC = () => {
  const { crisisPlanData, updateCrisisPlanData, setCurrentScreen } = useAppContext();
  const [compassion, setCompassion] = useState(crisisPlanData.selfCompassion);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCrisisPlanData('selfCompassion', compassion);
    setCurrentScreen('setup-content');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Words of Comfort
      </h1>
      
      <Card>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">💬 Self-Compassion</h2>
        
        <form onSubmit={handleSubmit}>
          <TextArea
            label="What would you say to yourself in a moment of pain?"
            hint="Write affirmations or reminders that would comfort you in a difficult moment"
            id="self-compassion"
            value={compassion}
            onChange={(e) => setCompassion(e.target.value)}
            placeholder="This will pass. I've gotten through difficult times before..."
            required
          />
          
          <div className="mt-6 flex justify-between">
            <Button 
              type="button"
              variant="text" 
              onClick={() => setCurrentScreen('setup-reasons')}
            >
              Back
            </Button>
            <Button type="submit">
              Next
            </Button>
          </div>
        </form>
      </Card>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Step 4 of 5</p>
      </div>
    </div>
  );
};

export default SetupSelfCompassion;