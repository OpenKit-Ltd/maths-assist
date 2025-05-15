import React, { useEffect, useState, useRef } from "react";
import { renderQueue, tikzCache } from "../lib/renderQueue";

interface LatexDocumentRendererProps {
  latexCode: string;
  className?: string;
  priority?: number;
}

export function LatexDocumentRenderer({
  latexCode,
  className = "",
  priority = 5, // Default middle priority
}: LatexDocumentRendererProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [taskId] = useState<string>(
    `latex-${Math.random().toString(36).substr(2, 9)}`
  );
  const mountedRef = useRef(true);

  // Force re-check for cached content on mount and when latexCode changes
  useEffect(() => {
    // Check on mount if the content is already cached
    const checkCache = () => {
      const cachedUrl = tikzCache.get(latexCode);
      if (cachedUrl && mountedRef.current) {
        setImageUrl(cachedUrl);
        setLoading(false);
        return true;
      }
      return false;
    };

    // Immediately check cache on mount/update
    const isInCache = checkCache();
    if (isInCache) return;

    // If not in cache, set up polling to check cache frequently
    // This helps in case the render completes but callback isn't triggered
    const intervalId = setInterval(() => {
      if (checkCache()) {
        clearInterval(intervalId);
      }
    }, 250); // Check every 250ms

    return () => {
      clearInterval(intervalId);
    };
  }, [latexCode]);

  useEffect(() => {
    if (!latexCode.trim()) {
      setLoading(false);
      return;
    }

    mountedRef.current = true;

    // First check if this exact latexCode is already in the cache
    const cachedUrl = tikzCache.get(latexCode);
    if (cachedUrl) {
      setImageUrl(cachedUrl);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Create a visible callback handler
    const handleComplete = (url: string) => {
      if (mountedRef.current) {
        console.log(`Render complete for ${taskId}, setting imageUrl`);
        setImageUrl(url);
        setLoading(false);
      }
    };

    const handleError = (err: string) => {
      if (mountedRef.current) {
        console.error(`Render error for ${taskId}: ${err}`);
        setError(err);
        setLoading(false);
      }
    };

    // Add to render queue with explicit debugging
    console.log(`Adding task ${taskId} to queue with priority ${priority}`);
    renderQueue.addToQueue({
      id: taskId,
      tikzCode: latexCode,
      priority,
      onComplete: handleComplete,
      onError: handleError,
    });

    return () => {
      mountedRef.current = false;
    };
  }, [latexCode, taskId, priority]);

  if (loading) {
    return (
      <div
        className={`${className} p-4 text-sm text-gray-600 flex items-center justify-center min-h-[200px]`}
      >
        <div className="spinner border-t-4 border-blue-500 border-solid rounded-full h-8 w-8 animate-spin mr-2"></div>
        <span>Rendering LaTeX document...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${className} p-4 text-red-500 bg-red-50 rounded border border-red-200`}
      >
        <h3 className="font-bold">Error rendering LaTeX:</h3>
        <pre className="whitespace-pre-wrap text-sm mt-2 overflow-auto">
          {error}
        </pre>
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-gray-700">
            View LaTeX code
          </summary>
          <pre className="text-xs mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-96">
            {latexCode}
          </pre>
        </details>
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className={`${className} flex justify-center`}>
        <img
          src={imageUrl}
          className="max-w-full h-auto latex-document-image"
          alt="LaTeX Document"
        />
      </div>
    );
  }

  return null;
}
