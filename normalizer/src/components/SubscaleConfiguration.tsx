interface SubscaleConfigurationProps {
  range: {
    start: string;
    end: string;
  };
  method: string;
  onRangeChange: (field: 'start' | 'end', value: string) => void;
  onMethodChange: (method: string) => void;
}

export function SubscaleConfiguration({ 
  range, 
  method, 
  onRangeChange, 
  onMethodChange 
}: SubscaleConfigurationProps) {
  return (
    <div className="border border-gray-300 flex-1 p-4 flex flex-col">
      <p className="text-base font-bold underline">
        Subscale configuration
      </p>
      <div className="flex flex-col md:flex-row gap-4 mt-4 flex-1">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Question Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Start"
              value={range.start}
              onChange={(e) => onRangeChange('start', e.target.value)}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="End"
              value={range.end}
              onChange={(e) => onRangeChange('end', e.target.value)}
              step="1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Method</label>
          <select 
            value={method}
            onChange={(e) => onMethodChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sum">Sum</option>
            <option value="average">Average</option>
          </select>
        </div>
      </div>
    </div>
  );
} 