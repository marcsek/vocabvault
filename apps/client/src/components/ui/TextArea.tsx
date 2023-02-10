import React from 'react';

type Props = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'ref'> & {
  labelText?: string;
};

const TextArea = ({ labelText, className, ...props }: Props, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
  return (
    <div className="relative -z-0 flex w-full flex-col gap-2 text-gray-50">
      <label className="w-full">
        <p className="mb-2 text-sm font-medium">{labelText}</p>
        <textarea
          autoCapitalize="off"
          autoCorrect="off"
          ref={ref}
          rows={3}
          className={`${className} focus:outline-primary-300 w-full resize-none rounded-[4px] bg-gray-800 px-3 py-2.5 text-base font-medium leading-5 placeholder-gray-400 outline outline-1 outline-gray-500 duration-75 focus:outline-2 disabled:text-gray-400 disabled:outline-gray-600`}
          {...props}
        ></textarea>
      </label>
    </div>
  );
};

export default React.forwardRef(TextArea);
