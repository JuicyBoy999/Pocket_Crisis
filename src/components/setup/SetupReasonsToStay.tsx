import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import TextArea from '../ui/TextArea';

const SetupReasonsToStay: React.FC = () => {
  const { crisisPlanData, updateCrisisPlanData, setCurrentScreen } = useAppContext();
  const [reasons, setReasons] = useState(crisisPlanData.reasonsToStay);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCrisisPlanData('reasonsToStay', reasons);
    setCurrentScreen('setup-compassion');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Anchors
      </h1>
      
      <Card>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">💖 Reasons to Hold On</h2>
        
        <form onSubmit={handleSubmit}>
          <TextArea
            label="What are 3 things that make life worth holding on to?"
            hint="These can be people, pets, dreams, experiences, or simple joys"
            id="reasons-to-stay"
            value={reasons}
            onChange={(e) => setReasons(e.target.value)}
            placeholder="List what anchors you to life..."
            required
          />
          
          <div className="mt-6 flex justify-between">
            <Button 
              type="button"
              variant="text" 
              onClick={() => setCurrentScreen('setup-contacts')}
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
        <p className="text-sm text-gray-500">Step 3 of 5</p>
      </div>
    </div>
  );
};

export default SetupReasonsToStay;