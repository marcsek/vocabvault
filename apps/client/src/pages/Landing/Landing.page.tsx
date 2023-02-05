import Table from '@ui/Table/Table';
import React from 'react';
import { wordList } from '../../assets/static/temporary';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <div className="max-h-96">
      <Table
        rows={wordList}
        columns={{
          keyField: 'id',
          data: [
            { field: 'lang1', headerName: 'First' },
            { field: 'lang2', headerName: 'Second' },
          ],
        }}
      />

      <div>
        <motion.div
          animate={{
            scale: [1, 1.5, 1.5, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ['10%', '10%', '50%', '50%', '10%'],
            outlineColor: ['rgb(212 212 212 / 0.7)', 'rgb(212 212 212 / 0.7)', '#60a5fa', '#60a5fa', 'rgb(212 212 212 / 0.7)'],
          }}
          transition={{ repeat: Infinity, ease: 'easeInOut', duration: 2 }}
          className="h-4 w-4 bg-gray-200/0 outline outline-2 outline-gray-300/70"
        ></motion.div>
      </div>
    </div>
  );
};

export default Landing;
