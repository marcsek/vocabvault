import ProgressBar from '@ui/ProgressBar';
import { useMotionValue, useTransform } from 'framer-motion';

interface Props {
  accuracy: number;
}

const AccuracyBar = ({ accuracy }: Props) => {
  const motionValue = useMotionValue(accuracy);
  const backgroundColor = useTransform(motionValue, [0, 70, 100], ['#ef4444', '#FFAB00', '#36B37E']).get();
  const shadeColor = useTransform(motionValue, [0, 70, 100], ['#fca5a5', '#FFD666', '#86E8AB']).get();

  return (
    <div
      className="rounded-default relative flex flex-col gap-4   bg-gray-800/50 px-6
    py-5 pb-10 leading-none outline outline-1 outline-gray-600 backdrop-blur-md"
    >
      <p className="text-sm font-semibold text-gray-300">Accuracy</p>
      <ProgressBar width={Math.floor(accuracy)} color={backgroundColor} colorShade={shadeColor} numericIndicator delay={2} />
    </div>
  );
};

export default AccuracyBar;
