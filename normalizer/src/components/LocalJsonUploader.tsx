import { useState, useEffect } from 'react';
import type { Question, Answer, QuestionsData, AnswersData } from '../types';

type LocalJsonUploaderProps = {
  label?: string;
  expectedType: 'questions';
  onData: (data: QuestionsData) => void;
  range?: { start: string; end: string };
} | {
  label?: string;
  expectedType: 'answers';
  onData: (data: AnswersData) => void;
  range?: { start: string; end: string };
};

export function LocalJsonUploader({ label, onData, expectedType, range }: LocalJsonUploaderProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<QuestionsData | AnswersData | null>(null);
  const [rawContent, setRawContent] = useState<QuestionsData | AnswersData | null>(null);
  const [error, setError] = useState<string | null>(null);

  /*
   * Alters the questions based on the given range. This is not only visual; it modifies the data in-place.
   */
  useEffect(() => {
    if (expectedType === 'questions' && rawContent) {
      const questions = rawContent as QuestionsData;
      const minId = Math.min(...questions.map(q => q.id));
      const maxId = Math.max(...questions.map(q => q.id));
      
      const start = range?.start ? parseInt(range.start) : minId;
      const end = range?.end ? parseInt(range.end) : maxId;
      
      if (!isNaN(start) && !isNaN(end)) {
        const filtered = questions.filter(q => q.id >= start && q.id <= end);
        setFileContent(filtered);
        onData(filtered as any);
      }
    }
  }, [range, expectedType, rawContent, onData]);

  const validateJsonType = (data: any): data is QuestionsData | AnswersData => {
    if (expectedType === 'questions') {
      return Array.isArray(data) && data.every(item => 
        'id' in item && 
        'text' in item && 
        Array.isArray(item.options) &&
        item.options.every((opt: any) => 
          'label' in opt && 
          'text' in opt && 
          'rawScore' in opt
        )
      );
    } else {
      return Array.isArray(data) && data.every(item => 
        'questionId' in item && 
        'selectedOption' in item
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file?.name || null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (validateJsonType(data)) {
          setRawContent(data);
          setFileContent(data);
          onData(data as any); // assert as any to support union type
        } else {
          setError(`Invalid ${expectedType} format`);
        }
      } catch (err) {
        setError('Invalid JSON file');
      }
    };
    reader.readAsText(file as Blob);
  };

  const renderContent = () => {
    if (!fileContent) return null;

    if (expectedType === 'questions') {
      return (fileContent as QuestionsData).map((question) => (
        <div key={question.id} className="p-4 border rounded-md mb-2">
          <h3 className="font-medium mb-2">Question {question.id}</h3>
          <p className="mb-2">{question.text}</p>
          <div className="ml-4">
            {question.options.map((option, index) => (
              <div key={index} className="text-sm">
                {option.label}: {option.text} (score: {option.rawScore})
              </div>
            ))}
          </div>
        </div>
      ));
    } else {
      return (fileContent as AnswersData).map((answer, index) => (
        <div key={index} className="p-4 border rounded-md mb-2">
          <p className="text-sm">
            Question {answer.questionId}: selected {answer.selectedOption}
          </p>
        </div>
      ));
    }
  };

  return (
    <div className="flex flex-col gap-2 text-left">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <input 
          type="file" 
          accept=".json" 
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="p-2 m-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-center">
          Select JSON file
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      {fileName && !error && (
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
          {renderContent()}
        </div>
      )}
    </div>
  );
} 