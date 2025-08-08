import React, { useRef } from 'react';
import { Icon } from './Icons';

interface InitialStateProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export const InitialState: React.FC<InitialStateProps> = ({ onFileSelect, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
     // Reset the input value to allow uploading the same file again
    if(event.target) {
        event.target.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
        CIC Report Extractor
      </h1>
      <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
        Automatically extract collateral asset data from Vietnamese CIC credit reports. Upload a PDF file to begin.
      </p>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="application/pdf"
        disabled={isLoading}
      />

      <button
        onClick={handleButtonClick}
        disabled={isLoading}
        className="flex items-center justify-center gap-3 w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 backdrop-blur-sm border border-white/20"
      >
        <Icon icon="upload" className="h-6 w-6" />
        Upload PDF
      </button>
    </div>
  );
};