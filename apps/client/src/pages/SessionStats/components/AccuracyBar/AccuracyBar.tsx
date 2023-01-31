import ProgressBar from '@ui/ProgressBar';

interface Props {
  accuracy: number;
}

const AccuracyBar = ({ accuracy }: Props) => {
  return (
    <div className="rounded-default relative flex flex-col gap-4 px-6 py-5 pb-10 leading-none outline outline-1 outline-gray-600">
      <p className="text-sm font-semibold text-gray-300">Accuracy</p>
      <ProgressBar width={Math.floor(accuracy)} numericIndicator />
    </div>
  );
};

export default AccuracyBar;
