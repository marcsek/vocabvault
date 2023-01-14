interface Props {
  handleGroupClick: (name: 'shared' | 'private' | 'watched') => void;
  checked: { shared: boolean; private: boolean; watched: boolean };
}

const TypeFilters = ({ checked, handleGroupClick }: Props) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex w-full min-w-[19rem] justify-between sm:justify-start sm:gap-6">
        <div>
          <button name="shared" className="flex items-center gap-2" onClick={() => handleGroupClick('shared')}>
            <div
              className={`${
                checked.shared ? 'bg-primary-300' : 'transparent'
              } border-primary-200 bottom-3 mb-1 box-border h-5 w-5 rounded-full border-[3px]`}
            ></div>
            <label htmlFor="shared" className={`leading-none ${checked.shared ? 'text-gray-50' : 'text-gray-400'} cursor-pointer`}>
              Shared
            </label>
          </button>
        </div>
        <div>
          <button name="watched" className="flex items-center gap-2" onClick={() => handleGroupClick('watched')}>
            <div
              className={`${
                checked.watched ? 'bg-secondary-300' : 'transparent'
              } border-secondary-200 bottom-3 mb-1 box-border h-5 w-5 rounded-full border-[3px]`}
            ></div>
            <label htmlFor="watched" className={`leading-none ${checked.watched ? 'text-gray-50' : 'text-gray-400'} cursor-pointer`}>
              Watched
            </label>
          </button>
        </div>
        <div>
          <button name="private" className="flex items-center gap-2" onClick={() => handleGroupClick('private')}>
            <div
              className={`${
                checked.private ? 'bg-gray-700' : 'transparent'
              } bottom-3 mb-1 box-border h-5 w-5 rounded-full border-[3px] border-gray-600`}
            ></div>
            <label htmlFor="private" className={`leading-none ${checked.private ? 'text-gray-50' : 'text-gray-400'} cursor-pointer`}>
              Private
            </label>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypeFilters;
