import { GoChevronRight } from 'react-icons/go';

const Pagination = () => {
  return (
    <nav className="flex items-center gap-6 leading-none">
      <span className="text-sm">{`${1} - ${7} of ${900}`}</span>
      <div className="item-ce flex gap-2 text-2xl">
        <button aria-label="go-left" className="rounded-full ring-gray-600 duration-[50ms] hover:bg-gray-700 focus:ring">
          <GoChevronRight className="rotate-180" />
        </button>
        <button aria-label="go-right" className="rounded-full ring-gray-600 duration-[50ms] hover:bg-gray-700 focus:ring">
          <GoChevronRight />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
