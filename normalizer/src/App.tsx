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
    const intValue = value === '' ? '' : Math.floor(Number(value)).toString();
    setRange(prev => ({ ...prev, [field]: intValue }));
  };

  const handleAgeChange = (value: string) => {
    const intValue = value === '' ? '' : Math.floor(Number(value)).toString();
    setAge(intValue);
  };

  const calculateSubscale = () => {
    if (!questions || !answers) {
      alert('Questions and answers are required.');
      return;
    }

    if (!normalizationTable.length) {
      alert('Normalization table is required.');
      return;
    }

    if (!age || !sex) {
      alert('Age and sex are required.');
      return;
    }

    // use full range if values are empty
    const minId = Math.min(...questions.map(q => q.id));
    const maxId = Math.max(...questions.map(q => q.id));
    const start = range.start ? parseInt(range.start) : minId;
    const end = range.end ? parseInt(range.end) : maxId;

    if (start > end) {
      alert('Start value must be less than or equal to end value.');
      return;
    }

    // calculate raw scores for each question in the given range.
    const scores = questions
      .filter(q => q.id >= start && q.id <= end)
      .map(question => {
        const answer = answers.find(a => a.questionId === question.id);
        if (!answer) return null;
        
        const option = question.options.find(opt => opt.label === answer.selectedOption);
        return option?.rawScore ?? null;
      })
      .filter((score): score is number => score !== null);

    if (scores.length === 0) {
      alert('No scores found in the selected range.');
      return;
    }

    const total = scores.reduce((sum, score) => sum + score, 0);
    const rawScore = method === 'sum' ? total : Math.round(total / scores.length);

    // for simplicity, just find the exact combination. under different circumstances,
    // we would try to find the closest match.
    const ageNum = parseInt(age);
    const sexLabel = sex.toUpperCase() === 'M' ? 'M' : 'F';
    const normalizedRow = normalizationTable.find(row => {
      const rowAge = parseInt(row['Age']);
      const rowScore = parseInt(row['Raw Score']);
      return rowAge === ageNum && rowScore === rawScore && row['Sex'] === sexLabel;
    });
    console.log("Normalization row:", normalizedRow);
    
    if (!normalizedRow) {
      alert(`No exact normalization data found. (Raw score: ${rawScore}.)`);
      return;
    }
    
    const normalizedScore = normalizedRow['Normalized Score'];
    alert(`Normalized score: ${normalizedScore} (raw score: ${rawScore})`); // for now
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
            <button 
              className="flex-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              onClick={calculateSubscale}
            >
              <p className="text-base font-bold">
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
              range={range}
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
              range={range}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App