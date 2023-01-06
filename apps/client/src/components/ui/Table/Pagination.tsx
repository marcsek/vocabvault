import React from 'react';
import { GoChevronRight } from 'react-icons/go';

const Pagination = () => {
  return (
    <nav className="flex items-center gap-6 leading-none">
      <span className="text-sm">{`${1} - ${7} of ${900}`}</span>
      <div className="item-ce flex text-xl">
        <button aria-label="go-left">
          <GoChevronRight className="rotate-180" />
        </button>
        <button aria-label="go-right">
          <GoChevronRight />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
