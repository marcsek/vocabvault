import readXlsxFile, { Row } from 'read-excel-file';
import { toast } from 'react-toastify';

const handleXlsxFile = async (file: File) => {
  let rows: Row[] = [];

  try {
    rows = await readXlsxFile(file);
  } catch (e) {
    throw new Error('Erro while parsing input file');
  }

  return rows.flatMap((row, index) => {
    if (!['string', 'number'].includes(typeof row[0]) || !['string', 'number'].includes(typeof row[1])) {
      toast.warn(`Invalid value at row #${index + 1}. It has been deleted`);
      return [];
    }
    return { firstValue: row[0].toString(), secondValue: row[1].toString() };
  });
};

export default handleXlsxFile;
