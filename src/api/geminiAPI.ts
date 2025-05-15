// geminiAPI.ts
interface GeminiOptions {
  model?: string;
  temperature?: number;
  topK?: number;
  topP?: number;
  maxOutputTokens?: number;
  responseMimeType?: string;
}

interface GeminiRequestBody {
  contents: {
    role: string;
    parts: {
      text: string;
    }[];
  }[];
  generationConfig: {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
    responseMimeType: string;
  };
}

// Define response type - this can be expanded based on the actual API response structure
interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: {
        text?: string;
      }[];
    };
  }[];
  [key: string]: any; // Allow for other fields in the response
}

export class GeminiAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/";
  }

  async generateContent(
    input: string,
    options: GeminiOptions = {}
  ): Promise<GeminiResponse> {
    const defaultOptions: GeminiOptions = {
      model: "gemini-2.0-flash",
      temperature: 0,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const settings = { ...defaultOptions, ...options };

    const url = `${this.baseUrl}${settings.model}:generateContent?key=${this.apiKey}`;

    const requestBody: GeminiRequestBody = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: input,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: settings.temperature!,
        topK: settings.topK!,
        topP: settings.topP!,
        maxOutputTokens: settings.maxOutputTokens!,
        responseMimeType: settings.responseMimeType!,
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API Error: ${response.status} - ${JSON.stringify(errorData)}`
        );
      }

      return (await response.json()) as GeminiResponse;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}
