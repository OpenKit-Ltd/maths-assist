// Updated MathAssistantPage.tsx
import { useState } from "react";
import { GeminiAPI } from "../api/geminiAPI";
import { ChatInput } from "../components/ChatInput";
import { MarkdownQuestionRenderer } from "../components/MarkdownQuestionRenderer";
import { TopicsMisconceptionsTable } from "../components/TopicsMisconceptionsTable";
import { DebugInfo } from "../components/DebugInfo";
import { Button } from "../components/ui/button";
import SplitText from "../components/SplitText";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { parseAIResponse, ParsedResponse, Topic } from "../lib/parser";
import {
  GENERATE_QUESTIONS_PROMPT,
  EXAMPLE_PROMPTS,
} from "../lib/prompts";
import { MISCONCEPTIONS_LIST } from "../lib/misconceptions";
import {
  BookOpenIcon,
  SparklesIcon,
  BrainIcon,
  CalculatorIcon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
} from "lucide-react";

// Initialize the API client with the API key from environment variables
const gemini = new GeminiAPI(import.meta.env.VITE_GEMINI_API_KEY as string);

export function MathAssistantPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedResponse, setParsedResponse] = useState<ParsedResponse | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [includeContentStore, setIncludeContentStore] = useState<boolean>(false);
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const [showVisualDescriptions, setShowVisualDescriptions] = useState<boolean>(false);
  const [showTeacherNotes, setShowTeacherNotes] = useState<boolean>(true);

  // Convert topics to the format expected by TopicsMisconceptionsTable
  const formatTopicsForTable = (topics: Topic[]) => {
    const formattedTopics: Record<
      string,
      { level: "beginner" | "intermediate" | "advanced"; misconceptions: any[] }
    > = {};

    topics.forEach((topic) => {
      formattedTopics[topic.name] = {
        level: "intermediate", // Default level; adjust as needed
        misconceptions: topic.misconceptions.map((m, index) => ({
          id: `m-${index}`,
          description: m.title,
          example: m.example,
          remediation: m.remediation,
        })),
      };
    });

    return formattedTopics;
  };

  const handleSubmit = async (message: string) => {
    if (!message.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Format the prompt by conditionally including the Content Store misconceptions
      let formattedPrompt = GENERATE_QUESTIONS_PROMPT;
      
      if (includeContentStore) {
        formattedPrompt = formattedPrompt.replace(
          "{{MISCONCEPTION_STORE}}",
          `\n\nUse the following misconceptions database to inform your question generation:\n${MISCONCEPTIONS_LIST}`
        );
      } else {
        formattedPrompt = formattedPrompt.replace(
          "{{MISCONCEPTION_STORE}}",
          ""
        );
      }
      
      formattedPrompt += `\n\nTeacher Input: "${message}"`;

      // Call the Gemini API
      const result = await gemini.generateContent(formattedPrompt);

      // Extract the text from the response
      const generatedText =
        result.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated";

      // Parse the response and save debug file
      const parsed = parseAIResponse(generatedText, true);
      setParsedResponse(parsed);
      setActiveQuestion(0); // Reset to first question

      console.log("Parsed response:", parsed);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error: ${err.message}`);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const toggleMisconceptions = () => {
    setIncludeContentStore(!includeContentStore);
  };

  const downloadMarkdown = () => {
    if (!parsedResponse) return;
    
    const blob = new Blob([parsedResponse.markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `math_questions_${parsedResponse.timestamp}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getExampleIcons = () => {
    const icons = [
      <CalculatorIcon size={18} />,
      <BookOpenIcon size={18} />,
      <BrainIcon size={18} />,
      <SparklesIcon size={18} />,
      <CalculatorIcon size={18} />
    ];
    return icons;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {!parsedResponse ? (
        <div className="flex flex-col items-center">
          <div className="mb-12 text-center">
            <div className="flex flex-col items-center mb-2">
              <SplitText
                text="MathsAssist AI"
                className="text-4xl font-bold text-gray-800"
                delay={25}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,30px,0)",
                }}
                onLetterAnimationComplete={() =>
                  setTitleAnimationComplete(true)
                }
              />
            </div>

            <div className="h-12 flex items-center justify-center">
              {titleAnimationComplete && (
                <SplitText
                  text="Tell me what you've taught your class, and I'll generate targeted questions to reveal misconceptions!"
                  className="text-lg text-gray-600 max-w-xl mx-auto"
                  delay={15}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,20px,0)",
                  }}
                />
              )}
            </div>
          </div>

          <div className="w-full max-w-2xl">
            {!loading && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <ChatInput
                  onSend={handleSubmit}
                  value={inputValue}
                  onChange={setInputValue}
                  showMisconceptionsToggle={true}
                  includeMisconceptions={includeContentStore}
                  onMisconceptionsToggle={toggleMisconceptions}
                  className="mb-6"
                />

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Try one of these examples:
                  </p>
                  <div className="flex flex-col gap-2">
                    {EXAMPLE_PROMPTS.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleExampleClick(prompt)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors text-left"
                      >
                        <span className="shrink-0">{getExampleIcons()[index]}</span>
                        <span>{prompt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="text-center p-6 bg-white rounded-lg border shadow-sm">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">
                    Analyzing your topic and generating targeted questions...
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    This will create 5 questions designed to reveal misconceptions
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200">
                {error}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={() => setParsedResponse(null)}
            >
              ← Generate New Questions
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={downloadMarkdown}
              className="flex items-center gap-2"
            >
              <DownloadIcon className="w-4 h-4" />
              Download Markdown
            </Button>
          </div>

          {/* Tabs for Questions and Misconceptions */}
          <Tabs defaultValue="questions" className="mb-6">
            <TabsList className="w-full border-b p-0 mb-2">
              <TabsTrigger value="questions" className="flex-1 rounded-t-lg">
                Questions ({parsedResponse.questions.length})
              </TabsTrigger>
              <TabsTrigger
                value="misconceptions"
                className="flex-1 rounded-t-lg"
              >
                Misconceptions ({parsedResponse.topics.length} topics)
              </TabsTrigger>
              <TabsTrigger value="debug" className="flex-1 rounded-t-lg">
                Debug
              </TabsTrigger>
            </TabsList>

            <TabsContent value="questions" className="mt-4">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                {/* Question Navigation */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={activeQuestion === 0}
                      onClick={() =>
                        setActiveQuestion((q) => Math.max(0, q - 1))
                      }
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={
                        activeQuestion === parsedResponse.questions.length - 1
                      }
                      onClick={() =>
                        setActiveQuestion((q) =>
                          Math.min(parsedResponse.questions.length - 1, q + 1)
                        )
                      }
                    >
                      Next
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* View toggles */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant={showVisualDescriptions ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowVisualDescriptions(!showVisualDescriptions)}
                        className="flex items-center gap-1"
                      >
                        {showVisualDescriptions ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
                        Visuals
                      </Button>
                      
                      <Button
                        variant={showTeacherNotes ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowTeacherNotes(!showTeacherNotes)}
                        className="flex items-center gap-1"
                      >
                        {showTeacherNotes ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
                        Notes
                      </Button>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      Question {activeQuestion + 1} of {parsedResponse.questions.length}
                    </div>
                  </div>
                </div>

                {/* Question Content */}
                {parsedResponse.questions[activeQuestion] && (
                  <MarkdownQuestionRenderer
                    question={parsedResponse.questions[activeQuestion]}
                    showVisualDescription={showVisualDescriptions}
                    showTeacherNotes={showTeacherNotes}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="misconceptions" className="mt-4">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Identified Misconceptions
                </h2>
                <p className="text-gray-600 mb-6">
                  These are the common misconceptions that the generated questions are designed to reveal:
                </p>
                <TopicsMisconceptionsTable
                  topics={formatTopicsForTable(parsedResponse.topics)}
                />
              </div>
            </TabsContent>

            <TabsContent value="debug" className="mt-4">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <DebugInfo parsedResponse={parsedResponse} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}