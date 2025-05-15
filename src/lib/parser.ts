// src/lib/parser.ts
import { TikzExamples } from "./tikz";

export interface Misconception {
  title: string;
  description: string;
  example?: string;
  remediation?: string;
}

export interface Topic {
  name: string;
  misconceptions: Misconception[];
}

export interface Solution {
  content: string;
  explanation: string;
}

export interface Question {
  topic: string;
  content: string;
  solution: Solution;
}

export interface ParsedResponse {
  topics: Topic[];
  questions: Question[];
  rawResponse: string;
}

/**
 * Extract content between XML-like tags
 */
function extractContent(text: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, "s");
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

/**
 * Extract all occurrences of content between XML-like tags
 */
function extractAllContent(text: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, "gs");
  const matches = [...text.matchAll(regex)];
  return matches.map((match) => match[1].trim());
}

/**
 * Parse misconceptions from a topic section
 */
function parseMisconceptions(topicContent: string): Misconception[] {
  const misconceptionBlocks = extractAllContent(topicContent, "misconception");

  return misconceptionBlocks.map((block) => {
    const title = extractContent(block, "title") || "";
    const description = extractContent(block, "description") || "";
    const example = extractContent(block, "example") || undefined;
    const remediation = extractContent(block, "remediation") || undefined;

    return {
      title,
      description,
      example,
      remediation,
    };
  });
}

/**
 * Parse topics and their misconceptions
 */
function parseTopics(topicsSection: string): Topic[] {
  const topicBlocks = extractAllContent(topicsSection, "topic");

  return topicBlocks.map((block) => {
    const name = extractContent(block, "name") || "";
    const misconceptionsSection = extractContent(block, "misconceptions") || "";
    const misconceptions = parseMisconceptions(misconceptionsSection);

    return {
      name,
      misconceptions,
    };
  });
}

/**
 * Extract LaTeX code from markdown code blocks
 */
function extractLatexFromMarkdown(text: string): string | null {
  const regex = /```latex\s*([\s\S]*?)\s*```/;
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

/**
 * Parse questions and their solutions
 */
function parseQuestions(questionsSection: string): Question[] {
  const questionBlocks = extractAllContent(questionsSection, "question");

  return questionBlocks.map((block) => {
    const topic = extractContent(block, "topic") || "";
    const contentSection = extractContent(block, "content") || "";
    const solutionSection = extractContent(block, "solution") || "";
    const explanation = extractContent(block, "explanation") || "";

    // Extract the LaTeX code from the markdown blocks
    const content = extractLatexFromMarkdown(contentSection) || contentSection;
    const solutionContent =
      extractLatexFromMarkdown(solutionSection) || solutionSection;

    return {
      topic,
      content,
      solution: {
        content: solutionContent,
        explanation,
      },
    };
  });
}

/**
 * Parse the full response from Gemini
 */
export function parseGeminiResponse(response: string): ParsedResponse {
  // Format the response to handle line breaks
  //   const formattedResponse = response.replace(/\\n(?= )/g, "\n");
  const formattedResponse = response;

  // Extract the main sections
  const topicsSection = extractContent(formattedResponse, "topics") || "";
  const questionsSection = extractContent(formattedResponse, "questions") || "";

  // Parse each section
  const topics = parseTopics(topicsSection);
  const questions = parseQuestions(questionsSection);

  return {
    topics,
    questions,
    rawResponse: formattedResponse,
  };
}

/**
 * Format the Gemini prompt with TikZ examples
 */
export function formatPrompt(basePrompt: string, prompt: string): string {
  // Replace the placeholder with actual TikZ examples
  const formattedPrompt = basePrompt.replace("{{TIKZ_EXAMPLES}}", TikzExamples);

  // Append the user's prompt
  return `${formattedPrompt}\n\nUser Request: ${prompt}`;
}
