import React from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

interface MathRendererProps {
  latex: string;
  display?: "inline" | "block";
  className?: string;
}

export function MathRenderer({
  latex,
  display = "block",
  className = "",
}: MathRendererProps) {
  // Function to clean up full LaTeX documents for rendering with KaTeX
  const cleanLatexForKatex = (latexCode: string): string => {
    // Remove document class, packages, and document environment
    let cleaned = latexCode
      .replace(/\\documentclass(\{.*?\}|\[.*?\]\{.*?\})/g, "")
      .replace(/\\usepackage(\{.*?\}|\[.*?\]\{.*?\})/g, "")
      .replace(/\\begin\{document\}.*?\\end\{document\}/gs, (match) => {
        // Extract content inside document environment
        const content = match
          .replace(/\\begin\{document\}/g, "")
          .replace(/\\end\{document\}/g, "");
        return content;
      })
      .replace(/\\pagestyle\{.*?\}/g, "")
      .replace(/\\geometry\{.*?\}/g, "");

    // Replace tikzpicture environments with placeholders
    cleaned = cleaned.replace(
      /\\begin\{tikzpicture\}.*?\\end\{tikzpicture\}/gs,
      "[TikZ Diagram]"
    );

    // Handle other LaTeX commands that KaTeX doesn't support
    cleaned = cleaned
      .replace(/\\noindent/g, "")
      .replace(/\\textbf\{(.*?)\}/g, "\\textbf{$1}")
      .replace(/\\textit\{(.*?)\}/g, "\\textit{$1}");

    return cleaned;
  };

  // Process the LaTeX by line so we can render each part appropriately
  const renderLatexContent = () => {
    // If the latex is empty, return null
    if (!latex.trim()) return null;

    // Clean the LaTeX code
    const cleanedLatex = cleanLatexForKatex(latex);

    // Split by lines for better rendering
    const lines = cleanedLatex.split("\n").filter((line) => line.trim() !== "");

    return (
      <div className="math-content">
        {lines.map((line, index) => {
          // Skip empty lines
          if (!line.trim()) return null;

          try {
            // Check if the line is mostly a math formula
            const isMostlyMath =
              line.includes("$") ||
              line.includes("\\") ||
              line.includes("{") ||
              line.includes("}");

            if (isMostlyMath) {
              // Handle inline math within text
              if (line.includes("$") && !line.startsWith("$")) {
                // Replace inline math with placeholders
                const parts = [];
                let currentText = "";
                let inMath = false;
                let mathContent = "";

                for (let i = 0; i < line.length; i++) {
                  if (line[i] === "$") {
                    if (inMath) {
                      // End of math content
                      if (currentText) {
                        parts.push({ type: "text", content: currentText });
                        currentText = "";
                      }
                      parts.push({ type: "math", content: mathContent });
                      mathContent = "";
                      inMath = false;
                    } else {
                      // Start of math content
                      if (currentText) {
                        parts.push({ type: "text", content: currentText });
                        currentText = "";
                      }
                      inMath = true;
                    }
                  } else if (inMath) {
                    mathContent += line[i];
                  } else {
                    currentText += line[i];
                  }
                }

                if (currentText) {
                  parts.push({ type: "text", content: currentText });
                }

                return (
                  <div key={index} className="mixed-math-line">
                    {parts.map((part, partIndex) => {
                      if (part.type === "text") {
                        return <span key={partIndex}>{part.content}</span>;
                      } else {
                        return (
                          <InlineMath key={partIndex} math={part.content} />
                        );
                      }
                    })}
                  </div>
                );
              }

              // Try to render as BlockMath
              return (
                <div key={index} className="block-math-line">
                  <BlockMath math={line} />
                </div>
              );
            } else {
              // Render as plain text
              return (
                <div key={index} className="text-line">
                  {line}
                </div>
              );
            }
          } catch (error) {
            console.error("Error rendering LaTeX line:", error, line);
            return (
              <div
                key={index}
                className="p-1 text-red-500 bg-red-50 rounded text-sm"
              >
                {line}
              </div>
            );
          }
        })}
      </div>
    );
  };

  // If it's a short piece of LaTeX, try to render directly with KaTeX
  if (latex.length < 100 && !latex.includes("\\begin{document}")) {
    try {
      return (
        <div className={className}>
          {display === "inline" ? (
            <InlineMath math={latex} />
          ) : (
            <BlockMath math={latex} />
          )}
        </div>
      );
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
      return (
        <div className="p-2 text-red-500 bg-red-50 rounded border border-red-200">
          Error rendering LaTeX: {latex}
        </div>
      );
    }
  }

  // For longer, more complex LaTeX documents
  return (
    <div className={`${className} latex-document`}>{renderLatexContent()}</div>
  );
}
