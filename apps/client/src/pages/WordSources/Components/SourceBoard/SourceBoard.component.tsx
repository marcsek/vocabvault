import { TGetAllWordSourcesOutput } from '../../WordSources.page';
import SourceCard from '../SourceCard/SourceCard.component';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  filteredSources: TGetAllWordSourcesOutput;
}

const SourceBoard = ({ filteredSources }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]">
      <AnimatePresence mode="popLayout" initial={false}>
        {filteredSources?.map((cardData) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
            layout
            key={cardData.id}
          >
            <SourceCard cardData={cardData} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SourceBoard;
