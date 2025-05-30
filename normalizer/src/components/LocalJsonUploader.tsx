import { useState } from 'react';

interface LocalJsonUploaderProps {
  label?: string;
  onData: (data: any) => void;
}

export function LocalJsonUploader({ label, onData }: LocalJsonUploaderProps) {
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