import { useState } from 'react'
import './App.css'
import { LocalJsonUploader } from './components/LocalJsonUploader'
import { CSVFileUploader } from './components/CSVFileUploader'
import { SubscaleConfiguration } from './components/SubscaleConfiguration'

function App() {
  const [range, setRange] = useState({ start: '', end: '' });
  const [method, setMethod] = useState('sum');

  const handleRangeChange = (field: 'start' | 'end', value: string) => {
    // Only allow integers
    const intValue = value === '' ? '' : Math.floor(Number(value)).toString();
    setRange(prev => ({ ...prev, [field]: intValue }));
  };

  return (
    <div className="flex flex-col p-4 gap-4 w-full h-full min-h-screen">
      <div id="configuration" className="flex h-1/2 w-full gap-4">
        <div className="border border-gray-300 w-1/2 h-full p-4">
          <p className="text-base font-bold underline">
            Normalization table
          </p>
          <div className="flex flex-col gap-4">
            <CSVFileUploader onData={() => {}} />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col gap-4">
          <SubscaleConfiguration
            range={range}
            method={method}
            onRangeChange={handleRangeChange}
            onMethodChange={setMethod}
          />
          <div className="border border-gray-300 h-1/3 p-4">
            <p className="text-base font-bold underline">
              User profile
            </p>
          </div>
          <div className="border border-gray-300 h-1/3 p-4">
            <button>
              <p className="text-base font-bold underline">
                Calculate subscale
              </p>
            </button>
          </div>
        </div>
      </div>
      <div id="structure" className="flex h-1/2 w-full gap-4">
        <div className="border border-gray-300 w-1/2 h-full p-4">
          <p className="text-base font-bold underline">
            Questions
          </p>
          <div className="flex flex-col gap-4">
            <LocalJsonUploader onData={() => {}} />
          </div>
        </div>
        <div className="border border-gray-300 w-1/2 h-full p-4">
          <p className="text-base font-bold underline">
            Answers
          </p>
          <div className="flex flex-col gap-4">
            <LocalJsonUploader onData={() => {}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

