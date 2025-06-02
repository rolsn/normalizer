import { useState } from 'react'
import './App.css'
import { LocalJsonUploader } from './components/LocalJsonUploader'
import { CSVFileUploader } from './components/CSVFileUploader'
import { SubscaleConfiguration } from './components/SubscaleConfiguration'
import { UserProfile } from './components/UserProfile'
import type { QuestionsData, AnswersData } from './types'

function App() {
  const [range, setRange] = useState({ start: '', end: '' });
  const [method, setMethod] = useState('sum');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState<string | undefined>(undefined);
  const [normalizationTable, setNormalizationTable] = useState<any[]>([]);
  const [questions, setQuestions] = useState<QuestionsData | null>(null);
  const [answers, setAnswers] = useState<AnswersData | null>(null);

  const handleRangeChange = (field: 'start' | 'end', value: string) => {
    // Only allow integers
    const intValue = value === '' ? '' : Math.floor(Number(value)).toString();
    setRange(prev => ({ ...prev, [field]: intValue }));
  };

  const handleAgeChange = (value: string) => {
    // Only allow integers
    const intValue = value === '' ? '' : Math.floor(Number(value)).toString();
    setAge(intValue);
  };

  return (
    <div className="flex flex-col px-4 pb-4 gap-4 w-[80vw] min-h-[800px] mx-auto">
      <h1>Normalizer</h1>
      <div id="configuration" className="flex flex-col md:flex-row h-auto md:h-[400px] w-full gap-4">
        <div className="border border-gray-300 w-full md:w-1/2 h-[400px] p-4 flex flex-col min-h-0">
          <p className="text-base font-bold underline mb-4">
            Normalization table
          </p>
          <div className="flex-1 min-h-0">
            <CSVFileUploader onData={setNormalizationTable} />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-[800px] md:h-[400px] flex flex-col gap-4 min-h-0">
          <SubscaleConfiguration
            range={range}
            method={method}
            onRangeChange={handleRangeChange}
            onMethodChange={setMethod}
          />
          <UserProfile
            age={age}
            sex={sex}
            onAgeChange={handleAgeChange}
            onSexChange={setSex}
          />
          <div className="border border-gray-300 h-[100px] p-4 flex flex-col min-h-0">
            <button className="flex-1">
              <p className="text-base font-bold underline">
                Calculate subscale
              </p>
            </button>
          </div>
        </div>
      </div>
      <div id="structure" className="flex flex-col md:flex-row h-auto md:h-[400px] w-full gap-4">
        <div className="border border-gray-300 w-full md:w-1/2 h-[400px] p-4 flex flex-col">
          <p className="text-base font-bold underline mb-4">
            Questions
          </p>
          <div className="flex-1 min-h-0">
            <LocalJsonUploader 
              expectedType="questions"
              onData={setQuestions} 
            />
          </div>
        </div>
        <div className="border border-gray-300 w-full md:w-1/2 h-[400px] p-4 flex flex-col">
          <p className="text-base font-bold underline mb-4">
            Answers
          </p>
          <div className="flex-1 min-h-0">
            <LocalJsonUploader 
              expectedType="answers"
              onData={setAnswers} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

