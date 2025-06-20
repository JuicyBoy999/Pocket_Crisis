import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import ViewJournal from './components/journal/ViewJournal';
import WelcomeScreen from './components/welcome/WelcomeScreen';
import SetupCalmingTechniques from './components/setup/SetupCalmingTechniques';
import SetupTrustedContacts from './components/setup/SetupTrustedContacts';
import SetupReasonsToStay from './components/setup/SetupReasonsToStay';
import SetupSelfCompassion from './components/setup/SetupSelfCompassion';
import SetupComfortContent from './components/setup/SetupComfortContent';
import SetupComplete from './components/setup/SetupComplete';
import CrisisIntro from './components/crisis/CrisisIntro';
import CrisisGrounding from './components/crisis/CrisisGrounding';
import CrisisComfort from './components/crisis/CrisisComfort';
import CrisisContacts from './components/crisis/CrisisContacts';
import CrisisReasons from './components/crisis/CrisisReasons';
import CrisisAffirmations from './components/crisis/CrisisAffirmations';
import CrisisContent from './components/crisis/CrisisContent';
import CrisisFinal from './components/crisis/CrisisFinal';
import CrisisJournal from './components/crisis/CrisisJournal';
import MindEaseChat from './components/chat/MindEaseChat';
import './styles/animations.css';

const AppContent: React.FC = () => {
  const { currentScreen } = useAppContext();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'viewJournal':
        return <ViewJournal />;
      case 'setup-calm':
        return <SetupCalmingTechniques />;
      case 'setup-contacts':
        return <SetupTrustedContacts />;
      case 'setup-reasons':
        return <SetupReasonsToStay />;
      case 'setup-compassion':
        return <SetupSelfCompassion />;
      case 'setup-content':
        return <SetupComfortContent />;
      case 'setup-complete':
        return <SetupComplete />;
      case 'crisis-intro':
        return <CrisisIntro />;
      case 'crisis-grounding':
        return <CrisisGrounding />;
      case 'crisis-comfort':
        return <CrisisComfort />;
      case 'crisis-contacts':
        return <CrisisContacts />;
      case 'crisis-reasons':
        return <CrisisReasons />;
      case 'crisis-affirmations':
        return <CrisisAffirmations />;
      case 'crisis-content':
        return <CrisisContent />;
      case 'crisis-final':
        return <CrisisFinal />;
      case 'crisis-journal':
        return <CrisisJournal />;
      case 'chat-assistant' :
        return <MindEaseChat />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="font-['Nunito', sans-serif] min-h-screen bg-gradient-to-b from-sky-50 to-lavender-50">
      {renderScreen()}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;