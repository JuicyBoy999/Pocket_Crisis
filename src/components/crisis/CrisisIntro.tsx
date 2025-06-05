import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const CrisisIntro: React.FC = () => {
  const { setCurrentScreen } = useAppContext();
  
  // Pulsing animation effect for emergency icon
  useEffect(() => {
    const icon = document.getElementById('emergency-icon');
    if (icon) {
      setInterval(() => {
        icon.classList.toggle('scale-110');
      }, 1500);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <Card className="border-l-4 border-red-400">
        <div 
          id="emergency-icon"
          className="w-16 h-16 mx-auto mb-4 text-red-500 transition-transform duration-700"
        >
          <AlertTriangle className="w-full h-full" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
          🚨 Crisis Mode Activated
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 text-center">
          I'm here with you. Let's go one step at a time.
        </p>
        
        <p className="text-gray-600 mb-6">
          Remember: This moment is temporary. You've created this plan to help you through 
          difficult times like this one. We'll walk through it together.
        </p>
        
        <Button 
          onClick={() => setCurrentScreen('crisis-grounding')}
          variant="primary" 
          size="lg" 
          fullWidth
        >
          Begin
        </Button>
        
        <div className="mt-4 text-center">
          <Button 
            onClick={() => setCurrentScreen('welcome')}
            variant="text"
            size="sm"
          >
            Return to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CrisisIntro;