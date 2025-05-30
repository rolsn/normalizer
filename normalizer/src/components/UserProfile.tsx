interface UserProfileProps {
  age: string;
  sex: string | undefined; // we don't want researchers assuming a sex, but one must be chosen
  onAgeChange: (age: string) => void;
  onSexChange: (sex: string) => void;
}

export function UserProfile({
  age,
  sex,
  onAgeChange,
  onSexChange
}: UserProfileProps) {
  return (
    <div className="border border-gray-300 flex-1 p-4 flex flex-col">
      <p className="text-base font-bold underline">
        User profile
      </p>
      <div className="flex flex-col md:flex-row gap-4 mt-4 flex-1">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Age</label>
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => onAgeChange(e.target.value)}
            step="1"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Sex</label>
          <select
            value={sex ?? ''}
            onChange={(e) => onSexChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select sex</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
        </div>
      </div>
    </div>
  );
} 