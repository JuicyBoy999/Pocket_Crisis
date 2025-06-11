import React from "react";
import Card from "../ui/Card";
import { JournalEntry } from "../../types";

interface ReflectionPromptsProps {
  journalEntries: JournalEntry[];
}

const emotionPromptMap: Record<string, string> = {
  "😊": "What brought you joy this week? Can you bring more of that into tomorrow?",
  "😔": "You've had some heavy moments. Would it help to write about what’s weighing on you?",
  "😡": "It seems anger showed up often. What might it be protecting you from?",
  "😨": "Anxiety might be trying to protect you. Would breathing or grounding help today?",
  "😌": "There’s a sense of calm here. Can you reflect on what helped you feel safe?",
  "😐": "Neutral days can be restful. Is there something you’ve been avoiding or delaying?",
};

const ReflectionPrompts: React.FC<ReflectionPromptsProps> = ({ journalEntries }) => {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 6); // Include today (7 total days)

  const recentEntries = journalEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= sevenDaysAgo && entryDate <= now;
  });

  const emotionCounts: Record<string, number> = {};
  for (const entry of recentEntries) {
    const emoji = entry.emotion;
    if (emoji) {
      emotionCounts[emoji] = (emotionCounts[emoji] || 0) + 1;
    }
  }

  const mostFrequentEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  const prompt = mostFrequentEmotion
    ? emotionPromptMap[mostFrequentEmotion] || "Take a moment to reflect on how you've felt this week."
    : "Keep journaling to better understand your emotional patterns.";

  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold text-gray-700 mb-2">🪞 Reflection Prompt</h3>
      <Card>
        <p className="text-gray-800">{prompt}</p>
      </Card>
    </div>
  );
};

export default ReflectionPrompts;
