import React from 'react';
import { Heart } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const WelcomeScreen: React.FC = () => {
  const { setCurrentScreen, hasSavedPlan } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-fadeIn">
      <div className="mb-8 text-sky-500">
        <Heart className="w-20 h-20 mx-auto animate-pulse" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Welcome to Pocket Crisis Plan
      </h1>
      
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        This app helps you create your own personal mental health first-aid kit — something you can turn to when things feel too heavy to carry alone.
      </p>
      
      <Card className="mb-6">
  <div className="flex flex-col space-y-4">
   <Button 
      onClick={() => setCurrentScreen('setup-calm')}
      variant="primary" 
      size="lg" 
      fullWidth
    >
      I'm okay, take me to setup
    </Button>

    <Button 
      onClick={() => setCurrentScreen('viewJournal')}
      variant="secondary"
      size="lg"
      fullWidth
    >
      View My Journal
    </Button>

    <Button 
      onClick={() => setCurrentScreen('crisis-intro')}
      variant="danger" 
      size="lg" 
      fullWidth
      disabled={!hasSavedPlan}
    >
      I need help right now
    </Button>

    {!hasSavedPlan && (
      <p className="text-sm text-gray-500 italic">
        Crisis mode will be available after you complete setup
      </p>
    )}
  </div>
</Card>
    </div>
  );
};

export default WelcomeScreen;