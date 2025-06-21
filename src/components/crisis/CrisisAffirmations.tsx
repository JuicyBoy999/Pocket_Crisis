import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const CrisisAffirmations: React.FC = () => {
  const { crisisPlanData, setCurrentScreen } = useAppContext();
  

  const affirmations = crisisPlanData.selfCompassion
    .split(/\n|\./)
    .map(item => item.trim())
    .filter(item => item.length > 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Words of Comfort
      </h1>
      
      <Card>
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          💬 Here's what you wrote when you were calm:
        </h2>
        
        <div className="mb-6">
          {affirmations.length > 0 ? (
            <div className="space-y-3">
              {affirmations.map((affirmation, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-100 p-4 rounded-lg relative ${index % 2 === 0 ? 'ml-4' : 'mr-4'}`}
                >
                  <MessageCircle className={`absolute ${index % 2 === 0 ? '-left-3' : '-right-3'} top-3 w-6 h-6 text-sky-500`} />
                  <p className="text-gray-700 animate-fadeIn" style={{ animationDelay: `${index * 400}ms` }}>
                    "{affirmation}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic bg-gray-100 p-4 rounded-lg">
              {crisisPlanData.selfCompassion || "You haven't added your affirmations yet."}
            </p>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-6">
          These words came from you, at a time when you were feeling stronger. 
          They're true now, even if they don't feel true.
        </p>
        
        <div className="mt-6 flex justify-center gap-4 flex-wrap">

          <Button 
            variant="text" 
            onClick={() => setCurrentScreen('crisis-reasons')}
          >
            Back
          </Button>
          <Button 
            onClick={() => setCurrentScreen('crisis-content')}
          >
            Continue
          </Button>
        </div>
      </Card>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Step 5 of 6</p>
      </div>
    </div>
  );
};

export default CrisisAffirmations;