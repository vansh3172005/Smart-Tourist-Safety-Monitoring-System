/* eslint-disable @typescript-eslint/no-explicit-any */
// AIService.ts
// Using OpenRouter API

// Load OpenRouter API key from .env
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error("⚠️ OpenRouter API key is missing. Add it to your .env file.");
}

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export interface ItineraryFormData {
  nationality: string;
  visitDuration: string;
  accommodationAddress: string;
  interests?: string;
}

export class AIService {
  /**
   * Retry wrapper with exponential backoff + jitter
   */
  private static async retryGenerate(
    prompt: string,
    retries = 5,
    baseDelayMs = 2000 // start with 2s
  ): Promise<string> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Smart Tourist Safety System'
          },
          body: JSON.stringify({
            model: "anthropic/claude-3-haiku:beta",
            messages: [
              {
                role: "user",
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content || "No response generated";
      } catch (error: any) {
        const isRateLimit = error.message.includes('429') || error.message.includes('rate limit');

        if (isRateLimit && attempt < retries) {
          // Exponential backoff with jitter
          const backoff = baseDelayMs * Math.pow(2, attempt - 1);
          const jitter = Math.floor(Math.random() * 1000); // up to +1s
          const waitTime = backoff + jitter;

          console.warn(
            `⚠️ Rate limit hit (attempt ${attempt}). Retrying in ${(waitTime / 1000).toFixed(
              1
            )}s...`
          );

          await new Promise((res) => setTimeout(res, waitTime));
        } else {
          throw error;
        }
      }
    }
    throw new Error("Failed to generate content after multiple retries due to rate limit.");
  }

  /**
   * Generate a safe, day-wise tourist itinerary
   */
  static async generateItinerary(formData: ItineraryFormData): Promise<string> {
    try {
      const prompt = `
      You are a smart tourist assistant. Create a safe, enjoyable travel itinerary.
      Details:
      - Tourist nationality: ${formData.nationality}
      - Duration: ${formData.visitDuration}
      - Stay location: ${formData.accommodationAddress}
      - Interests: ${formData.interests || "sightseeing, culture, food, adventure"}

      Rules:
      - Prioritize safety, accessibility, and popular tourist spots.
      - Suggest places with cultural and eco-friendly value.
      - Add travel tips and emergency safety notes.
      - Return in a clear day-wise bullet point format.
      `;

      return await this.retryGenerate(prompt);
    } catch (error) {
      console.error("AI itinerary generation failed:", error);
      return "⚠️ Could not generate itinerary. Please try again later.";
    }
  }
}
