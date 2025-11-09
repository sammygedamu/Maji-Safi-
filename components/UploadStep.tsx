
import React, { useState, useCallback } from 'react';

interface UploadStepProps {
  onContentUploaded: (content: string) => void;
}

const UploadStep: React.FC<UploadStepProps> = ({ onContentUploaded }) => {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setWordCount(newText.trim().split(/\s+/).filter(Boolean).length);
    setFileName('Pasted Text');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Please upload files smaller than 10MB.");
        return;
      }
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileContent = event.target?.result as string;
          setText(fileContent);
          setFileName(file.name);
          setWordCount(fileContent.trim().split(/\s+/).filter(Boolean).length);
        };
        reader.readAsText(file);
      } else {
        alert("For now, we only support .txt files and pasted text. Support for .docx and .pdf is coming soon!");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) {
          // You can't directly set the value of a file input, so we simulate the change event
          const mockEvent = { target: { files: e.dataTransfer.files } } as unknown as React.ChangeEvent<HTMLInputElement>;
          handleFileChange(mockEvent);
      }
  };


  const handleSubmit = () => {
    if (text.trim()) {
      onContentUploaded(text);
    } else {
      alert('Please add some content first.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-2">Upload Your Content</h2>
      <p className="text-lg text-gray-600 mb-8">
        Get started by pasting your text, or uploading a .txt file.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <label
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          htmlFor="file-upload"
          className="relative block w-full h-64 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#2A8FBD] transition-colors"
        >
          <div className="flex flex-col justify-center items-center h-full">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="mt-2 block text-sm font-semibold text-[#2A8FBD]">
              Upload a file <span className="text-gray-600">or drag and drop</span>
            </span>
            <p className="text-xs text-gray-500">.txt up to 10MB</p>
          </div>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".txt" />
        </label>
        
        <div className="my-4 text-center text-gray-500">OR</div>

        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Paste your text content here..."
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8FBD] focus:border-[#2A8FBD] transition"
        />
        
        {fileName && (
          <div className="mt-4 text-left p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-semibold text-gray-800">File: {fileName}</p>
            <p className="text-sm text-gray-600">Word Count: {wordCount}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="mt-6 w-full bg-[#2A8FBD] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
        >
          Next: Choose Template
        </button>
      </div>
    </div>
  );
};

export default UploadStep;
