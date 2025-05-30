import { useState } from 'react'
import Papa from 'papaparse';
import './App.css'

function App() {
  function LocalJsonUploader({ label, onData }: { label?: string, onData: (data: any) => void }) {
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<any>(null);
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setFileName(file?.name || null);
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          setFileContent(data);
          onData(data);
        } catch (err) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file as Blob);
    };
  
    return (
      <div className="flex flex-col gap-2">
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
        {fileName && (
          <div className="flex flex-col gap-2">
            {fileContent && (
              <pre className="p-2 rounded text-sm overflow-auto max-h-48">
                {JSON.stringify(fileContent, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    );
  }

  function CSVFileUploader({ label, onData }: { label?: string, onData: (data: any) => void }) {
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<any[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      setFileName(file.name);
      Papa.parse(file, {
        header: true,
        complete: (results: Papa.ParseResult<any>) => {
          setHeaders(Object.keys(results.data[0] || {}));
          setFileContent(results.data);
          onData(results.data);
        },
        error: () => alert('Invalid CSV file'),
      });
    };
  
    return (
      <div className="flex flex-col gap-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="p-2 m-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-center">
            Select CSV file
          </div>
        </div>
        {fileName && fileContent.length > 0 && (
          <div className="overflow-auto max-h-48">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header, index) => (
                    <th key={index} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fileContent.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((header, colIndex) => (
                      <td key={colIndex} className="px-3 py-2 text-sm text-gray-500">
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

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
