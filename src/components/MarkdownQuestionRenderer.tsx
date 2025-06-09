// MarkdownQuestionRenderer.tsx
import React from 'react';
import { Question } from '../lib/parser';

interface MarkdownQuestionRendererProps {
  question: Question;
  showVisualDescription?: boolean;
  showTeacherNotes?: boolean;
}

export function MarkdownQuestionRenderer({ 
  question, 
  showVisualDescription = false,
  showTeacherNotes = false 
}: MarkdownQuestionRendererProps) {
  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="border-b pb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Question {question.number}
          </h2>
          <div className="text-sm text-gray-500">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {question.topic}
            </span>
          </div>
        </div>
        
        {question.misconceptionTarget && (
          <div className="text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-md">
            <strong>Targets misconception:</strong> {question.misconceptionTarget}
          </div>
        )}
      </div>

      {/* Question Content */}
      <div className="prose max-w-none">
        <div className="text-lg leading-relaxed whitespace-pre-line">
          {question.content}
        </div>
      </div>

      {/* Visual Description (if enabled) */}
      {showVisualDescription && question.visualDescription && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Visual Description
          </h3>
          <div className="text-purple-700 whitespace-pre-line">
            {question.visualDescription}
          </div>
        </div>
      )}

      {/* Teacher Notes (if enabled) */}
      {showTeacherNotes && question.teacherNotes && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Teacher Notes
          </h3>
          <div className="text-blue-700 whitespace-pre-line">
            {question.teacherNotes}
          </div>
        </div>
      )}
    </div>
  );
}