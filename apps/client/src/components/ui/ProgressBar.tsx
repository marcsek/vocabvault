interface Props {
  width: number;
  color?: string;
  colorShade?: string;
}

function ProgressBar({ width, color = '#3B82F6', colorShade = '#60A5FA' }: Props) {
  return (
    <div className="h-4 w-full rounded-full bg-gray-700">
      <div
        className={`h-full rounded-full bg-[${color}] shadow-[0px_0px_4px_#3B82F6;] ${width !== 0 ? 'px-2' : ''}`}
        style={{
          width: `${width}%`,
        }}
      >
        <div className={`bg-[${colorShade}] relative top-1 box-border h-1 w-full rounded-full`}></div>
      </div>
    </div>
  );
}

export default ProgressBar;
