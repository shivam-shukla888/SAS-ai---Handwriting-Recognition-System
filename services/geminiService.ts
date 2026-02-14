
import { GoogleGenAI, Type } from "@google/genai";
import { RecognitionResult } from "../types";

const recognitionCache = new Map<string, RecognitionResult>();
const MAX_CACHE_SIZE = 50;

/**
 * Tracks the last time a 429 was received globally to help components
 * adjust their UI state proactively.
 */
export let lastQuotaErrorTime = 0;

export class QuotaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuotaError";
  }
}

async function withRetry<T>(
  fn: (attempt: number) => Promise<T>, 
  maxRetries = 5, 
  initialDelay = 3000
): Promise<T> {
  let lastError: any;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn(i);
    } catch (error: any) {
      lastError = error;
      const errorStr = String(error?.message || "").toLowerCase();
      
      // Broad detection for rate limiting / quota issues
      const isQuotaError = 
        errorStr.includes('429') || 
        errorStr.includes('quota') || 
        errorStr.includes('rate limit') ||
        errorStr.includes('too many requests') ||
        error?.status === 429;
      
      if (isQuotaError) {
        lastQuotaErrorTime = Date.now();
        if (i < maxRetries) {
          // Increase delay significantly for 429s as they usually last ~60s
          const baseDelay = initialDelay * Math.pow(2, i);
          const jitter = Math.random() * 2000;
          const delay = baseDelay + jitter;
          
          console.warn(`[Gemini Service] Rate limit hit. Attempt ${i + 1}/${maxRetries}. Waiting ${Math.round(delay/1000)}s...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      throw error;
    }
  }
  throw lastError;
}

export const recognizeHandwriting = async (base64Image: string): Promise<RecognitionResult> => {
  // 1. Check Cache first to save tokens/requests
  if (recognitionCache.has(base64Image)) {
    console.log("[Gemini Service] Cache Hit");
    return recognitionCache.get(base64Image)!;
  }

  const data = base64Image.split(',')[1];
  
  const result = await withRetry(async (attempt) => {
    // Correctly initialize with process.env.API_KEY directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Switch to lite model on repeated failures as it often has higher quotas
    const modelName = attempt > 2 ? 'gemini-flash-lite-latest' : 'gemini-3-flash-preview';
    
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/png', data: data } },
          { text: "OCR Handwriting Analysis. Detect text and language. Return JSON ONLY: {text: string, confidence: float, language: string, probabilities: Array<{label: string, value: float}>}" },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            language: { type: Type.STRING },
            probabilities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.NUMBER }
                },
                required: ["label", "value"]
              }
            }
          },
          required: ["text", "confidence", "language", "probabilities"]
        }
      }
    });

    if (!response.text) throw new Error("Empty response from AI");
    return JSON.parse(response.text.trim()) as RecognitionResult;
  });

  // Update Cache
  if (recognitionCache.size >= MAX_CACHE_SIZE) {
    const firstKey = recognitionCache.keys().next().value;
    if (firstKey) recognitionCache.delete(firstKey);
  }
  recognitionCache.set(base64Image, result);
  
  return result;
};
