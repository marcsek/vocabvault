import React from 'react';
import { ButtonProps } from './Button';

interface Props {
  children?: React.ReactNode;
  button?: React.ReactElement<ButtonProps>;
  headingLeft: React.ReactNode;
}

const TitleLayout = ({ children, button, headingLeft }: Props) => {
  return (
    <section className="flex flex-col gap-6 md:gap-11">
      <div className="flex h-9 justify-between">
        {headingLeft}
        <div className="hidden md:block">{button}</div>
      </div>
      {children}
      <div className="fixed left-0 bottom-0 flex h-16 w-full items-center justify-center bg-gray-800/70 py-4 px-9 shadow-[0px_-2px_6px_1px_#00000033] backdrop-blur-sm md:hidden [&>*]:w-full">
        {button}
      </div>
    </section>
  );
};

export default TitleLayout;
