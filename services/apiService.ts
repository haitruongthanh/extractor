
import type { ExtractedData } from '../types';

// The URL of the Python backend server.
const API_URL = 'http://127.0.0.1:8000';

export const uploadAndExtract = async (file: File): Promise<ExtractedData> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_URL}/extract`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Server responded with status: ${response.status}`);
    }

    const data: ExtractedData = await response.json();
    return data;

  } catch (error) {
    console.error("Error communicating with backend:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to extract data. Backend error: ${error.message}`);
    }
    throw new Error("An unknown network error occurred.");
  }
};
