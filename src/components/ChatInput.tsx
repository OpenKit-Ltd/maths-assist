import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendIcon, PaperclipIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string, files?: File[]) => void;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  showMisconceptionsToggle?: boolean;
  includeMisconceptions?: boolean;
  onMisconceptionsToggle?: () => void;
}

export function ChatInput({
  onSend,
  className,
  value,
  onChange,
  showMisconceptionsToggle = false,
  includeMisconceptions = false,
  onMisconceptionsToggle,
}: ChatInputProps) {
  const [message, setMessage] = useState(value || "");
  const [files, setFiles] = useState<File[]>([]);

  // Update local state when the parent component changes the value
  React.useEffect(() => {
    if (value !== undefined) {
      setMessage(value);
    }
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMessage(newValue);

    // If onChange prop exists, call it with the new value
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSend = () => {
    if (message.trim() || files.length > 0) {
      onSend(message, files);

      // Only reset local state if not controlled by parent
      if (value === undefined) {
        setMessage("");
      }

      setFiles([]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className={cn("relative", className)}>
      {files.length > 0 && (
        <div className="px-3 py-2 border rounded-lg bg-background mb-2">
          <p className="text-sm font-medium">Files:</p>
          <ul className="text-xs text-muted-foreground">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative border rounded-lg bg-background shadow-sm overflow-hidden">
        {showMisconceptionsToggle && (
          <div className="px-3 pt-2 pb-0 border-b">
            <label className="flex items-center gap-2 text-sm text-gray-600 pb-2">
              <input
                type="checkbox"
                className="rounded text-blue-500 focus:ring-blue-500"
                checked={includeMisconceptions}
                onChange={onMisconceptionsToggle}
              />
              <span>Include Content Store Misconceptions</span>
            </label>
          </div>
        )}

        <Textarea
          placeholder="What maths topic do your students need help with today?"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="min-h-[80px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pb-8"
        />

        <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-background p-1">
          <Button
            onClick={handleSend}
            size="icon"
            className="rounded-full h-9 w-9 bg-blue-600 hover:bg-blue-700"
            disabled={!message.trim() && files.length === 0}
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
