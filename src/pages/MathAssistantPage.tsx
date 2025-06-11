// src/pages/MathAssistantPage.tsx
import { useState, useRef, useEffect } from "react";
import { GeminiAPI } from "../api/geminiAPI";
import { ChatInput } from "../components/ChatInput";
import { LatexDocumentRenderer } from "../components/LatexDocumentRenderer";
import { TopicsMisconceptionsTable } from "../components/TopicsMisconceptionsTable";
import { Button } from "../components/ui/button";
import SplitText from "../components/SplitText";
import { renderQueue } from "../lib/renderQueue";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { parseGeminiResponse, ParsedResponse, Topic } from "../lib/parser";
import {
  GENERATE_QUESTIONS_PROMPT,
  CONTENT_STORE_MISCONCEPTIONS,
} from "../lib/prompts";
import { TikzExamples } from "@/lib/tikz";
import {
  BookOpenIcon,
  SparklesIcon,
  BrainIcon,
  CalculatorIcon,
  FileTextIcon,
  MonitorIcon,
} from "lucide-react";

// Initialize the API client with the API key from environment variables
const gemini = new GeminiAPI(import.meta.env.VITE_GEMINI_API_KEY as string);

// Define example prompts
const examplePrompts = [
  {
    id: 1,
    text: "My students are struggling with the Pythagorean theorem, especially with not knowing which side is the hypotenuse",
    icon: <CalculatorIcon size={18} />,
  },
  {
    id: 2,
    text: "I need questions about area and perimeter calculations for Year 7 students",
    icon: <BookOpenIcon size={18} />,
  },
  {
    id: 3,
    text: "Create fraction division examples with visual representations for KS3",
    icon: <BrainIcon size={18} />,
  },
  {
    id: 4,
    text: "Generate coordinate geometry questions that address common misconceptions",
    icon: <SparklesIcon size={18} />,
  },
];

interface CompileResponse {
  error?: string;
  details?: string;
}

type ViewMode = "pdf" | "interactive";

export function MathAssistantPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedResponse, setParsedResponse] = useState<ParsedResponse | null>(
    null
  );
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [includeContentStore, setIncludeContentStore] =
    useState<boolean>(false);
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  // Mode state
  const [viewMode, setViewMode] = useState<ViewMode>("interactive");

  // PDF-specific state
  const [showPdfViewer, setShowPdfViewer] = useState<boolean>(false);
  const [submittedPrompt, setSubmittedPrompt] = useState<string>("");
  const [questionsPdfUrl, setQuestionsPdfUrl] = useState<string | null>(null);
  const [solutionsPdfUrl, setSolutionsPdfUrl] = useState<string | null>(null);

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

  // Function to compile LaTeX to PDF
  const compileToPdf = async (latexCode: string): Promise<string> => {
    const response = await fetch("http://localhost:5000/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tikz_code: latexCode,
        format: "pdf", // Request PDF format
      }),
    });

    if (!response.ok) {
      const errorData: CompileResponse = await response.json();
      throw new Error(errorData.details || "Failed to compile LaTeX code");
    }

    // Get the PDF blob
    const pdfBlob: Blob = await response.blob();

    // Create a URL for the PDF blob
    const url: string = URL.createObjectURL(pdfBlob);
    return url;
  };

  // Helper function to format misconceptions for LaTeX
  const formatMisconductionsForLatex = (misconceptions: string): string => {
    if (!misconceptions?.trim())
      return "No specific misconceptions identified for this question.";

    // Convert bullet points to LaTeX itemize format
    const lines = misconceptions.split("\n").filter((line) => line.trim());
    const formattedLines = lines
      .map((line) => {
        // Remove existing bullet points and format for LaTeX
        const cleanLine = line.replace(/^[•\-\*]\s*/, "").trim();
        return cleanLine ? `\\item ${cleanLine}` : "";
      })
      .filter((line) => line);

    if (formattedLines.length === 0)
      return "No specific misconceptions identified for this question.";

    return `\\begin{itemize}
${formattedLines.join("\n")}
\\end{itemize}`;
  };

  // Function to queue all content for background loading (interactive mode)
  const queueContentForBackground = (parsedData: ParsedResponse) => {
    // Clear any existing queue
    renderQueue.clearQueue();

    // Queue all question and solution content
    parsedData.questions.forEach((question, index) => {
      if (question.content) {
        // First question gets the highest priority
        const priority = index === 0 ? 0 : index + 1;

        // Add question content to queue with priority based on index
        renderQueue.addToQueue({
          id: `question-${index}`,
          tikzCode: question.content,
          priority: priority,
        });
      }

      // Add solution content to queue with slightly lower priority
      if (question.solution && question.solution.content) {
        // First solution gets high priority but slightly lower than first question
        const priority =
          index === 0 ? 1 : index + parsedData.questions.length + 1;

        renderQueue.addToQueue({
          id: `solution-${index}`,
          tikzCode: question.solution.content,
          priority: priority,
        });
      }
    });
  };

  // Watch for new parsedResponse and start background loading (interactive mode)
  useEffect(() => {
    if (parsedResponse && viewMode === "interactive") {
      queueContentForBackground(parsedResponse);
    }
  }, [parsedResponse, viewMode]);

  const handleSubmit = async (message: string) => {
    if (!message.trim()) return;

    setLoading(true);
    setError(null);
    setSubmittedPrompt(message);
    setShowPdfViewer(false);

    try {
      // Format the prompt by injecting TikZ examples and conditionally the Content Store misconceptions.
      let formattedPrompt = GENERATE_QUESTIONS_PROMPT.replace(
        "{{TIKZ_EXAMPLES}}",
        TikzExamples
      );
      if (includeContentStore) {
        formattedPrompt = formattedPrompt.replace(
          "{{MISCONCEPTION_STORE}}",
          CONTENT_STORE_MISCONCEPTIONS
        );
      } else {
        formattedPrompt = formattedPrompt.replace(
          "{{MISCONCEPTION_STORE}}",
          ""
        );
      }
      formattedPrompt += `\n\nUser Request: ${message}`;

      // Call the Gemini API
      const result = await gemini.generateContent(formattedPrompt);

      // Extract the text from the response
      const generatedText =
        result.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated";

      // Parse the response
      const parsed = parseGeminiResponse(generatedText);
      setParsedResponse(parsed);
      setActiveQuestion(0); // Reset to first question

      if (parsed.questions.length === 0) {
        throw new Error("No questions were generated");
      }

      // If in PDF mode, generate PDFs
      if (viewMode === "pdf") {
        // Combine all questions into one LaTeX document
        const questionsLatex = `\\documentclass{article}
\\pagestyle{empty}
\\usepackage{geometry}
\\geometry{margin=1cm}
\\usepackage{tikz}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usetikzlibrary{quotes,angles,calc}

\\begin{document}

\\title{Question Worksheet}
\\maketitle

${parsed.questions
  .map(
    (q, index) => `
\\section*{Question ${index + 1}}
${q.content
  .replace(/\\documentclass.*?\\begin\{document\}/s, "")
  .replace(/\\end\{document\}/g, "")}

\\vspace{1cm}
`
  )
  .join("")}

\\end{document}`;

        // Combine all solutions into one LaTeX document
        const solutionsLatex = `\\documentclass{article}
\\pagestyle{empty}
\\usepackage{geometry}
\\geometry{margin=1cm}
\\usepackage{tikz}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usetikzlibrary{quotes,angles,calc}

\\begin{document}

\\title{Solution Worksheet}
\\maketitle

${parsed.questions
  .map(
    (q, index) => `
\\section*{Question ${index + 1} - Solution}
${q.solution.content
  .replace(/\\documentclass.*?\\begin\{document\}/s, "")
  .replace(/\\end\{document\}/g, "")}

\\subsection*{Common Misconceptions}
${formatMisconductionsForLatex(q.solution.misconceptions || "")}

\\vspace{1cm}
`
  )
  .join("")}

\\end{document}`;

        // Compile both documents to PDF
        const [questionsUrl, solutionsUrl] = await Promise.all([
          compileToPdf(questionsLatex),
          compileToPdf(solutionsLatex),
        ]);

        setQuestionsPdfUrl(questionsUrl);
        setSolutionsPdfUrl(solutionsUrl);
        setShowPdfViewer(true);
      }

      console.log("Generated content successfully");
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

  const handleBackToPrompt = () => {
    setShowPdfViewer(false);
    setParsedResponse(null);
    setSubmittedPrompt("");
    setQuestionsPdfUrl(null);
    setSolutionsPdfUrl(null);
    setError(null);
  };

  // Render based on mode and state
  const renderContent = () => {
    if (viewMode === "pdf" && showPdfViewer && parsedResponse) {
      return (
        <div>
          <Button
            variant="outline"
            className="mb-6"
            onClick={handleBackToPrompt}
          >
            ← Back to Prompt
          </Button>

          {/* Display the submitted prompt */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="font-medium text-gray-800 mb-2">Your Request:</h3>
            <p className="text-gray-600">{submittedPrompt}</p>
          </div>

          {/* PDF Viewer with Tabs */}
          <Tabs defaultValue="questions" className="mb-6">
            <TabsList className="w-full border-b p-0 mb-2">
              <TabsTrigger value="questions" className="flex-1 rounded-t-lg">
                Question Worksheet
              </TabsTrigger>
              <TabsTrigger value="solutions" className="flex-1 rounded-t-lg">
                Solution Worksheet
              </TabsTrigger>
            </TabsList>

            <TabsContent value="questions" className="mt-4">
              <div className="bg-white p-6 rounded-lg border shadow-sm min-h-[600px]">
                <h2 className="text-xl font-semibold mb-4">
                  Question Worksheet PDF
                </h2>
                {questionsPdfUrl ? (
                  <iframe
                    src={questionsPdfUrl}
                    className="w-full h-[600px] border rounded"
                    title="Question Worksheet PDF"
                  />
                ) : (
                  <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                    <div className="text-center">
                      <div className="text-gray-500 mb-2">
                        <svg
                          className="w-16 h-16 mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600">
                        Loading question worksheet...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="solutions" className="mt-4">
              <div className="bg-white p-6 rounded-lg border shadow-sm min-h-[600px]">
                <h2 className="text-xl font-semibold mb-4">
                  Solution Worksheet PDF
                </h2>
                {solutionsPdfUrl ? (
                  <iframe
                    src={solutionsPdfUrl}
                    className="w-full h-[600px] border rounded"
                    title="Solution Worksheet PDF"
                  />
                ) : (
                  <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                    <div className="text-center">
                      <div className="text-gray-500 mb-2">
                        <svg
                          className="w-16 h-16 mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600">
                        Loading solution worksheet...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      );
    }

    if (viewMode === "interactive" && parsedResponse) {
      return (
        <div>
          <Button
            variant="outline"
            className="mb-6"
            onClick={() => setParsedResponse(null)}
          >
            ← Back to Prompt
          </Button>

          {/* Tabs for Questions, Solutions, and Misconceptions */}
          <Tabs defaultValue="questions" className="mb-6">
            <TabsList className="w-full border-b p-0 mb-2">
              <TabsTrigger value="questions" className="flex-1 rounded-t-lg">
                Questions
              </TabsTrigger>
              <TabsTrigger value="solutions" className="flex-1 rounded-t-lg">
                Solutions
              </TabsTrigger>
              <TabsTrigger
                value="misconceptions"
                className="flex-1 rounded-t-lg"
              >
                Misconceptions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="questions" className="mt-4">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex justify-between items-center mb-4">
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
                  <div className="text-sm text-gray-500">
                    Question {activeQuestion + 1} of{" "}
                    {parsedResponse.questions.length}
                  </div>
                </div>

                <div className="prose max-w-none">
                  {parsedResponse.questions[activeQuestion]?.content && (
                    <LatexDocumentRenderer
                      latexCode={
                        parsedResponse.questions[activeQuestion].content
                      }
                      priority={activeQuestion === 0 ? 0 : activeQuestion}
                    />
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="solutions" className="mt-4">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex justify-between items-center mb-4">
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
                  <div className="text-sm text-gray-500">
                    Solution {activeQuestion + 1} of{" "}
                    {parsedResponse.questions.length}
                  </div>
                </div>

                <div className="prose max-w-none">
                  {parsedResponse.questions[activeQuestion]?.solution
                    .content && (
                    <LatexDocumentRenderer
                      latexCode={
                        parsedResponse.questions[activeQuestion].solution
                          .content
                      }
                      priority={
                        activeQuestion === 0
                          ? 1
                          : activeQuestion + parsedResponse.questions.length
                      }
                    />
                  )}

                  <div className="mt-6 p-4 bg-blue-50 rounded-md">
                    <h3 className="font-medium text-blue-800">Teacher Notes</h3>
                    <p className="text-blue-700 whitespace-pre-line">
                      {parsedResponse.questions[activeQuestion]?.solution
                        .explanation || ""}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="misconceptions" className="mt-4">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Common Misconceptions
                </h2>
                <TopicsMisconceptionsTable
                  topics={formatTopicsForTable(parsedResponse.topics)}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      );
    }

    // Default view - prompt input
    return (
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
              onLetterAnimationComplete={() => setTitleAnimationComplete(true)}
            />
          </div>

          {/* Only animate the subtitle after the title animation is complete */}
          <div className="h-12 flex items-center justify-center">
            {titleAnimationComplete && (
              <SplitText
                text={
                  viewMode === "pdf"
                    ? "Generate maths worksheets to help your students identify common misconceptions. Get started by typing a prompt below!"
                    : "Generate maths questions and identify common misconceptions for your classroom. Get started by typing a prompt below!"
                }
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
              {/* Mode Toggle */}
              <div className="flex justify-center mb-6">
                <div
                  className="inline-flex rounded-lg bg-gray-100 p-1"
                  role="group"
                >
                  <button
                    type="button"
                    onClick={() => setViewMode("interactive")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "interactive"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <MonitorIcon size={16} />
                    Interactive View
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("pdf")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "pdf"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <FileTextIcon size={16} />
                    PDF Worksheets
                  </button>
                </div>
              </div>

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
                  {examplePrompts.map((prompt) => (
                    <button
                      key={prompt.id}
                      onClick={() => handleExampleClick(prompt.text)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors text-left"
                    >
                      <span className="shrink-0">{prompt.icon}</span>
                      <span>{prompt.text}</span>
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
                  Generating mathematics resources...
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  This may take a minute as we create high-quality content
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
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {renderContent()}
    </div>
  );
}
