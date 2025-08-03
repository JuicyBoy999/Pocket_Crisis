import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import TextArea from '../ui/TextArea';

const SetupTrustedContacts: React.FC = () => {
  const { crisisPlanData, updateCrisisPlanData, setCurrentScreen } = useAppContext();
  const [contacts, setContacts] = useState(crisisPlanData.trustedContacts);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCrisisPlanData('trustedContacts', contacts);
    setCurrentScreen('setup-reasons');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Building Your Support Network
      </h1>
      
      <Card>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">👥 Trusted People</h2>
        
        <form onSubmit={handleSubmit}>
          <TextArea
            label="Who can you reach out to when you feel alone?"
            hint="Include names and contact info of trusted friends, family, or professionals"
            id="trusted-contacts"
            value={contacts}
            onChange={(e) => setContacts(e.target.value)}
            placeholder="List people you can call or message..."
            required
          />
          
          <div className="mt-6 flex justify-between">
            <Button 
              type="button"
              variant="text" 
              onClick={() => setCurrentScreen('setup-calm')}
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
        <p className="text-sm text-gray-500">Step 2 of 5</p>
      </div>
    </div>
  );
};

export default SetupTrustedContacts;