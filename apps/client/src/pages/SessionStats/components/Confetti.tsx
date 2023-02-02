import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'usehooks-ts';

const Confetti = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="fixed inset-0 z-0">
      <ReactConfetti
        width={width}
        height={height}
        gravity={20 / height}
        recycle={false}
        opacity={0.1}
        numberOfPieces={400}
        tweenDuration={100}
        colors={['#e11d48', '#3b82f6', '#36B37E', '#FFAB00', '#ef4444']}
        drawShape={(ctx) => {
          ctx.beginPath();
          ctx.fillRect(0, 0, 10, 10);
          ctx.closePath();
        }}
      />
    </div>
  );
};

export default Confetti;
