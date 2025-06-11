import React from 'react';

interface JournalEntry {
  date: string;
  emotion: string;
  content: string;
}

interface Props {
  journalEntries: JournalEntry[];
}

const emotionColors: Record<string, string> = {
  '😊': '#34D399', // green - happy
  '😔': '#60A5FA', // blue - sad
  '😡': '#EF4444', // red - angry
  '😰': '#FBBF24', // yellow - anxious
  '😌': '#A78BFA', // purple - relieved
  '😐': '#9CA3AF', // gray - neutral
  '': '#E5E7EB',    // light gray - none
};

const emotionLabels: Record<string, string> = {
  '😊': 'Happy',
  '😔': 'Sad',
  '😡': 'Angry',
  '😰': 'Anxious',
  '😌': 'Relieved',
  '😐': 'Neutral',
  '': 'None',
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getPast7Days(): Date[] {
  const today = new Date();
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return d;
  }).reverse();
}

const EmotionHeatmap: React.FC<Props> = ({ journalEntries }) => {
  const past7Days = getPast7Days();

  // Find dominant emotion for each day (most frequent)
  const emotionByDay = past7Days.map(day => {
    const dayStr = day.toDateString();
    const entries = journalEntries.filter(
      entry => new Date(entry.date).toDateString() === dayStr
    );

    if (entries.length === 0) return '';

    // Count frequencies
    const freq: Record<string, number> = {};
    for (const e of entries) {
      const emo = e.emotion || '';
      freq[emo] = (freq[emo] || 0) + 1;
    }

    // Return emotion with highest count
    const dominant = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
    return dominant;
  });

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">📊 Weekly Emotion Heatmap</h2>
      <div className="flex gap-2">
        {past7Days.map((day, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              title={`${daysOfWeek[day.getDay()]}, ${day.toLocaleDateString()}: ${emotionLabels[emotionByDay[i]]}`}
              className="w-10 h-10 rounded cursor-default"
              style={{ backgroundColor: emotionColors[emotionByDay[i]] }}
            />
            <span className="text-xs text-gray-600 mt-1">{daysOfWeek[day.getDay()]}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {Object.entries(emotionLabels).map(([emoji, label]) => (
          <div key={emoji} className="flex items-center gap-1 text-sm text-gray-700">
            <div
              className="w-5 h-5 rounded"
              style={{ backgroundColor: emotionColors[emoji] }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionHeatmap;
