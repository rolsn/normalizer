import { useState } from 'react'
import './App.css'
import { LocalJsonUploader } from './components/LocalJsonUploader'
import { CSVFileUploader } from './components/CSVFileUploader'

function App() {
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
          <div className="border border-gray-300 h-1/3 p-4">
            <p className="text-base font-bold underline">
              Subscale configuration
            </p>
          </div>
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
