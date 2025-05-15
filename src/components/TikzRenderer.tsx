import React, { useEffect, useState } from "react";
import { renderQueue, tikzCache } from "../lib/renderQueue";

interface TikzRendererProps {
  tikzCode: string;
  className?: string;
  priority?: number;
}

export function TikzRenderer({
  tikzCode,
  className = "",
  priority = 5, // Default middle priority
}: TikzRendererProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [taskId] = useState<string>(
    `tikz-${Math.random().toString(36).substr(2, 9)}`
  );

  useEffect(() => {
    if (!tikzCode.trim()) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    // First check if this exact tikzCode is already in the cache
    const cachedUrl = tikzCache.get(tikzCode);
    if (cachedUrl) {
      if (isMounted) {
        setImageUrl(cachedUrl);
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    setError(null);

    // Add to render queue
    renderQueue.addToQueue({
      id: taskId,
      tikzCode,
      priority,
      onComplete: (url) => {
        if (isMounted) {
          setImageUrl(url);
          setLoading(false);
        }
      },
      onError: (err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      },
    });

    return () => {
      isMounted = false;
    };
  }, [tikzCode, taskId, priority]);

  if (loading) {
    return (
      <div className={`${className} p-2 text-sm text-gray-600`}>
        Rendering TikZ diagram...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${className} p-2 text-red-500 bg-red-50 rounded border border-red-200`}
      >
        <h3 className="font-bold">Error rendering TikZ:</h3>
        <pre className="whitespace-pre-wrap text-sm">{error}</pre>
        <code className="text-xs block mt-2 p-2 bg-gray-100 rounded overflow-auto">
          {tikzCode}
        </code>
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className={className}>
        <img src={imageUrl} className="max-w-full h-auto" alt="TikZ Diagram" />
      </div>
    );
  }

  return null;
}
