import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ 
  label, 
  hint, 
  id, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="w-full mb-4">
      <label 
        htmlFor={id} 
        className="block text-gray-700 text-sm font-medium mb-1"
      >
        {label}
      </label>
      <textarea
        id={id}
        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-colors ${className}`}
        rows={4}
        {...props}
      />
      {hint && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
    </div>
  );
};

export default TextArea;