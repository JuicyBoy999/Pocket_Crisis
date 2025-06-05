import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const CrisisContacts: React.FC = () => {
  const { crisisPlanData, setCurrentScreen } = useAppContext();
  
  // Parse contacts into a structured format
  const contacts = crisisPlanData.trustedContacts
    .split(/\n|,/)
    .map(item => item.trim())
    .filter(item => item.length > 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Support Network
      </h1>
      
      <Card>
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          📞 You said you trust these people to talk to:
        </h2>
        
        <div className="bg-lavender-50 rounded-lg p-4 mb-6">
          {contacts.length > 0 ? (
            <ul className="space-y-3">
              {contacts.map((contact, index) => (
                <li 
                  key={index} 
                  className="flex items-start space-x-2 animate-fadeIn"
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  <div className="mt-1 text-lavender-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>{contact}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">
              {crisisPlanData.trustedContacts || "You haven't added any trusted contacts yet."}
            </p>
          )}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-700 mb-2 flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Crisis Resources
          </h3>
          <ul className="space-y-1 text-gray-600">
            <li>National Suicide Prevention Lifeline: 988</li>
            <li>Crisis Text Line: Text HOME to 741741</li>
          </ul>
        </div>
        
        <p className="text-gray-600 text-sm mb-6">
          Remember, reaching out is a sign of strength, not weakness.
        </p>
        
        <div className="mt-6 flex justify-between">
          <Button 
            variant="text" 
            onClick={() => setCurrentScreen('crisis-comfort')}
          >
            Back
          </Button>
          <Button 
            onClick={() => setCurrentScreen('crisis-reasons')}
          >
            Continue
          </Button>
        </div>
      </Card>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Step 3 of 6</p>
      </div>
    </div>
  );
};

export default CrisisContacts;