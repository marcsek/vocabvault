import { useSelectedWords } from '../../context/SelectedWordsContext';
import { TbDragDrop } from 'react-icons/tb';
import { SelectedWordsDetail } from './SelectedWordsDetail';

const NewSessionSelectedWords = () => {
  const { selectedWords } = useSelectedWords();

  return (
    <div className="flex flex-col gap-6">
      <p className="font-semibold leading-none text-gray-50">Selected words</p>
      <div className="rounded-default flex h-32 w-full items-center justify-center overflow-y-auto outline outline-1 outline-gray-600 ">
        {selectedWords && selectedWords.id !== '0' ? (
          <SelectedWordsDetail {...selectedWords} />
        ) : (
          <div className="flex flex-col items-center gap-2 leading-none">
            <TbDragDrop className="text-gray-500" size={40} />
            <p className="text-sm font-medium text-gray-400">Select word source first.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewSessionSelectedWords;
