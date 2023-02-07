import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { MagicWandIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import Link from '@ui/Link';

interface Props {
  unfilteredDataExists: boolean;
}

const NoWordSourceWarning = forwardRef<HTMLDivElement, Props>(({ unfilteredDataExists }, ref) => {
  const title = unfilteredDataExists ? 'No source matches these filters.' : 'No word sources were found';
  const icon = unfilteredDataExists ? <QuestionMarkCircledIcon className="h-8 w-8" /> : <MagicWandIcon className="h-8 w-8" />;

  return (
    <div ref={ref} className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { type: 'spring' } }}
        exit={{ opacity: 0, scale: 0 }}
      >
        {icon}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.7 } }}
        exit={{ opacity: 0 }}
        className="text-gray-200"
      >
        {title}
      </motion.p>
      {!unfilteredDataExists && (
        <motion.div
          className="flex items-end gap-1 text-sm leading-none text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.9, duration: 0.7 } }}
          exit={{ opacity: 0 }}
        >
          <p>You can create one </p>
          <Link className="!text-primary-200 !p-0 !leading-none hover:underline" to="/create-datasource">
            here.
          </Link>
        </motion.div>
      )}
    </div>
  );
});

export default NoWordSourceWarning;
