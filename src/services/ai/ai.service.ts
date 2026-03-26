/* eslint-disable @typescript-eslint/no-explicit-any */

import { AISuggestedJob } from "@/types/ai.interface";

export interface AIJobResponse {
  success: boolean;
  message?: string;
  data?: any;           // or better: AISuggestedJob[] 
}

// Recommended: Make it more specific
export interface AIJobSuggestionResponse {
  success: boolean;
  message?: string;
  data: AISuggestedJob[];     // Use your actual type here
}

export const getAIJobSuggestion = async (
  query: string
): Promise<AIJobSuggestionResponse> => {
  try {
    const response = await fetch("/api/v1/ai/job-suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      // Add credentials or auth token if needed
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;        // ← Must return the data
  } catch (error) {
    console.error("AI Job Suggestion Error:", error);
    
    // Always return a consistent shape even on error
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to get AI suggestions",
      data: [],
    };
  }
};