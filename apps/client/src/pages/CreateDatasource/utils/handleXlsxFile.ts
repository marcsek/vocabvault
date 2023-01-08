import readXlsxFile, { Row } from 'read-excel-file';
import { TWordPair } from 'server/src/schemas/wordSource.schema';
import { toast } from 'react-toastify';

const handleXlsxFile = async (file: File, callback: (value: TWordPair[], error: Error | null) => void) => {
  let rows: Row[] = [];
  let error: Error | null = null;

  try {
    rows = await readXlsxFile(file);
  } catch (e) {
    toast.error('There was an error parsing this file.');
    error = new Error();
  }

  const parsedFile = () =>
    rows.flatMap((row, index) => {
      if (!['string', 'number'].includes(typeof row[0]) || !['string', 'number'].includes(typeof row[1])) {
        toast.warn(`Invalid value at row #${index + 1}. It has been deleted`);
        return [];
      }
      return { firstValue: row[0].toString(), secondValue: row[1].toString() };
    });

  callback(error ? [] : parsedFile(), error);
};

export default handleXlsxFile;
