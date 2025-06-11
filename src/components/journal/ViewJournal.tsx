import EmotionHeatmap from './EmotionHeatmap';
import React, { useState } from 'react';
import { useAppContext } from "../../context/AppContext";
import Card from "../ui/Card";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import ReflectionPrompts from './ReflectionPrompts';

const ViewJournal: React.FC = () => {
  const {
    journalEntries,
    setCurrentScreen,
    editJournalEntry,
    deleteJournalEntry
  } = useAppContext();

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editEmotion, setEditEmotion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const emotionMap: Record<string, string> = {
    '😊': 'happy',
    '😔': 'sad',
    '😡': 'angry',
    '😨': 'anxious',
    '😌': 'relieved',
    '😐': 'neutral'
  };

  const normalizeEmotion = (emotion: string | undefined) => {
    if (!emotion) return '';
    const lower = emotion.toLowerCase();
    return emotionMap[emotion] || lower;
  };

  const handleEdit = (index: number, content: string, emotion: string) => {
    setEditingIndex(index);
    setEditContent(content);
    setEditEmotion(emotion || '');
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      editJournalEntry(editingIndex, editContent.trim(), editEmotion);
      setEditingIndex(null);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditContent('');
  };

  const getReadableDate = (dateString: string) => {
    const entryDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (entryDate.toDateString() === today.toDateString()) return "Today";
    if (entryDate.toDateString() === yesterday.toDateString()) return "Yesterday";
    return entryDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  };

const filteredEntries = journalEntries.filter(entry => {
  const lower = searchTerm.toLowerCase().trim();

  if (!lower) return true;

  // Handle `emotion:` filter
  if (lower.startsWith("emotion:")) {
    const emotionQuery = lower.replace("emotion:", "").trim();
    return emotionQuery === ""
      ? true
      : normalizeEmotion(entry.emotion).includes(emotionQuery);
  }

  // Default: normal keyword search
  return (
    entry.content.toLowerCase().includes(lower) ||
    normalizeEmotion(entry.emotion).includes(lower)
  );
});



  const groupedEntries: Record<string, typeof journalEntries> = {};
  filteredEntries
    .slice()
    .reverse()
    .forEach((entry, i) => {
      const date = getReadableDate(entry.date);
      const originalIndex = journalEntries.findIndex(e => e.date === entry.date && e.content === entry.content);
      if (!groupedEntries[date]) groupedEntries[date] = [];
      groupedEntries[date].push({ ...entry, originalIndex });
    });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('welcome')}
            className="text-gray-600 hover:text-gray-800 text-xl"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold text-gray-800">📝 Your Journal</h1>
        </div>
        <Button onClick={() => setCurrentScreen('crisis-journal')}>
          + New Entry
        </Button>
      </div>

      <input
        type="text"
        placeholder="Search journal..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-2 p-2 border rounded text-gray-700"
      />
      <p className="text-sm text-gray-500 mb-6">
        Tip: Try <code>emotion:happy</code> or <code>emotion:😊</code>
      </p>
      
<EmotionHeatmap journalEntries={journalEntries} />
      <ReflectionPrompts journalEntries={journalEntries} />
      
      {filteredEntries.length === 0 ? (
        <p className="text-gray-600 italic text-center">
         Your mind is quiet today. That's okay too.
        </p>
      ) : (
        Object.entries(groupedEntries).map(([date, entries]) => (
          <div key={date} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{date}</h2>
            <div className="space-y-4">
              {entries.map((entry, i) => (
                <Card key={i}>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {entry.emotion && (
                    <p className="text-sm text-rose-400 mb-2 italic">
                      Emotion: {entry.emotion}
                    </p>
                  )}
                  {editingIndex === entry.originalIndex ? (
                    <>
                      <div className="space-y-2">
                        <TextArea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={4}
                        />
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-700">Emotion:</label>
                          <select
                            value={editEmotion}
                            onChange={(e) => setEditEmotion(e.target.value)}
                            className="border rounded px-2 py-1 text-sm"
                          >
                            <option value="">None</option>
                            <option value="😊">😊 Happy</option>
                            <option value="😔">😔 Sad</option>
                            <option value="😡">😡 Angry</option>
                            <option value="😨">😨 Anxious</option>
                            <option value="😌">😌 Relieved</option>
                            <option value="😐">😐 Neutral</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button onClick={saveEdit}>Save</Button>
                        <Button variant="text" onClick={cancelEdit}>Cancel</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-800 whitespace-pre-wrap">{entry.content}</p>
                      <div className="flex justify-end gap-4 mt-2 text-sm text-gray-500">
                        <button onClick={() => handleEdit(entry.originalIndex, entry.content, entry.emotion || '')}>✏️ Edit</button>
                        <button onClick={() => deleteJournalEntry(entry.originalIndex)}>🗑️ Delete</button>
                      </div>
                    </>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewJournal;
