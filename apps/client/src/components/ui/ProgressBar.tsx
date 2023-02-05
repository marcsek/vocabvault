import { motion } from 'framer-motion';

interface Props {
  width: number;
  color?: string;
  colorShade?: string;
  numericIndicator?: boolean;
  delay?: number;
}

function ProgressBar({ width, color, colorShade = '#60A5FA', numericIndicator = false, delay }: Props) {
  const transparentColor = color?.replace(/[\d.]+\)$/g, '0.30)');

  return (
    <div className="h-4 w-full rounded-full bg-gray-700">
      <motion.div
        initial={{ width: 0, backgroundColor: color ? '#ef4444' : '#3B82F6' }}
        animate={{ width: `${width}%`, backgroundColor: color }}
        className={`relative h-full rounded-full shadow-[0px_0px_4px_${color};] ${width !== 0 ? 'px-2' : ''}`}
        style={{
          width: 0,
        }}
        transition={{ type: 'spring', delay, duration: 0.7, bounce: 0.2 }}
      >
        {numericIndicator && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 2.3 } }}
            className="text-primary-200 rounded-default absolute left-full translate-y-6 -translate-x-1/2 px-1 py-0.5 text-sm"
            style={{ color: colorShade, backgroundColor: transparentColor }}
          >
            {width}%
          </motion.p>
        )}
        <div
          className={`relative top-1 box-border h-1 w-full rounded-full`}
          style={{
            backgroundColor: colorShade,
          }}
        ></div>
      </motion.div>
    </div>
  );
}

export default ProgressBar;
