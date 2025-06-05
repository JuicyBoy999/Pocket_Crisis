import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const CrisisComfort: React.FC = () => {
  const { crisisPlanData, setCurrentScreen } = useAppContext();
  
  // Split the calming techniques into a list for better presentation
  const techniques = crisisPlanData.calmingTechniques
    .split(/\n|,|\./)
    .map(item => item.trim())
    .filter(item => item.length > 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Calming Techniques
      </h1>
      
      <Card>
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          🧘 Here are the things you said help you calm down:
        </h2>
        
        <div className="bg-sky-50 rounded-lg p-4 mb-6">
          {techniques.length > 0 ? (
            <ul className="space-y-2">
              {techniques.map((technique, index) => (
                <li 
                  key={index} 
                  className="pl-4 border-l-2 border-sky-300 py-1 animate-fadeIn"
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  {technique}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">
              {crisisPlanData.calmingTechniques || "You haven't added any calming techniques yet."}
            </p>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-6">
          Try one of these techniques now. Give yourself permission to take the time you need.
        </p>
        
        <div className="mt-6 flex justify-between">
          <Button 
            variant="text" 
            onClick={() => setCurrentScreen('crisis-grounding')}
          >
            Back
          </Button>
          <Button 
            onClick={() => setCurrentScreen('crisis-contacts')}
          >
            Continue
          </Button>
        </div>
      </Card>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Step 2 of 6</p>
      </div>
    </div>
  );
};

export default CrisisComfort;