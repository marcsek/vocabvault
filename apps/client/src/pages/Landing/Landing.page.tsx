import Table from '@ui/Table/Table';
import React from 'react';
import { wordList } from '../../assets/static/temporary';

const Landing = () => {
  return (
    <div className="max-h-96">
      <Table
        paginate
        rows={wordList}
        columns={{
          keyField: 'id',
          data: [
            { field: 'lang1', headerName: 'First' },
            { field: 'lang2', headerName: 'Second' },
          ],
        }}
      />
    </div>
  );
};

export default Landing;
