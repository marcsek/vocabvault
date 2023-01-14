import { FormikProps } from 'formik';
import { toast } from 'react-toastify';
import { TLanguageDuo } from 'server/src/schemas/wordSource.schema';
import { useWordPairPreview } from '../context/filePreviewContext/wordPairsPreviewContext';
import handleXlsxFile from '../utils/handleXlsxFile';

interface Props<T> {
  formik: FormikProps<T>;
}

const useHandleDropInputChange = <T extends TLanguageDuo>({ formik }: Props<T>) => {
  const { setWordPairsPreview } = useWordPairPreview();

  return (newValue: File | undefined | null) => {
    if (!newValue) return;

    handleXlsxFile(newValue)
      .then((parsedArray) => {
        setWordPairsPreview({
          total: parsedArray.length,
          secondColumnName: formik.values.secondLanguage.languageName,
          firstColumnName: formik.values.firstLanguage.languageName,
          pairs: parsedArray.slice(0, Math.min(parsedArray.length + 1, 6)),
        });
        formik.setFieldValue('activeFile', newValue);
        formik.setFieldValue('wordPairs', parsedArray);
      })
      .catch(() => {
        toast.error('Could not parse this file.');
        formik.setFieldValue('activeFile', null);
        setWordPairsPreview(null);
      });
  };
};

export default useHandleDropInputChange;
