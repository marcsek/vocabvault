import readXlsxFile from 'read-excel-file';
import { TWordPair } from 'server/src/schemas/wordSource.schema';

const handleXlsxFile = async (file: File, callback: (value: TWordPair[]) => void) => {
  const rows = await readXlsxFile(file);

  callback(
    rows.flatMap((row) => {
      if (!['string', 'number'].includes(typeof row[0]) || !['string', 'number'].includes(typeof row[1])) {
        //TODO: Toast warning
        return [];
      }

      return { firstValue: row[0].toString(), secondValue: row[1].toString() };
    })
  );
};

export default handleXlsxFile;
