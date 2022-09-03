interface CounterProps {
  testid: string;
  label: string;
  count: number;
}

const Counter: React.FC<CounterProps> = ({ count, label, testid }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className="w-14 h-14 text-xl font-medium rounded-full bg-white inline-flex justify-center items-center"
        data-testid={testid}
      >
        {count}
      </div>
      <span className="text-xs text-white">{label}</span>
    </div>
  );
};
export default Counter;
