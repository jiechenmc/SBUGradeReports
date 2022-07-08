interface ProgressProps {
  desc: string;
  value: number;
  count: number;
}
const Progress = ({ desc, value, count }: ProgressProps) => {
  const percent: number = parseFloat(value.toPrecision(2)) * 100;

  return (
    <div>
      <div
        className="tooltip"
        data-tip={`${count} People | ${Math.trunc(percent)}%`}
      >
        <p className="absolute">{desc}</p>
        <progress
          className="progress progress-error w-56 ml-6"
          value={value}
          max="1"
        ></progress>
      </div>
    </div>
  );
};

export default Progress;
