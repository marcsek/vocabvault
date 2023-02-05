import React from 'react';
import { HiOutlineDatabase } from 'react-icons/hi';
import { motion } from 'framer-motion';

interface Props {
  file: File;
  handleClickRef: React.RefObject<HTMLInputElement>;
}

const FilePreview = ({ file, handleClickRef }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-primary-400 rounded-default w-fit p-2"
      >
        <HiOutlineDatabase size={50} />
      </motion.div>
      <div className="box-border flex flex-col items-center gap-2">
        <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} className="text-sm leading-none text-gray-200">
          {file.name}
        </motion.p>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs leading-none text-gray-400"
        >
          {new Date(file.lastModified).toDateString()}
        </motion.span>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          type="button"
          onClick={() => handleClickRef.current?.click()}
          className="text-primary-200 text-xs hover:underline"
        >
          Change
        </motion.button>
      </div>
    </div>
  );
};

export default FilePreview;
