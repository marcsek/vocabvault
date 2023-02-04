import { motion } from 'framer-motion';
interface Props {
  className?: string;
  framerId?: string;
}

const Divider = ({ className, framerId }: Props) => {
  return <motion.div layoutId={framerId} transition={{ type: 'spring', duration: 0.5 }} className={`${className} bg-gray-500`} />;
};

export default Divider;
