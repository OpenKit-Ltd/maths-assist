import React, { useState, ChangeEvent } from "react";

interface CompileResponse {
  error?: string;
  details?: string;
}

const TikzCompiler: React.FC = () => {
  const [tikzCode, setTikzCode] = useState<string>(
    `\\begin{tikzpicture}
  \\draw (0,0) circle (1cm);
  \\draw (0,0) -- (1,0);
  \\draw (0,0) -- (0,1);
\\end{tikzpicture}`
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setTikzCode(e.target.value);
  };

  const compileTikz = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch("http://localhost:5000/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tikz_code: tikzCode,
          format: "png", // Request PNG format
        }),
      });

      if (!response.ok) {
        const errorData: CompileResponse = await response.json();
        throw new Error(errorData.details || "Failed to compile TikZ code");
      }

      // Get the PNG blob
      const imageBlob: Blob = await response.blob();

      // Create a URL for the image blob
      const url: string = URL.createObjectURL(imageBlob);
      setImageUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TikZ to PNG Compiler</h1>

      <div className="mb-4">
        <textarea
          className="w-full h-64 p-2 border rounded font-mono"
          value={tikzCode}
          onChange={handleCodeChange}
          aria-label="TikZ code editor"
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={compileTikz}
        disabled={loading}
        type="button"
      >
        {loading ? "Compiling..." : "Compile to PNG"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded" role="alert">
          <h3 className="font-bold">Error:</h3>
          <pre className="whitespace-pre-wrap">{error}</pre>
        </div>
      )}

      {imageUrl && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Generated Diagram:</h3>
          <div className="border rounded p-4">
            <img
              src={imageUrl}
              className="max-w-full h-auto"
              alt="Generated TikZ Diagram"
            />
          </div>
          <a
            href={imageUrl}
            download="diagram.png"
            className="inline-block mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Download PNG
          </a>
        </div>
      )}
    </div>
  );
};

export default TikzCompiler;
