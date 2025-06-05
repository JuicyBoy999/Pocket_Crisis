import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const CrisisContent: React.FC = () => {
  const { crisisPlanData, setCurrentScreen } = useAppContext();
  const content = crisisPlanData.comfortContent;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Soothing Content
      </h1>

      <Card>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          🎧 Here's your calming content
        </h2>

{!content?.link && (!content?.files || content.files.length === 0) ? (
  <p className="text-gray-500 text-sm italic mb-4">
    You haven’t added any comforting links, images, or media yet.
  </p>
) : (
  <>
    {content?.link && (
      <div className="mb-6">
        <p className="text-sm text-gray-700 mb-2">Your Link:</p>
        <a
          href={content.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all"
        >
          {content.link}
        </a>
      </div>
    )}

    {content?.files?.length > 0 && (
      <div className="space-y-4">
        <p className="text-sm text-gray-700 font-medium">Your Uploaded Media:</p>
        {content.files.map((file: any) => (
          <div key={file.name} className="border rounded p-2">
            {file.type.startsWith('image') && (
              <img src={file.url} alt={file.name} className="h-48 rounded object-contain" />
            )}
            {file.type.startsWith('audio') && (
              <audio controls src={file.url} className="w-full" />
            )}
            {file.type.startsWith('video') && (
              <video controls src={file.url} className="w-full max-h-64" />
            )}
            <p className="text-xs text-gray-500 mt-1">{file.name}</p>
          </div>
        ))}
      </div>
    )}
  </>
)}

      </Card>

      <div className="mt-6 flex justify-center gap-4 flex-wrap">

        <Button variant="text" onClick={() => setCurrentScreen('crisis-affirmations')}>
          Back
        </Button>
        <Button onClick={() => setCurrentScreen('crisis-final')}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CrisisContent;
