import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'usehooks-ts';

const Confetti = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="fixed inset-0 z-0">
      <ReactConfetti
        width={width}
        height={height}
        gravity={0.017}
        recycle={true}
        opacity={0.1}
        numberOfPieces={200}
        tweenDuration={10000}
        colors={['#e11d48', '#3b82f6', '#36B37E', '#FFAB00', '#ef4444']}
      />
    </div>
  );
};

export default Confetti;
