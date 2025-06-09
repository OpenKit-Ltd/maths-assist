// DebugInfo.tsx - Component to show debugging information
import React, { useState } from 'react';
import { ParsedResponse } from '../lib/parser';
import { Button } from './ui/button';
import { ChevronDownIcon, ChevronUpIcon, FileTextIcon } from 'lucide-react';

interface DebugInfoProps {
  parsedResponse: ParsedResponse;
}

export function DebugInfo({ parsedResponse }: DebugInfoProps) {
  const [showRawResponse, setShowRawResponse] = useState(false);
  const [showParsedData, setShowParsedData] = useState(false);

  const downloadRawResponse = () => {
    const blob = new Blob([parsedResponse.rawResponse], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `raw_response_${parsedResponse.timestamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadParsedData = () => {
    const data = {
      timestamp: parsedResponse.timestamp,
      topics: parsedResponse.topics,
      questions: parsedResponse.questions.map(q => ({
        number: q.number,
        topic: q.topic,
        misconceptionTarget: q.misconceptionTarget,
        content: q.content,
        visualDescription: q.visualDescription,
        teacherNotes: q.teacherNotes
      }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `parsed_data_${parsedResponse.timestamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-50 border rounded-lg p-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <FileTextIcon className="w-5 h-5 mr-2" />
        Debug Information
      </h3>
      
      <div className="space-y-4">
        {/* Timestamp and basic info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Generated:</span>
            <div className="text-gray-800">{new Date(parsedResponse.timestamp.replace(/-/g, ':')).toLocaleString()}</div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Questions Created:</span>
            <div className="text-gray-800">{parsedResponse.questions.length}</div>
          </div>
        </div>

        {/* Download buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadRawResponse}
            className="flex items-center gap-2"
          >
            <FileTextIcon className="w-4 h-4" />
            Raw Response
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={downloadParsedData}
            className="flex items-center gap-2"
          >
            <FileTextIcon className="w-4 h-4" />
            Parsed JSON
          </Button>
        </div>

        {/* Collapsible sections */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRawResponse(!showRawResponse)}
            className="flex items-center gap-2 text-left p-0 h-auto"
          >
            {showRawResponse ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
            Show Raw AI Response
          </Button>
          
          {showRawResponse && (
            <div className="bg-white border rounded p-3 max-h-96 overflow-y-auto">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                {parsedResponse.rawResponse}
              </pre>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowParsedData(!showParsedData)}
            className="flex items-center gap-2 text-left p-0 h-auto"
          >
            {showParsedData ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
            Show Parsed Data Structure
          </Button>
          
          {showParsedData && (
            <div className="bg-white border rounded p-3 max-h-96 overflow-y-auto">
              <pre className="text-xs text-gray-700">
                {JSON.stringify({
                  topics: parsedResponse.topics,
                  questionsCount: parsedResponse.questions.length,
                  questions: parsedResponse.questions.map(q => ({
                    number: q.number,
                    topic: q.topic,
                    misconceptionTarget: q.misconceptionTarget,
                    hasContent: !!q.content,
                    hasVisualDescription: !!q.visualDescription,
                    hasTeacherNotes: !!q.teacherNotes
                  }))
                }, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}