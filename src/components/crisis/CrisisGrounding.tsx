import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import BreathingAnimation from '../ui/BreathingAnimation';

const CrisisGrounding: React.FC = () => {
  const { setCurrentScreen } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Let's Ground Ourselves
      </h1>
      
      <Card>
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">🌬️ Breathe With Me</h2>
        
        <BreathingAnimation />
        
        <div className="mt-6 border-t border-gray-100 pt-6">
          <h3 className="font-medium text-gray-700 mb-3">Grounding Exercise:</h3>
          
          <ul className="space-y-3 text-gray-600 mb-6">
            <li className="pl-4 border-l-2 border-sky-200">
              <strong>See:</strong> Name 3 things you can see right now
            </li>
            <li className="pl-4 border-l-2 border-sky-200">
              <strong>Touch:</strong> Find 2 things you can feel with your hands
            </li>
            <li className="pl-4 border-l-2 border-sky-200">
              <strong>Listen:</strong> Notice 1 sound you can hear
            </li>
          </ul>
          
          <p className="text-gray-600 text-sm italic mb-6">
            Take your time with this. There's no rush.
          </p>
        </div>
        
        <div className="mt-6 flex justify-between">
          <Button 
            variant="text" 
            onClick={() => setCurrentScreen('crisis-intro')}
          >
            Back
          </Button>
          <Button 
            onClick={() => setCurrentScreen('crisis-comfort')}
          >
            Continue
          </Button>
        </div>
      </Card>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Step 1 of 6</p>
      </div>
    </div>
  );
};

export default CrisisGrounding;