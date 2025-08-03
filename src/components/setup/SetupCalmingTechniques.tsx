import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import TextArea from '../ui/TextArea';

const SetupCalmingTechniques: React.FC = () => {
  const { crisisPlanData, updateCrisisPlanData, setCurrentScreen } = useAppContext();
  const [techniques, setTechniques] = useState(crisisPlanData.calmingTechniques);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCrisisPlanData('calmingTechniques', techniques);
    setCurrentScreen('setup-contacts');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Let's Build Your Personal Crisis Plan
      </h1>
      
      <Card>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">🌬️ Calming Techniques</h2>
        
        <form onSubmit={handleSubmit}>
          <TextArea
            label="What helps you calm down when you're overwhelmed?"
            hint="Examples: Deep breathing, walking outside, splashing cold water on your face, listening to a specific song, counting objects around you"
            id="calming-techniques"
            value={techniques}
            onChange={(e) => setTechniques(e.target.value)}
            placeholder="List your personal calming techniques here..."
            required
          />
          
          <div className="mt-6 flex justify-between">
            <Button 
              type="button"
              variant="text" 
              onClick={() => setCurrentScreen('welcome')}
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
        <p className="text-sm text-gray-500">Step 1 of 5</p>
      </div>
    </div>
  );
};

export default SetupCalmingTechniques;