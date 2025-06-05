import React from 'react';
import { Heart } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const CrisisReasons: React.FC = () => {
  const { crisisPlanData, setCurrentScreen } = useAppContext();
  
  // Split the reasons into a list
  const reasons = crisisPlanData.reasonsToStay
    .split(/\n|,|\./)
    .map(item => item.trim())
    .filter(item => item.length > 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Reasons to Hold On
      </h1>
      
      <Card>
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          ❤️ You told me these are your reasons to keep going:
        </h2>
        
        <div className="bg-peach-50 rounded-lg p-4 mb-6">
          {reasons.length > 0 ? (
            <ul className="space-y-3">
              {reasons.map((reason, index) => (
                <li 
                  key={index} 
                  className="flex items-start"
                >
                  <div className="mr-3 mt-1 text-red-400">
                    <Heart className={`w-5 h-5 animate-pulse`} style={{ animationDelay: `${index * 500}ms` }} />
                  </div>
                  <div className="animate-fadeIn" style={{ animationDelay: `${index * 300}ms` }}>
                    {reason}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">
              {crisisPlanData.reasonsToStay || "You haven't added your reasons yet."}
            </p>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-6">
          These are your anchors. They're worth holding on for.
        </p>
        
        <div className="mt-6 flex justify-between">
          <Button 
            variant="text" 
            onClick={() => setCurrentScreen('crisis-contacts')}
          >
            Back
          </Button>
          <Button 
            onClick={() => setCurrentScreen('crisis-affirmations')}
          >
            Continue
          </Button>
        </div>
      </Card>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Step 4 of 6</p>
      </div>
    </div>
  );
};

export default CrisisReasons;