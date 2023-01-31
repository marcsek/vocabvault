interface Props {
  width: number;
  color?: string;
  colorShade?: string;
  numericIndicator?: boolean;
}

function ProgressBar({ width, color = '#3B82F6', colorShade = '#60A5FA', numericIndicator = false }: Props) {
  return (
    <div className="h-4 w-full rounded-full bg-gray-700">
      <div
        className={`relative h-full rounded-full shadow-[0px_0px_4px_#3B82F6;] ${width !== 0 ? 'px-2' : ''}`}
        style={{
          width: `${width}%`,
          backgroundColor: color,
        }}
      >
        {numericIndicator && (
          <p
            className="text-primary-200 bg-primary-500/30 rounded-default absolute left-full translate-y-6 -translate-x-1/2 px-1 py-0.5 text-sm"
            style={{ color: colorShade }}
          >
            {width}%
          </p>
        )}
        <div
          className={`relative top-1 box-border h-1 w-full rounded-full`}
          style={{
            backgroundColor: colorShade,
          }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
