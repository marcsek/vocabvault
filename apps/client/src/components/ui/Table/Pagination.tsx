import { useEffect, useState } from 'react';
import { GoChevronRight } from 'react-icons/go';

interface Props {
  page: number;
  perPage: number;
  currentPageTotal: number;
  total: number;
  setPage: (page: number) => void;
}

const Pagination = ({ page, perPage, total, currentPageTotal, setPage }: Props) => {
  const [chevronDisabled, setChevronDisabled] = useState({ left: false, right: false });

  const leftValue = page * perPage + 1;
  const rightValue = page * perPage + Math.min(perPage, currentPageTotal);

  const handlePageChange = (accumulator: number) => {
    if ((accumulator < 0 && page > 0) || (accumulator > 0 && total - (page + 1) * perPage > 0)) {
      setPage(page + accumulator);
    }
  };

  useEffect(() => {
    const left = page === 0;
    const right = total - (page + 1) * perPage <= 0;
    setChevronDisabled({ left, right });
  }, [page, total]);

  return (
    <nav className="flex items-center gap-6 leading-none">
      <span className="text-sm">{`${leftValue} - ${rightValue} of ${total}`}</span>
      <div className="item-ce flex gap-2 text-2xl">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={chevronDisabled.left}
          aria-label="go-left"
          className="rounded-full ring-gray-600 duration-[50ms] hover:bg-gray-700 focus:ring disabled:text-gray-600 disabled:hover:bg-gray-800"
        >
          <GoChevronRight className="rotate-180" />
        </button>
        <button
          onClick={() => handlePageChange(1)}
          disabled={chevronDisabled.right}
          aria-label="go-right"
          className="rounded-full ring-gray-600 duration-[50ms] hover:bg-gray-700 focus:ring disabled:text-gray-600 disabled:hover:bg-gray-800"
        >
          <GoChevronRight />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
