// Updated parser.ts - Handle markdown instead of LaTeX
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

export interface Question {
  number: number;
  topic: string;
  misconceptionTarget: string;
  content: string;
  visualDescription: string;
  teacherNotes: string;
  rawMarkdown: string;
}

export interface ParsedResponse {
  topics: Topic[];
  questions: Question[];
  markdownContent: string;
  rawResponse: string;
  timestamp: string;
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
    const name = extractContent(block, "n") || "";
    const misconceptionsSection = extractContent(block, "misconceptions") || "";
    const misconceptions = parseMisconceptions(misconceptionsSection);

    return {
      name,
      misconceptions,
    };
  });
}

/**
 * Parse individual questions from markdown content
 */
function parseQuestionsFromMarkdown(markdownContent: string): Question[] {
  const questions: Question[] = [];
  
  // Split by question headers (## Question [Number])
  const questionSections = markdownContent.split(/(?=## Question \d+)/);
  
  questionSections.forEach((section, index) => {
    if (!section.trim()) return;
    
    // Extract question number
    const numberMatch = section.match(/## Question (\d+)/);
    const questionNumber = numberMatch ? parseInt(numberMatch[1]) : index + 1;
    
    // Extract topic
    const topicMatch = section.match(/\*\*Topic:\*\*\s*(.+)/);
    const topic = topicMatch ? topicMatch[1].trim() : "";
    
    // Extract misconception target
    const misconceptionMatch = section.match(/\*\*Misconception Target:\*\*\s*(.+)/);
    const misconceptionTarget = misconceptionMatch ? misconceptionMatch[1].trim() : "";
    
    // Extract question content
    const questionMatch = section.match(/### Question:\s*([\s\S]*?)(?=### Visual Description:|### Teacher Notes:|$)/);
    const content = questionMatch ? questionMatch[1].trim() : "";
    
    // Extract visual description
    const visualMatch = section.match(/### Visual Description:\s*([\s\S]*?)(?=### Teacher Notes:|$)/);
    const visualDescription = visualMatch ? visualMatch[1].trim() : "";
    
    // Extract teacher notes
    const notesMatch = section.match(/### Teacher Notes:\s*([\s\S]*?)(?=---|$)/);
    const teacherNotes = notesMatch ? notesMatch[1].trim() : "";
    
    if (content) {
      questions.push({
        number: questionNumber,
        topic,
        misconceptionTarget,
        content,
        visualDescription,
        teacherNotes,
        rawMarkdown: section.trim()
      });
    }
  });
  
  return questions;
}

/**
 * Save response to timestamped file for debugging
 */
function saveDebugFile(response: string, timestamp: string): void {
  try {
    // Create a blob with the response content
    const blob = new Blob([response], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `math_questions_${timestamp}.txt`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to save debug file:', error);
  }
}

/**
 * Parse the full response from AI
 */
export function parseAIResponse(response: string, saveDebug: boolean = true): ParsedResponse {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  // Save debug file if requested
  if (saveDebug) {
    saveDebugFile(response, timestamp);
  }
  
  // Extract the main sections
  const topicsSection = extractContent(response, "topics") || "";
  const markdownSection = extractContent(response, "markdown") || "";

  // Parse each section
  const topics = parseTopics(topicsSection);
  const questions = parseQuestionsFromMarkdown(markdownSection);

  return {
    topics,
    questions,
    markdownContent: markdownSection,
    rawResponse: response,
    timestamp
  };
}