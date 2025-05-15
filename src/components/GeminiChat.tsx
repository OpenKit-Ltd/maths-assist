// GeminiChat.tsx
import React, { useState, FormEvent, ChangeEvent } from "react";
import { GeminiAPI } from "../api/geminiAPI";

// Initialize the API client - using type assertion for environment variable
const gemini = new GeminiAPI(import.meta.env.VITE_GEMINI_API_KEY as string);

const GeminiChat: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");

    try {
      const result = await gemini.generateContent(input);
      // Extract the text from the response
      const generatedText =
        result.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated";
      setResponse(generatedText);
    } catch (err) {
      // Handle error with proper type checking
      if (err instanceof Error) {
        setError(`Error: ${err.message}`);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="gemini-chat">
      <h2>Gemini AI Chat</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Ask Gemini something..."
          rows={4}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Send"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {response && (
        <div className="response">
          <h3>Response:</h3>
          <div className="response-text">{response}</div>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;
