import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  // Safety check for process.env in browser environments
  if (typeof process === 'undefined' || !process.env) {
    console.warn("Environment variables not available");
    return null;
  }
  
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Generates a concise project description based on the raw prompt used in the coding tool.
 */
export const generateDescriptionFromPrompt = async (promptText: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert technical writer. 
      Analyze the following "Vibe Coding" prompt which was used to generate a web application.
      
      PROMPT:
      ${promptText}
      
      TASK:
      Write a short, professional, and catchy description (max 2 sentences) of what this application does based on the prompt. 
      Focus on the functionality and tech stack if mentioned. Do not mention "the user asked for".`,
    });

    return response.text || "";
  } catch (error) {
    console.error("Error generating description:", error);
    return "";
  }
};

/**
 * Analyzes the prompt to suggest tags.
 */
export const generateTagsFromPrompt = async (promptText: string): Promise<string[]> => {
    const ai = getAiClient();
    if (!ai) return [];
  
    try {
      // Asking for JSON output for tags
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Extract up to 4 technical keywords or category tags from this prompt. Return JSON only.`,
        config: {
            responseMimeType: "application/json",
        }
      });
      
      const jsonStr = response.text?.trim();
      if (!jsonStr) return ["VibeCoding"];

      // Initial clean parse attempt
      try {
          const parsed = JSON.parse(jsonStr);
          if (Array.isArray(parsed)) return parsed;
          if (parsed.tags && Array.isArray(parsed.tags)) return parsed.tags;
          return Object.values(parsed).flat() as string[];
      } catch (e) {
          return ["VibeCoding", "React"];
      }

    } catch (error) {
      console.error("Error generating tags:", error);
      return ["VibeCoding"];
    }
  };