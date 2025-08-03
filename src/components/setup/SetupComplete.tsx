import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const SetupComplete: React.FC = () => {
  const { setCurrentScreen } = useAppContext();
  
  // Animation effect when component mounts
  useEffect(() => {
    const timeout = setTimeout(() => {
      const checkmark = document.getElementById('completion-checkmark');
      if (checkmark) {
        checkmark.classList.add('scale-100');
        checkmark.classList.remove('scale-0');
      }
    }, 300);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <Card className="text-center">
        <div 
          id="completion-checkmark"
          className="w-20 h-20 mx-auto mb-6 text-green-500 transform scale-0 transition-all duration-700"
        >
          <CheckCircle className="w-full h-full" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Setup Complete
        </h1>
        
        <p className="text-gray-600 mb-8">
          Your personal crisis plan has been saved. You can access it anytime 
          you need support by entering Crisis Mode from the welcome screen.
        </p>
        
        <div className="flex flex-col space-y-4">
          <Button 
            onClick={() => setCurrentScreen('welcome')}
            variant="primary" 
            size="lg" 
            fullWidth
          >
            Return to Home
          </Button>
          
          <Button 
            onClick={() => setCurrentScreen('setup-calm')}
            variant="text"
          >
            Edit My Plan
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SetupComplete;