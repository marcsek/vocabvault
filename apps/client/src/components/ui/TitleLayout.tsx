import React from 'react';
import { ButtonProps } from './Button';

interface Props {
  title: string;
  children?: React.ReactNode;
  button?: React.ReactElement<ButtonProps>;
}

const TitleLayout = ({ children, title, button }: Props) => {
  return (
    <section className="flex flex-col gap-6 md:gap-11">
      <div className="flex h-9 justify-between">
        <h1 className="text-xl font-bold leading-none md:text-2xl">{title}</h1>
        {button}
      </div>
      {children}
    </section>
  );
};

export default TitleLayout;
