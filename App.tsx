
import React, { useState, useCallback } from 'react';
import type { ExtractedData } from './types';
import { uploadAndExtract } from './services/apiService';
import { useExcelExport } from './hooks/useExcelExport';
import ResultsTable from './components/ResultsTable';
import Loader from './components/Loader';
import { InitialState } from './components/InitialState';
import { Icon } from './components/Icons';

type AppState = 'initial' | 'loading' | 'results' | 'error';

export default function App() {
  const [appState, setAppState] = useState<AppState>('initial');
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { exportToExcel } = useExcelExport(extractedData?.assets || [], extractedData?.customerName || 'data');
  const isLoading = appState === 'loading';

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file) return;

    setAppState('loading');
    setError(null);
    setExtractedData(null);

    try {
      const data = await uploadAndExtract(file);
      if (!data.assets || data.assets.length === 0) {
        setError(`No assets were found in the document for "${data.customerName}". The document might be in an unsupported format or contain no asset data.`);
        setAppState('error');
        return;
      }
      setExtractedData(data);
      setAppState('results');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      setAppState('error');
    }
  }, []);

  const handleReset = () => {
    setAppState('initial');
    setExtractedData(null);
    setError(null);
  };

  const renderContent = () => {
    switch (appState) {
      case 'loading':
        return <Loader />;
      case 'results':
        return (
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
            <div className="text-center">
                 <h2 className="text-3xl font-bold text-white">Extraction Complete</h2>
                 <p className="text-white/80 mt-1">Found {extractedData?.assets?.length || 0} assets for <span className="font-semibold">{extractedData?.customerName}</span></p>
            </div>
            {extractedData && <ResultsTable assets={extractedData.assets} />}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
              <button onClick={exportToExcel} className="flex items-center justify-center gap-3 w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <Icon icon="excel" className="h-6 w-6"/>
                Download Excel
              </button>
              <button onClick={handleReset} className="flex items-center justify-center gap-3 w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out backdrop-blur-sm border border-white/20">
                <Icon icon="reset" className="h-6 w-6"/>
                Process Another
              </button>
            </div>
          </div>
        );
      case 'error':
        return (
            <div className="text-center bg-red-500/20 border border-red-500 text-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-2">Extraction Failed</h2>
                <p className="text-red-200 mb-4">{error}</p>
                <button onClick={handleReset} className="flex items-center justify-center gap-3 mx-auto bg-white/10 hover:bg-white/20 font-semibold py-2 px-5 rounded-lg shadow-md transition-all duration-300 ease-in-out backdrop-blur-sm border border-white/20">
                     <Icon icon="reset" className="h-5 w-5"/>
                    Try Again
                </button>
            </div>
        );
      case 'initial':
      default:
        return <InitialState onFileSelect={handleFileSelect} isLoading={isLoading} />;
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full transition-all duration-500">
        {renderContent()}
      </div>
    </main>
  );
}