export interface ComfortFile {
  name: string;
  url: string;
  type: string; // e.g., 'image', 'video', 'audio'
}

export interface CrisisPlanData {
  calmingTechniques: string;
  trustedContacts: string;
  reasonsToStay: string;
  selfCompassion: string;
  comfortContent: {
    link: string;
    files: ComfortFile[];
  };
}


    comfortMedia?: {
    images: string[]; // base64 or blob URLs
    videos: string[];
    audios: string[];
  };
}

export interface JournalEntry {
  date: string;
  content: string;
  emotion?: string; // e.g. "😢", "😊", "😡"
}

export type AppScreen = 
  | "welcome"
  | "setup-calm"
  | "setup-contacts"
  | "setup-reasons"
  | "setup-compassion"
  | "setup-content"
  | "setup-complete"
  | "crisis-intro"
  | "crisis-grounding"
  | "crisis-comfort"
  | "crisis-contacts"
  | "crisis-reasons"
  | "crisis-affirmations"
  | "crisis-content"
  | "crisis-final"
  | "crisis-journal"
  | "chat-assistant";