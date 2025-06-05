import React, { useEffect, useState } from 'react';
import { Sunrise } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const CrisisFinal: React.FC = () => {
  const { setCurrentScreen } = useAppContext();
  const [fadeIn, setFadeIn] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <Card className="text-center">
        <div className="mb-6 text-orange-400">
          <Sunrise className={`w-16 h-16 mx-auto transition-all duration-1000 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          🌅 You Made It Through This Moment
        </h1>
        
        <p className={`text-lg text-gray-600 mb-4 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
          It won't always feel like this.
        </p>
        
        <p className={`text-lg text-gray-600 mb-8 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          You were here for yourself — and I'm proud of you.
        </p>
        
        <div className={`space-y-4 transition-all duration-1000 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '900ms' }}>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            📝 Would you like to reflect on what just happened?
          </h2>
          
          <div className="space-y-3">
            <Button 
              onClick={() => setCurrentScreen('crisis-journal')}
              variant="primary" 
              size="lg" 
              fullWidth
            >
              Yes, open journal
            </Button>
            
            <Button 
              onClick={() => setCurrentScreen('welcome')}
              variant="text" 
              size="lg" 
              fullWidth
            >
              Skip
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-gray-500">
            Remember, you can revisit your crisis plan anytime. 
            You're never alone.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CrisisFinal