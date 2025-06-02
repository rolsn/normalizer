import { useState } from 'react';
import Papa from 'papaparse';

interface CSVFileUploaderProps {
  label?: string;
  onData: (data: any) => void;
}

export function CSVFileUploader({ label, onData }: CSVFileUploaderProps) {
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
    <div className="flex flex-col h-full">
      {label && <label className="text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="relative mb-4">
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
        <div className="flex-1 min-h-0 overflow-auto border border-gray-200 rounded-md">
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fileContent.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex} className="px-3 py-2 text-sm">
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