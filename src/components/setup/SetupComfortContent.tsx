import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import TextArea from '../ui/TextArea';

const SetupComfortContent: React.FC = () => {
  const { crisisPlanData, updateCrisisPlanData, setCurrentScreen } = useAppContext();

  const [link, setLink] = useState(crisisPlanData.comfortContent?.link || '');
  const [files, setFiles] = useState(crisisPlanData.comfortContent?.files || []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const filePreviews = selectedFiles.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setFiles(prev => [...prev, ...filePreviews]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCrisisPlanData('comfortContent', { link, files });
    setCurrentScreen('setup-complete');
  };

  const handleRemove = (name: string) => {
    setFiles(prev => prev.filter(file => file.name !== name));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Soothing Content
      </h1>

      <Card>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">🎶 Add Content That Brings You Calm</h2>

        <form onSubmit={handleSubmit}>
          <TextArea
            label="Add a YouTube or Spotify link"
            hint="Paste a link to your favorite music, video, or playlist"
            id="comfort-content"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
          />

          <div className="mt-4">
            <label className="text-sm text-gray-700 font-medium">Upload Images, Audio, or Videos</label>
            <input
              type="file"
              accept="image/*,audio/*,video/*"
              multiple
              onChange={handleFileUpload}
              className="block mt-2"
            />
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium text-gray-700">Preview:</p>
              {files.map(file => (
                <div key={file.name} className="border rounded p-2">
                  {file.type.startsWith('image') && (
                    <img src={file.url} alt={file.name} className="h-32 rounded" />
                  )}
                  {file.type.startsWith('audio') && (
                    <audio controls src={file.url} className="w-full" />
                  )}
                  {file.type.startsWith('video') && (
                    <video controls src={file.url} className="w-full max-h-48" />
                  )}
                  <div className="text-xs text-gray-500 mt-1 flex justify-between items-center">
                    {file.name}
                    <button
                      type="button"
                      className="text-red-500 ml-4"
                      onClick={() => handleRemove(file.name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <Button
              type="button"
              variant="text"
              onClick={() => setCurrentScreen('setup-compassion')}
            >
              Back
            </Button>
            <Button type="submit">
              Complete
            </Button>
          </div>
        </form>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Step 5 of 5</p>
      </div>
    </div>
  );
};

export default SetupComfortContent;
